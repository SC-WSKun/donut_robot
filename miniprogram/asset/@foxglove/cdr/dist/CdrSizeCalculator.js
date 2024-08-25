"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CdrSizeCalculator = void 0;
class CdrSizeCalculator {
    constructor() {
        // Two bytes for Representation Id and two bytes for Options
        this.offset = 4;
    }
    get size() {
        return this.offset;
    }
    int8() {
        return this.incrementAndReturn(1);
    }
    uint8() {
        return this.incrementAndReturn(1);
    }
    int16() {
        return this.incrementAndReturn(2);
    }
    uint16() {
        return this.incrementAndReturn(2);
    }
    int32() {
        return this.incrementAndReturn(4);
    }
    uint32() {
        return this.incrementAndReturn(4);
    }
    int64() {
        return this.incrementAndReturn(8);
    }
    uint64() {
        return this.incrementAndReturn(8);
    }
    float32() {
        return this.incrementAndReturn(4);
    }
    float64() {
        return this.incrementAndReturn(8);
    }
    string(length) {
        this.uint32();
        this.offset += length + 1; // Add one for the null terminator
        return this.offset;
    }
    sequenceLength() {
        return this.uint32();
    }
    // Increments the offset by `byteCount` and any required padding bytes and
    // returns the new offset
    incrementAndReturn(byteCount) {
        const alignment = (this.offset - 4) % byteCount;
        if (alignment > 0) {
            this.offset += byteCount - alignment;
        }
        this.offset += byteCount;
        return this.offset;
    }
}
exports.CdrSizeCalculator = CdrSizeCalculator;
//# sourceMappingURL=CdrSizeCalculator.js.map