import { Input } from './types';
export declare const useMIDIControl: (input: Input, { target: controlFilter, channel: channelFilter }?: any) => {
    control: any;
    value: number;
    channel: any;
};
