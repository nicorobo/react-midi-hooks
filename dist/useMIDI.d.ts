import { Input } from './types';
export declare const useMIDI: () => {
    inputs: Input[];
    outputs: import("./types").Connection[];
    hasMIDI: boolean;
};
