import React, { useEffect, useReducer, useRef } from 'react'
import { MIDIEmitter } from './midi-emitter'
import { reducer, accessReceived, defaultState, ReducerState } from './reducer'

// TODO Don't expose the whole midi emitter, just subscribe and unsubscribe for now.
export const MIDIContext = React.createContext<{
  state: ReducerState
  dispatch: React.Dispatch<{
    type: string
    payload?: any
  }>
  emitter: MIDIEmitter
}>({ state: defaultState, dispatch: () => null, emitter: new MIDIEmitter() })

type Props = {
  children?: React.ReactNode
}

/**
 * Provides a MIDI context for its child components, managing MIDI access, inputs, and state changes.
 *
 * This component encapsulates MIDI initialization and state management logic, leveraging the Web MIDI API.
 * It listens for MIDI access and input changes, updating the context state accordingly. This state is then
 * accessible to any child components through the MIDIContext. It also sets up an emitter for MIDI messages,
 * allowing child components to subscribe to MIDI message events.
 *
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - Child components that will have access to the MIDIContext.
 *
 * @example
 * // Wrap your application or component tree with MIDIProvider to provide MIDI context.
 * <MIDIProvider>
 *   <YourComponent />
 * </MIDIProvider>
 */

export const MIDIProvider = ({ children }: Props) => {
  const emitter = useRef(new MIDIEmitter())
  const [state, dispatch] = useReducer(reducer, defaultState)
  const { inputs, selectedInputId } = state

  useEffect(() => {
    if (Boolean(navigator?.requestMIDIAccess)) {
      navigator.requestMIDIAccess().then((access: WebMidi.MIDIAccess) => {
        dispatch(accessReceived(access))
        access.onstatechange = () => {
          dispatch(accessReceived(access))
        }
      })
    }
  }, [dispatch])

  useEffect(() => {
    const selectedInput = inputs.find((i) => i.id === selectedInputId)
    if (selectedInput) {
      selectedInput.onmidimessage = emitter.current.onMIDIMessage.bind(
        emitter.current
      )
      return () => (selectedInput.onmidimessage = null)
    }
    return () => {}
  }, [inputs, selectedInputId])

  return (
    <MIDIContext.Provider value={{ state, dispatch, emitter: emitter.current }}>
      {children}
    </MIDIContext.Provider>
  )
}
