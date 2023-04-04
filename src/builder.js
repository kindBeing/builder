// @flow

import { getDefaultValues } from './getDefaultValues';
import type {DataType, MongooseSchema, OptionalDataType} from './types';
import type { Schema } from 'mongoose';

/**
 * Represents a flow type or interface schema.
 * The keys are strings, and the values are either a DataType or a combination of DataType with a `?` at the end.
 * The `?` represents that the property is optional.
 */
type FlowTypeSchema = {
    [key: string]: DataType | OptionalDataType;
};

const handleSchema = (schema: MongooseSchema): { [key: string]: any } => {
    let result = {};
    for (let key in schema.paths) {
        if (key === '_id' || key === '__v') continue;
        if (schema.paths[key].schema) {
            result[key] = buildObject(schema.paths[key].schema);
        }
        // Handling of required fields for later
        // else if (schema.paths[key].isRequired || schema.paths[key].options.required) {
        result[key] = getDefaultValues(schema.paths[key].instance);
        // }
    }
    return result;
};

const buildNestedObject = (nestedSchema: FlowTypeSchema): { [key: string]: any } => {
    let nestedResult = {};
    for (let key in nestedSchema) {
        let value = nestedSchema[key];
        let isRequired = !value.endsWith('?');
        // // Returns standard data type by stripping the question mark
        let dataType: DataType = isRequired ? ((value: any): DataType) : ((value.slice(0, -1): any): DataType);

        if (dataType === 'Object') {
            nestedResult[key] = buildNestedObject((nestedSchema[key]: any));
        }
        // Handling of required fields for later
        // else if (isRequired) {
        nestedResult[key] = getDefaultValues(dataType);
        // }
    }
    return nestedResult;
};

/**
 * Generates an object with default values based on the provided Mongoose schema or flow type/interface schema.
 *
 * @param {MongooseSchema | FlowTypeSchema} schema - The Mongoose schema or flow type/interface schema.
 * @returns {object} The generated object with default values based on the provided schema.
 */
function buildObject(schema: MongooseSchema | FlowTypeSchema): { [key: string]: any } {
    if (typeof schema !== 'object') {
        throw new Error('Invalid schema provided');
    }

    let result = {};

    if (schema.constructor.name === 'Schema') {
        // Handle Mongoose schema
        result = handleSchema((schema: any));
    } else {
        // Handle flow type or interface
        result = buildNestedObject((schema: any));
    }

    return result;
}

export { buildObject };