"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageReader = void 0;
const cdr_1 = require("@foxglove/cdr");
class MessageReader {
    constructor(definitions) {
        // ros2idl modules could have constant modules before the root struct used to decode message
        const rootDefinition = definitions.find((def) => !isConstantModule(def));
        if (rootDefinition == undefined) {
            throw new Error("MessageReader initialized with no root MessageDefinition");
        }
        this.rootDefinition = rootDefinition.definitions;
        this.definitions = new Map(definitions.map((def) => [def.name ?? "", def.definitions]));
    }
    // We template on R here for call site type information if the class type information T is not
    // known or available
    readMessage(buffer) {
        const reader = new cdr_1.CdrReader(buffer);
        return this.readComplexType(this.rootDefinition, reader);
    }
    readComplexType(definition, reader) {
        const msg = {};
        if (definition.length === 0) {
            // In case a message definition definition is empty, ROS 2 adds a
            // `uint8 structure_needs_at_least_one_member` field when converting to IDL,
            // to satisfy the requirement from IDL of not being empty.
            // See also https://design.ros2.org/articles/legacy_interface_definition.html
            reader.uint8();
            return msg;
        }
        for (const field of definition) {
            if (field.isConstant === true) {
                continue;
            }
            if (field.isComplex === true) {
                // Complex type
                const nestedDefinition = this.definitions.get(field.type);
                if (nestedDefinition == undefined) {
                    throw new Error(`Unrecognized complex type ${field.type}`);
                }
                if (field.isArray === true) {
                    // For dynamic length arrays we need to read a uint32 prefix
                    const arrayLength = field.arrayLength ?? reader.sequenceLength();
                    const array = [];
                    for (let i = 0; i < arrayLength; i++) {
                        array.push(this.readComplexType(nestedDefinition, reader));
                    }
                    msg[field.name] = array;
                }
                else {
                    msg[field.name] = this.readComplexType(nestedDefinition, reader);
                }
            }
            else {
                // Primitive type
                if (field.isArray === true) {
                    const deser = typedArrayDeserializers.get(field.type);
                    if (deser == undefined) {
                        throw new Error(`Unrecognized primitive array type ${field.type}[]`);
                    }
                    // For dynamic length arrays we need to read a uint32 prefix
                    const arrayLength = field.arrayLength ?? reader.sequenceLength();
                    msg[field.name] = deser(reader, arrayLength);
                }
                else {
                    const deser = deserializers.get(field.type);
                    if (deser == undefined) {
                        throw new Error(`Unrecognized primitive type ${field.type}`);
                    }
                    msg[field.name] = deser(reader);
                }
            }
        }
        return msg;
    }
}
exports.MessageReader = MessageReader;
function isConstantModule(def) {
    return def.definitions.length > 0 && def.definitions.every((field) => field.isConstant);
}
const deserializers = new Map([
    ["bool", (reader) => Boolean(reader.int8())],
    ["int8", (reader) => reader.int8()],
    ["uint8", (reader) => reader.uint8()],
    ["int16", (reader) => reader.int16()],
    ["uint16", (reader) => reader.uint16()],
    ["int32", (reader) => reader.int32()],
    ["uint32", (reader) => reader.uint32()],
    ["int64", (reader) => reader.int64()],
    ["uint64", (reader) => reader.uint64()],
    ["float32", (reader) => reader.float32()],
    ["float64", (reader) => reader.float64()],
    ["string", (reader) => reader.string()],
    ["time", (reader) => ({ sec: reader.int32(), nsec: reader.uint32() })],
    ["duration", (reader) => ({ sec: reader.int32(), nsec: reader.uint32() })],
    ["wstring", throwOnWstring],
]);
const typedArrayDeserializers = new Map([
    ["bool", readBoolArray],
    ["int8", (reader, count) => reader.int8Array(count)],
    ["uint8", (reader, count) => reader.uint8Array(count)],
    ["int16", (reader, count) => reader.int16Array(count)],
    ["uint16", (reader, count) => reader.uint16Array(count)],
    ["int32", (reader, count) => reader.int32Array(count)],
    ["uint32", (reader, count) => reader.uint32Array(count)],
    ["int64", (reader, count) => reader.int64Array(count)],
    ["uint64", (reader, count) => reader.uint64Array(count)],
    ["float32", (reader, count) => reader.float32Array(count)],
    ["float64", (reader, count) => reader.float64Array(count)],
    ["string", readStringArray],
    ["time", readTimeArray],
    ["duration", readTimeArray],
    ["wstring", throwOnWstring],
]);
function readBoolArray(reader, count) {
    const array = new Array(count);
    for (let i = 0; i < count; i++) {
        array[i] = Boolean(reader.int8());
    }
    return array;
}
function readStringArray(reader, count) {
    const array = new Array(count);
    for (let i = 0; i < count; i++) {
        array[i] = reader.string();
    }
    return array;
}
function readTimeArray(reader, count) {
    const array = new Array(count);
    for (let i = 0; i < count; i++) {
        const sec = reader.int32();
        const nsec = reader.uint32();
        array[i] = { sec, nsec };
    }
    return array;
}
function throwOnWstring() {
    throw new Error("wstring is implementation-defined and therefore not supported");
}
//# sourceMappingURL=MessageReader.js.map