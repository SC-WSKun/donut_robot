import { EncapsulationKind } from "./EncapsulationKind";
import { LengthCode } from "./lengthCodes";
export declare class CdrReader {
    private view;
    private littleEndian;
    private hostLittleEndian;
    private eightByteAlignment;
    private isCDR2;
    /** Origin offset into stream used for alignment */
    private origin;
    readonly usesDelimiterHeader: boolean;
    readonly usesMemberHeader: boolean;
    offset: number;
    get kind(): EncapsulationKind;
    get decodedBytes(): number;
    get byteLength(): number;
    constructor(data: ArrayBufferView);
    int8(): number;
    uint8(): number;
    int16(): number;
    uint16(): number;
    int32(): number;
    uint32(): number;
    int64(): bigint;
    uint64(): bigint;
    uint16BE(): number;
    uint32BE(): number;
    uint64BE(): bigint;
    float32(): number;
    float64(): number;
    string(prereadLength?: number): string;
    /** Reads the delimiter header which contains and returns the object size */
    dHeader(): number;
    /**
     * Reads the member header (EMHEADER) and returns the member ID, mustUnderstand flag, and object size with optional length code
     * The length code is only present in CDR2 and should prompt objectSize to be used in place of sequence length if applicable.
     * See Extensible and Dynamic Topic Types (DDS-XTypes) v1.3 @ `7.4.3.4.2` for more info about CDR2 EMHEADER composition.
     * If a sentinelHeader was read (PL_CDR v1), the readSentinelHeader flag is set to true.
     */
    emHeader(): {
        mustUnderstand: boolean;
        id: number;
        objectSize: number;
        lengthCode?: LengthCode;
        readSentinelHeader?: boolean;
    };
    /** XCDR1 PL_CDR encapsulation parameter header*/
    private memberHeaderV1;
    /** Sets the origin to the offset (DDS-XTypes Spec: `PUSH(ORIGIN = 0)`)*/
    private resetOrigin;
    /** Reads the PID_SENTINEL value if encapsulation kind supports it (PL_CDR version 1)*/
    sentinelHeader(): void;
    private memberHeaderV2;
    /** Uses the length code to derive the member object size in
     * the EMHEADER, sometimes reading NEXTINT (the next uint32
     * following the header) from the buffer */
    private emHeaderObjectSize;
    sequenceLength(): number;
    int8Array(count?: number): Int8Array;
    uint8Array(count?: number): Uint8Array;
    int16Array(count?: number): Int16Array;
    uint16Array(count?: number): Uint16Array;
    int32Array(count?: number): Int32Array;
    uint32Array(count?: number): Uint32Array;
    int64Array(count?: number): BigInt64Array;
    uint64Array(count?: number): BigUint64Array;
    float32Array(count?: number): Float32Array;
    float64Array(count?: number): Float64Array;
    stringArray(count?: number): string[];
    /**
     * Seek the current read pointer a number of bytes relative to the current position. Note that
     * seeking before the four-byte header is invalid
     * @param relativeOffset A positive or negative number of bytes to seek
     */
    seek(relativeOffset: number): void;
    /**
     * Seek to an absolute byte position in the data. Note that seeking before the four-byte header is
     * invalid
     * @param offset An absolute byte offset in the range of [4-byteLength)
     */
    seekTo(offset: number): void;
    private align;
    private typedArray;
    private typedArrayUnaligned;
    private typedArraySlow;
}
//# sourceMappingURL=CdrReader.d.ts.map