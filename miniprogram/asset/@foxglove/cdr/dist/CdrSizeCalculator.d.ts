export declare class CdrSizeCalculator {
    private offset;
    get size(): number;
    int8(): number;
    uint8(): number;
    int16(): number;
    uint16(): number;
    int32(): number;
    uint32(): number;
    int64(): number;
    uint64(): number;
    float32(): number;
    float64(): number;
    string(length: number): number;
    sequenceLength(): number;
    private incrementAndReturn;
}
//# sourceMappingURL=CdrSizeCalculator.d.ts.map