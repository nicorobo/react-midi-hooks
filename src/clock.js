import { useState, useEffect } from 'react';
import Worker from './clock.worker';

// Look into terminating worker when component is unmounted
const worker = new Worker();

export const useInternalMIDIClock = (output, division = 24, initialTempo = 120) => {
	const [step, setStep] = useState(0);
	const [isPlaying, setIsPlaying] = useState(false);
	const [tempo, setTempo] = useState(initialTempo);

	// Use closure to keep track of steps
	const handleClockMessage = () => {
		let steps = 0;
		return () => {
			if (output) output.send([0xf8]);
			steps++;
			if (division === 1) setStep(steps);
			else if (steps % division === 0) setStep(Math.floor(steps / division));
		};
	};

	useEffect(() => {
		if (isPlaying) {
			const listener = handleClockMessage();
			worker.addEventListener('message', listener);
			if (output) output.send([0xfa]);
			worker.postMessage({ type: 'start', tempo });
			return () => {
				worker.removeEventListener('message', listener);
				if (output) output.send([0xfc]);
				worker.postMessage({ type: 'stop' });
				setStep(0);
			};
		}
	}, [isPlaying]);

	useEffect(() => {
		worker.postMessage({ type: 'setTempo', tempo });
	}, [tempo]);

	return [step, isPlaying, setIsPlaying, setTempo];
};
