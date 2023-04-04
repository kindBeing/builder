// @flow

import expect from 'expect'
import {DataType, getDefaultValues} from '../src/getDefaultValues.js';

// ... (previous test code)

describe('getDefaultValues', function () {
    it('getDefaultValues should return appropriate default values', () => {
        expect(getDefaultValues(DataType.String)).toBe('');
        expect(getDefaultValues(DataType.Number)).toBe(0);
        expect(getDefaultValues(DataType.Boolean)).toBe(false);
        expect(getDefaultValues(DataType.Array)).toEqual([]);
        expect(getDefaultValues(DataType.Object)).toEqual({});
        expect(getDefaultValues(DataType.Date)).toBeInstanceOf(Date);
    });
});
