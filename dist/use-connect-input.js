import { useEffect } from 'react';
// By using useConnectInput at the beggining of an input hook, we prevent opening/maintaining connections with unused inputs.
// This may have reprecusions when more than one hook is used for the same input, and one of them unregisters.
export var useConnectInput = function (input) {
    useEffect(function () {
        if (!input)
            return function () { };
        if (input.onmidimessage === null)
            input.onmidimessage = handleMIDIMessage;
        return function () { return (input.onmidimessage = null); };
    }, [input]);
};
// If listeners were kept in a general .listeners field then 100 functions listening for a noteOn event would get
// called for every clock tick. I imagine this would affect performance. There must be a better way than this as well!
function handleMIDIMessage(message) {
    var action = message.data[0] & 0xf0; // Mask channel/least significant bits;
    var leastSig = message.data[0] & 0x0f; // Mask action bits;
    for (var key in this.messageListeners) {
        this.messageListeners[key](message); // (value, control, channel)
    }
    switch (action) {
        case 0xb0: // Control Change Message
            for (var key in this.controlListeners) {
                this.controlListeners[key](message.data[2], message.data[1], leastSig + 1); // (value, control, channel)
            }
            break;
        case 0x90: // Note On Message
            for (var key in this.noteOnListeners) {
                this.noteOnListeners[key](message.data[1], message.data[2], leastSig + 1); // (note, velocity, channel)
            }
            break;
        case 0x80: // Note Off Message
            for (var key in this.noteOffListeners) {
                this.noteOffListeners[key](message.data[1], message.data[2], leastSig + 1); // (note, velocity, channel)
            }
            break;
        case 0xf0: // Transport/Clock Message
            for (var key in this.clockListeners) {
                this.clockListeners[key](leastSig); // (type)
            }
            break;
        default:
            break;
    }
}
//# sourceMappingURL=use-connect-input.js.map