import { CdrReader } from "@foxglove/cdr";
import { MessageDefinition, MessageDefinitionField } from "@foxglove/message-definition";
import { Time } from "@foxglove/rostime";
export type Deserializer = (reader: CdrReader) => boolean | number | bigint | string | Time;
export type ArrayDeserializer = (reader: CdrReader, count: number) => boolean[] | Int8Array | Uint8Array | Int16Array | Uint16Array | Int32Array | Uint32Array | BigInt64Array | BigUint64Array | Float32Array | Float64Array | string[] | Time[];
export declare class MessageReader<T = unknown> {
    rootDefinition: MessageDefinitionField[];
    definitions: Map<string, MessageDefinitionField[]>;
    constructor(definitions: MessageDefinition[]);
    readMessage<R = T>(buffer: ArrayBufferView): R;
    private readComplexType;
}
//# sourceMappingURL=MessageReader.d.ts.map