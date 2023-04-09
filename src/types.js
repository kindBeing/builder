// @flow

import type {Schema} from "mongoose";

// The possible values of currentPath.instance in Mongoose correspond to the different schema types that Mongoose supports. Here is a list of possible values for currentPath.instance:
//
// 'String'
// 'Number'
// 'Date'
// 'Buffer'
// 'Boolean'
// 'Map'
// 'ObjectId'
// 'Array'
// 'Decimal128'
// 'Embedded' (for subdocuments)
//     'Mixed' (for generic types that can store any data)
// These values represent the various data types that can be used in a Mongoose schema. Keep in mind that some of these types, such as 'Embedded' and 'Mixed', represent more complex structures or generic data types.


export type MongoDataType =
    'String'
    | 'Boolean'
    | 'Number'
    | 'Date'
    | 'Schema'
    | 'ObjectID'
    | 'Mixed' // (for generic types that can store any data)
    | 'Array';

/**
 * Represents a Mongoose schema.
 * Defined as `mongoose.Schema` to ensure better type safety.
 */
export type MongooseSchema = Schema;
