/// <reference types="react" />
import { Connection } from './types';
export declare const useMIDIConnectionManager: (connections: Connection[]) => (Connection | import("react").Dispatch<import("react").SetStateAction<string>>)[];
