// @flow

import {getDefaultValues} from '../src/getDefaultValues';

describe('getDefaultValues', function () {
    it('getDefaultValues should return appropriate default values', () => {
        expect(getDefaultValues('String')).toBe('');
        expect(getDefaultValues('Number')).toBe(0);
        expect(getDefaultValues('Boolean')).toBe(false);
        expect(getDefaultValues('Array')).toEqual([]);
        expect(getDefaultValues('Object')).toEqual({});
        expect(getDefaultValues('Date')).toBeInstanceOf(Date);
    });
});
