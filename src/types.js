import type {Schema} from "mongoose";

export type OptionalDataType = 'String?' | 'Number?' | 'Date?' | 'Boolean?' | 'Array?' | 'Object?';

export type DataType = 'String' | 'Number' | 'Date' | 'Boolean' | 'Array' | 'Object';

type MongooseSchema = Schema;
