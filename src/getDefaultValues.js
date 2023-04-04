// @flow

export enum DataType {
    String = 'String',
    Number = 'Number',
    Date = 'Date',
    Boolean = 'Boolean',
    Array = 'Array',
    Object = 'Object',
}

/**
 * Returns the default value for the given data type.
 *
 * @param {DataType} dataType - The data type for which the default value is requested.
 * @returns {any} The default value for the specified data type.
 */
export function getDefaultValues(dataType: DataType): any {
    switch (dataType) {
        case DataType.String:
            return '';
        case DataType.Number:
            return 0;
        case DataType.Date:
            return new Date();
        case DataType.Boolean:
            return false;
        case DataType.Array:
            return [];
        case DataType.Object:
            return {};
        default:
            return null;
    }
}