// @flow

import type {Schema} from "mongoose";

export type OptionalDataType = 'String?' | 'Number?' | 'Date?' | 'Boolean?' | 'Array?' | 'Object?';

export type DataType = 'String' | 'Number' | 'Date' | 'Boolean' | 'Array' | 'Object';

/**
 * Represents a Mongoose schema.
 * Defined as `mongoose.Schema` to ensure better type safety.
 */
export type MongooseSchema = Schema;
