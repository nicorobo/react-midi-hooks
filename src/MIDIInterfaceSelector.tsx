import { useMIDIInputs, useMIDIOutputs } from '../lib/main'

export const MIDIInterfaceSelector = () => {
  const { inputs, selectedInputId, selectInput } = useMIDIInputs()
  const { outputs, selectedOutputId, selectOutput } = useMIDIOutputs()
  return (
    <div className="section">
      <div className="section-title">MIDI Interface</div>
      <div className="subsection">
        <div className="subsection-title">Interface Selection</div>
        <div className="subsection-description">
          Lists all inputs/outputs, switching when clicked.
        </div>
        <div>
          {inputs.map(({ id, name }) => (
            <button key={id} onClick={() => selectInput(id)}>
              {name + (selectedInputId === id ? ' (selected)' : '')}
            </button>
          ))}
        </div>
        <div>
          {outputs.map(({ id, name }) => (
            <button key={id} onClick={() => selectOutput(id)}>
              {name + (selectedOutputId === id ? ' (selected)' : '')}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
