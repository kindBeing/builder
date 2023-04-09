// @flow

import type {MongoDataType, MongooseSchema} from './types';
import {ObjectId} from "mongodb";
import {Schema} from "mongoose";

// Update the getDefaultValues function
function getDefaultValues(dataType: MongoDataType): any {
    switch (dataType) {
        case 'String':
            return '';
        case 'Boolean':
            return false;
        case 'Number':
            return 0;
        case 'Date':
            return new Date();
        case 'Schema':
            return new Schema({});
        case 'ObjectID':
            return new ObjectId();
        case 'Mixed':
            return {};
        case 'Array':
            return [];
        default:
            return undefined;
    }
}

function getSchemaDefault(currentPath) {
    return currentPath.options.default && currentPath.options.default();
}

function handleSchema(schema: MongooseSchema): { [key: string]: any } {
    let result = {};
    for (let key in schema.paths) {
        if (key === '__v') continue;

        const currentPath = schema.paths[key];

        if (currentPath.instance === 'Array') {
            const arrayType = currentPath.options.type;

            if (arrayType && arrayType[0]) {
                if (arrayType[0].schema) {
                    result[key] = [handleSchema(arrayType[0].schema)];
                }
                const subSchema = new Schema(arrayType[0]);
                result[key] = getSchemaDefault(currentPath) ?? [handleSchema(subSchema)];
            } else {
                result[key] = getSchemaDefault(currentPath) ?? getDefaultValues(currentPath.instance);
            }
        } else if (currentPath.schema) {
            result[key] = handleSchema(currentPath.schema);
        } else {
            result[key] = getSchemaDefault(currentPath) ?? getDefaultValues(currentPath.instance);
        }
    }
    return result;
}

/**
 * Generates an object with default values based on the provided Mongoose schema.
 *
 * @param {MongooseSchema} schema - The Mongoose schema.
 * @returns {object} The generated object with default values based on the provided schema.
 */
function buildDocument(schema: MongooseSchema): { [key: string]: any } {
    if (typeof schema !== 'object' || schema.constructor.name !== 'Schema') {
        throw new Error('Invalid schema provided');
    }

    return handleSchema(schema);
}

type ClassWithCreateFromDocument<T> = {
    new(): T,
    createFromDocument: (doc: $Shape<T>) => T,
};

/**
 * Generates a class instance from a Mongoose schema by creating a document
 * with default values based on the schema and then converting it to an instance
 * of the specified class using the class's `createFromDocument` method.
 *
 * @param {Class} clazz - The class to instantiate. Must have a static `createFromDocument` method.
 * @param {MongooseSchema} schema - The Mongoose schema.
 * @returns {T} A class instance created from the document.
 */
function buildClassInstance<T>(clazz: ClassWithCreateFromDocument<T>, schema: MongooseSchema): T {
    // Check if the input clazz is a class
    if (typeof clazz !== 'function' || !clazz.prototype) {
        throw new Error('Invalid class provided');
    }

    const document = buildDocument(schema);
    return clazz.createFromDocument(document);
}

export {buildDocument, buildClassInstance};