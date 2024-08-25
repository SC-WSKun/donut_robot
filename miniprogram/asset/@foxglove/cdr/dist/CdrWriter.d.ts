import { EncapsulationKind } from "./EncapsulationKind";
export declare type CdrWriterOpts = {
    buffer?: ArrayBuffer;
    size?: number;
    kind?: EncapsulationKind;
};
export declare class CdrWriter {
    static DEFAULT_CAPACITY: number;
    static BUFFER_COPY_THRESHOLD: number;
    private littleEndian;
    private hostLittleEndian;
    private isCDR2;
    private eightByteAlignment;
    private buffer;
    private array;
    private view;
    private offset;
    /** Origin offset into stream used for alignment */
    private origin;
    get data(): Uint8Array;
    get size(): number;
    get kind(): EncapsulationKind;
    constructor(options?: CdrWriterOpts);
    int8(value: number): CdrWriter;
    uint8(value: number): CdrWriter;
    int16(value: number): CdrWriter;
    uint16(value: number): CdrWriter;
    int32(value: number): CdrWriter;
    uint32(value: number): CdrWriter;
    int64(value: bigint): CdrWriter;
    uint64(value: bigint): CdrWriter;
    uint16BE(value: number): CdrWriter;
    uint32BE(value: number): CdrWriter;
    uint64BE(value: bigint): CdrWriter;
    float32(value: number): CdrWriter;
    float64(value: number): CdrWriter;
    string(value: string, writeLength?: boolean): CdrWriter;
    /** Writes the delimiter header using object size
     * NOTE: changing endian-ness with a single CDR message is not supported
     */
    dHeader(objectSize: number): CdrWriter;
    /**
     * Writes the member header (EMHEADER)
     * Accomodates for PL_CDR and PL_CDR2 based on the CdrWriter constructor options
     *
     * @param mustUnderstand - Whether the member is required to be understood by the receiver
     * @param id - The member ID
     * @param objectSize - The size of the member in bytes
     * @param lengthCode - Optional length code for CDR2 emHeaders.
     * lengthCode values [5-7] allow the emHeader object size to take the place of the normally encoded member length.
     *
     * NOTE: Dynamically determines default value if not provided that does not affect serialization ie will use lengthCode values [0-4].
     *
     * From Extensible and Dynamic Topic Types in DDS-XTypes v1.3 @ `7.4.3.4.2`:
     * "EMHEADER1 with LC values 5 to 7 also affect the serialization/deserialization virtual machine in that they cause NEXTINT to be
     * reused also as part of the serialized member. This is useful because the serialization of certain members also starts with an
     * integer length, which would take exactly the same value as NEXTINT. Therefore the use of length codes 5 to 7 saves 4 bytes in
     * the serialization."
     * @returns - CdrWriter instance
     */
    emHeader(mustUnderstand: boolean, id: number, objectSize: number, lengthCode?: number): CdrWriter;
    private memberHeaderV1;
    /** Sets the origin to the offset (DDS-XTypes Spec: `PUSH(ORIGIN = 0)`)*/
    private resetOrigin;
    /** Writes the PID_SENTINEL value if encapsulation supports it*/
    sentinelHeader(): CdrWriter;
    private memberHeaderV2;
    sequenceLength(value: number): CdrWriter;
    int8Array(value: Int8Array | number[], writeLength?: boolean): CdrWriter;
    uint8Array(value: Uint8Array | number[], writeLength?: boolean): CdrWriter;
    int16Array(value: Int16Array | number[], writeLength?: boolean): CdrWriter;
    uint16Array(value: Uint16Array | number[], writeLength?: boolean): CdrWriter;
    int32Array(value: Int32Array | number[], writeLength?: boolean): CdrWriter;
    uint32Array(value: Uint32Array | number[], writeLength?: boolean): CdrWriter;
    int64Array(value: BigInt64Array | bigint[] | number[], writeLength?: boolean): CdrWriter;
    uint64Array(value: BigUint64Array | bigint[] | number[], writeLength?: boolean): CdrWriter;
    float32Array(value: Float32Array | number[], writeLength?: boolean): CdrWriter;
    float64Array(value: Float64Array | number[], writeLength?: boolean): CdrWriter;
    /**
     * Calculate the capacity needed to hold the given number of aligned bytes,
     * resize if needed, and write padding bytes for alignment
     * @param size Byte width to align to. If the current offset is 1 and `size`
     *   is 4, 3 bytes of padding will be written
     * @param bytesToWrite Optional, total amount of bytes that are intended to be
     *   written directly following the alignment. This can be used to avoid
     *   additional buffer resizes in the case of writing large blocks of aligned
     *   data such as arrays
     */
    align(size: number, bytesToWrite?: number): void;
    private resizeIfNeeded;
    private resize;
}
//# sourceMappingURL=CdrWriter.d.ts.map