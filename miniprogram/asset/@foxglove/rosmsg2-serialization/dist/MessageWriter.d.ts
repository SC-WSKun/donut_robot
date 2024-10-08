import { MessageDefinition, MessageDefinitionField } from "@foxglove/message-definition";
/**
 * Takes a parsed message definition and returns a message writer which
 * serializes JavaScript objects to CDR-encoded binary.
 */
export declare class MessageWriter {
    rootDefinition: MessageDefinitionField[];
    definitions: Map<string, MessageDefinitionField[]>;
    constructor(definitions: MessageDefinition[]);
    /** Calculates the byte size needed to write this message in bytes. */
    calculateByteSize(message: unknown): number;
    /**
     * Serializes a JavaScript object to CDR-encoded binary according to this
     * writer's message definition. If output is provided, it's byte length must
     * be equal or greater to the result of `calculateByteSize(message)`. If not
     * provided, a new Uint8Array will be allocated.
     */
    writeMessage(message: unknown, output?: Uint8Array): Uint8Array;
    private byteSize;
    private write;
    private getDefinition;
    private getPrimitiveSize;
    private getPrimitiveWriter;
    private getPrimitiveArrayWriter;
}
//# sourceMappingURL=MessageWriter.d.ts.map