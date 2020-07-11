import { useState, useEffect, useContext } from 'react';
import { MIDIContext } from './midi-provider';
import { MIDIConstants } from './constants';

export const useMIDIClock = (division = 1) => {
  const { emitter } = useContext(MIDIContext);
  const [step, setStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const handleClockMessage = () => {
    // Keep track of count through closure. Is there a better way?
    let steps = 0;
    return (type: number) => {
      switch (type) {
        case MIDIConstants.tick:
          steps++;
          if (division === 1) setStep(steps);
          else if (steps % division === 0)
            setStep(Math.floor(steps / division));
          break;
        case MIDIConstants.play:
          setIsPlaying(true);
          break;
        case MIDIConstants.stop:
          steps = 0;
          setIsPlaying(false);
          setStep(0);
          break;
        default:
          break;
      }
    };
  };

  useEffect(() => {
    const id = emitter.subscribe('clock', handleClockMessage());
    return () => {
      emitter.unsubscribe('clock', id);
    };
  }, [emitter, handleClockMessage]);
  return [step, isPlaying];
};
