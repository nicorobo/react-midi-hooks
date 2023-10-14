import uniqid from 'uniqid';
import { MIDIMessage, Message, NoteMessage, EventName } from './types';
import { MIDIConstants } from './constants';

type Subscriptions = {
  all: { [id: string]: (args: MIDIMessage) => void };
  note: { [id: string]: (args: NoteMessage) => void };
  clock: { [id: string]: (args: number) => void };
  control: { [id: string]: (args: Message) => void };
};

export class MIDIEmitter {
  private subscriptions: Subscriptions = {
    all: {},
    note: {},
    clock: {},
    control: {}, // Consider splitting this up into things like 'control:36'
  };

  subscribe(eventName: EventName, callback: (args: any) => void) {
    const id = uniqid();
    this.subscriptions[eventName][id] = callback;
    return id;
  }

  unsubscribe(eventName: EventName, id: string) {
    delete this.subscriptions[eventName][id];
  }

  onMIDIMessage(message: MIDIMessage) {
    const action = message.data[0] & 0xf0; // Mask channel/least significant bits;
    const leastSig = message.data[0] & 0x0f; // Mask action bits;
    const channel = leastSig + 1;
    const { all, note, control, clock } = this.subscriptions;
    for (const key in all) {
      all[key](message);
    }

    switch (action) {
      case MIDIConstants.cc:
        for (const key in control) {
          control[key]({
            target: message.data[1],
            value: message.data[2],
            channel,
          }); // (value, control, channel)
        }
        break;
      case MIDIConstants.noteOn:
      case MIDIConstants.noteOff:
        for (const key in note) {
          note[key]({
            target: message.data[1], // note
            value: message.data[2], // velocity
            channel,
            on: action === MIDIConstants.noteOn,
          });
        }
        break;
      case MIDIConstants.clock: // Transport/Clock Message
        for (const key in clock) {
          clock[key](leastSig); // (type)
        }
        break;
      default:
        break;
    }
  }
}
