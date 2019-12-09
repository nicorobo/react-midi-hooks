import { useState, useEffect } from 'react';
export var useMIDIConnectionManager = function (connections) {
    var connectionsAvaliable = connections.length > 0;
    var _a = useState(''), id = _a[0], setId = _a[1];
    useEffect(function () {
        var index = connections.findIndex(function (c) { return c.id === id; });
        // I believe setting the id to 0 here would result in an infinite loop if there actually aren't any connections
        if (index < 0)
            setId(connectionsAvaliable ? connections[0].id : 0);
    }, [connections, id]);
    var connection = connections.find(function (i) { return i.id === id; });
    return [connection, setId];
};
//# sourceMappingURL=use-midi-connection-manager.js.map