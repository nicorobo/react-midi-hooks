import React, {
  useEffect,
  useReducer,
  useContext,
  useCallback,
  useRef,
  useState,
} from 'react';
import { Input, Output, MIDIMessage, MIDIFilter, MIDINote } from './types';
import uniqid from 'uniqid';

type ReducerState = {
  inputs: Input[];
  outputs: Output[];
  selectedInputId: string | null;
  selectedOutputId: string | null;
};
type EventName = 'all' | 'note' | 'clock' | 'control';
type Subscriptions = {
  all: { [id: string]: (args: any) => void };
  note: { [id: string]: (args: any) => void };
  clock: { [id: string]: (args: any) => void };
  control: { [id: string]: (args: any) => void };
};
class MIDIEmitter {
  private subscriptions: Subscriptions = {
    all: {},
    note: {},
    clock: {},
    control: {},
  };
  subscribe(eventName: EventName, callback: (args: any) => void) {
    const id = uniqid();
    this.subscriptions[eventName][id] = callback;
    return id;
  }

  unsubscribe(eventName: EventName, id: string) {
    delete this.subscriptions[eventName][id];
  }
  // TODO: use constants instead of bits
  onMIDIMessage(message: MIDIMessage) {
    const action = message.data[0] & 0xf0; // Mask channel/least significant bits;
    const leastSig = message.data[0] & 0x0f; // Mask action bits;
    const channel = leastSig + 1;
    console.log(this, this.subscriptions);
    const { all, note, control, clock } = this.subscriptions;
    for (const key in all) {
      all[key](message);
    }
    switch (action) {
      case 0xb0: // Control Change Message
        for (const key in control) {
          control[key]({
            target: message.data[2],
            value: message.data[1],
            channel,
          }); // (value, control, channel)
        }
        break;
      case 0x90:
      case 0x80: // Note On/Off Message
        for (const key in note) {
          note[key]({
            target: message.data[1], // note
            value: message.data[2], // velocity
            channel,
            on: action === 0x90,
          });
        }
        break;
      case 0xf0: // Transport/Clock Message
        for (const key in clock) {
          clock[key](leastSig); // (type)
        }
        break;
      default:
        break;
    }
  }
}

const defaultState: ReducerState = {
  inputs: [],
  outputs: [],
  selectedInputId: null,
  selectedOutputId: null,
};

enum ActionTypes {
  accessReceived = 'AccessReceived',
  inputSelected = 'InputSelected',
  outputSelected = 'OutputSelected',
}
const reducer = (
  state: ReducerState = defaultState,
  action: { type: string; payload?: any }
): ReducerState => {
  const { type, payload } = action;
  switch (type) {
    case ActionTypes.accessReceived:
      // If selectedInputId is defined and the id still exists in the new connections, let it remain
      const inputExists = payload.inputs.some(
        (input: Input) => input.id === state.selectedInputId
      );
      const outputExists = payload.outputs.find(
        (output: Input) => output.id === state.selectedOutputId
      );
      return {
        ...state,
        inputs: payload.inputs,
        outputs: payload.outputs,
        selectedInputId: inputExists
          ? state.selectedInputId
          : payload.inputs.length
          ? payload.inputs[0].id
          : null,
        selectedOutputId: outputExists
          ? state.selectedOutputId
          : payload.outputs.length
          ? payload.outputs[0].id
          : null,
      };
    case ActionTypes.inputSelected:
      return {
        ...state,
        selectedInputId: payload.inputId,
      };
    case ActionTypes.outputSelected:
      return {
        ...state,
        selectedOutputId: payload.outputId,
      };
    default:
      return state;
  }
};
const accessReceived = (access: WebMidi.MIDIAccess) => ({
  type: ActionTypes.accessReceived,
  payload: {
    inputs: Array.from(access.inputs.values()),
    outputs: Array.from(access.outputs.values()),
  },
});

const inputSelected = (inputId: string) => ({
  type: ActionTypes.inputSelected,
  payload: { inputId },
});

const outputSelected = (outputId: string) => ({
  type: ActionTypes.outputSelected,
  payload: { outputId },
});

const MIDIContext = React.createContext<{
  state: ReducerState;
  dispatch: React.Dispatch<{
    type: string;
    payload?: any;
  }>;
  emitter: MIDIEmitter;
}>({ state: defaultState, dispatch: () => null, emitter: new MIDIEmitter() });

export const MIDIProvider: React.FC<{}> = ({ children }) => {
  const emitter = useRef(new MIDIEmitter());
  const [state, dispatch] = useReducer(reducer, defaultState);

  useEffect(() => {
    if (Boolean(navigator?.requestMIDIAccess)) {
      navigator.requestMIDIAccess().then((access: WebMidi.MIDIAccess) => {
        dispatch(accessReceived(access));
        access.onstatechange = () => {
          dispatch(accessReceived(access));
        };
      });
    }
  }, [dispatch]);

  const { selectedInputId, inputs } = state;
  useEffect(() => {
    if (!selectedInputId) {
      return;
    }
    const selectedInput = inputs.find((i) => i.id === selectedInputId);
    selectedInput.onmidimessage = emitter.current.onMIDIMessage.bind(
      emitter.current
    );
    return () => (selectedInput.onmidimessage = null);
  }, [inputs, selectedInputId]);

  return (
    <MIDIContext.Provider value={{ state, dispatch, emitter: emitter.current }}>
      {children}
    </MIDIContext.Provider>
  );
};

export const useMIDIInputs = () => {
  const { state, dispatch } = useContext(MIDIContext);
  const selectInput = useCallback(
    (inputId: string) => {
      dispatch(inputSelected(inputId));
    },
    [dispatch]
  );
  return {
    selectedInputId: state.selectedInputId,
    inputs: state.inputs,
    selectInput,
  };
};

export const useMIDIOutputs = () => {
  const { state, dispatch } = useContext(MIDIContext);
  const selectOutput = useCallback(
    (outputId: string) => {
      dispatch(outputSelected(outputId));
    },
    [dispatch]
  );
  return {
    selectedOutputId: state.selectedOutputId,
    outputs: state.outputs,
    selectOutput,
  };
};

export const useMIDINote = ({
  target: noteFilter,
  channel: channelFilter,
}: MIDIFilter = {}) => {
  const { emitter } = useContext(MIDIContext);
  const [value, setValue] = useState<MIDINote | undefined>();
  const handleNote = useCallback(
    (message: any) => {
      const { target: note, value: velocity, on, channel } = message;
      if (
        (!noteFilter || noteFilter === note) &&
        (!channelFilter || channelFilter === channel)
      ) {
        setValue({ note, on, velocity, channel });
      }
    },
    [noteFilter, channelFilter, setValue]
  );

  useEffect(() => {
    const id = emitter.subscribe('note', handleNote);
    return () => {
      emitter.unsubscribe('note', id);
    };
  }, [emitter, handleNote]);
  return value;
};
