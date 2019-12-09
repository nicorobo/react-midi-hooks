export declare const useMIDIOutput: (output: import("../../../../../../Users/nickroberts/Development/projects/react-midi-hooks/src/types").Connection) => {
    noteOn?: undefined;
    noteOff?: undefined;
    cc?: undefined;
} | {
    noteOn: (note: number, velocity?: number, channel?: number) => void;
    noteOff: (note: number, velocity?: number, channel?: number) => void;
    cc: (value: number, control?: number, channel?: number) => void;
};
