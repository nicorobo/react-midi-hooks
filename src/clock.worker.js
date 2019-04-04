let timeoutId = 0;
let tempo = 120;
let startTime = 0;
let tick = 0;
onmessage = (e) => {
	switch (e.data.type) {
		case 'start':
			startTime = performance.now();
			tick = 0;
			postMessage(0);
			tick++;
			timeoutId = setTimeout(function step() {
				postMessage(0);
				tick++;
				timeoutId = setTimeout(step, timeToWait(performance.now()));
			}, timeToWait(performance.now()));
			break;
		case 'setTempo':
			tick = 0;
			startTime = performance.now();
			tempo = e.data.tempo;
			break;
		case 'stop':
			clearTimeout(timeoutId);
			break;
		default:
			break;
	}
};

const timeToWait = (now) => (1000 / ((tempo / 60) * 24)) * tick - (now - startTime);
