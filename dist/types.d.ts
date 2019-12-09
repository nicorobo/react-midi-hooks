export declare type Connection = {
    id: string;
    name: string;
    manufacturer: string;
};
export declare type Input = {
    clockListeners: {
        [id: string]: () => void;
    };
    noteOnListeners: {
        [id: string]: () => void;
    };
    noteOffListeners: {
        [id: string]: () => void;
    };
    controlListeners: {
        [id: string]: () => void;
    };
    messageListeners: {
        [id: string]: (message: any) => void;
    };
} & Connection;
export declare type Output = {} & Connection;
