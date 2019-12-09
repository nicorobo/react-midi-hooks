import { useState, useEffect } from 'react';
import { Connection } from './types';

export const useMIDIConnectionManager = (connections: Connection[]) => {
  const connectionsAvaliable = connections.length > 0;
  const [id, setId] = useState('');

  useEffect(() => {
    const index = connections.findIndex((c) => c.id === id);
    // I believe setting the id to 0 here would result in an infinite loop if there actually aren't any connections
    if (index < 0) setId(connectionsAvaliable ? connections[0].id : '');
  }, [connections, id]);
  const connection = connections.find((i) => i.id === id);
  return [connection, setId];
};
