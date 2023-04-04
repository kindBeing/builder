// @flow

import type {DataType} from "./types.js";

/**
 * Returns the default value for the given data type.
 *
 * @param {DataType} dataType - The data type for which the default value is requested.
 * @returns {any} The default value for the specified data type.
 */
export function getDefaultValues(dataType: DataType): any {
    switch (dataType) {
        case 'String':
            return '';
        case 'Number':
            return 0;
        case 'Date':
            return new Date();
        case 'Boolean':
            return false;
        case 'Array':
            return [];
        case 'Object':
            return {};
        default:
            return null;
    }
}