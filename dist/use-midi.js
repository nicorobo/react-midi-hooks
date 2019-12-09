import { useState, useEffect } from 'react';
var defaultConnections = { inputs: [], outputs: [] };
export var useMIDI = function () {
    var _a = useState(defaultConnections), connections = _a[0], setConnections = _a[1];
    var navigatorExists = typeof navigator !== 'undefined';
    var hasMIDI = Boolean(navigatorExists && navigator && navigator.requestMIDIAccess);
    useEffect(function () {
        if (hasMIDI) {
            navigator.requestMIDIAccess().then(function (access) {
                setConnections({
                    inputs: enrichInputs(Array.from(access.inputs.values())),
                    outputs: Array.from(access.outputs.values()),
                });
                access.onstatechange = function () {
                    setConnections({
                        inputs: enrichInputs(Array.from(access.inputs.values())),
                        outputs: Array.from(access.outputs.values()),
                    });
                };
            });
        }
    }, []);
    return {
        inputs: connections.inputs,
        outputs: connections.outputs,
        hasMIDI: hasMIDI,
    };
};
// Listeners can be added/deleted from individual inputs.
// This allows an input to have multiple 'onmidimessage' functions instead of setting/resetting one
var enrichInputs = function (inputs) {
    // Remeber that this is only adding properties to the input object, not really returning a new object.
    // This is a side effect that may present bugs/complications down the line.
    return inputs.map(function (input) {
        input.clockListeners = input.clockListeners || {};
        input.noteOnListeners = input.noteOnListeners || {};
        input.noteOffListeners = input.noteOffListeners || {};
        input.controlListeners = input.controlListeners || {};
        input.messageListeners = input.messageListeners || {};
        // input.onmidimessage = handleMIDIMessage; // This adds a listener by default, opening the connection and listening to every input
        return input;
    });
};
//# sourceMappingURL=use-midi.js.map