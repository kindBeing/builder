// @flow

import {buildObject} from '../src/builder';
import type {DataType, OptionalDataType} from '../src/types';
import {Schema} from 'mongoose';

describe('builder', function () {
    const UserSchema = new Schema({
        name: { type: String, required: true },
        age: Number,
        email: String,
        address: { type: String, required: true },
    });

    const UserType: $ReadOnly<{ [key: string]: DataType | OptionalDataType }> = {
        id: 'String',
        name: 'String',
        age: 'Number?',
        email: 'String?',
        address: 'String',
    };

    it('buildObject should generate correct object structure for Mongoose schema', () => {
        const expectedObject = {
            name: '',
            age: 0,
            email: '',
            address: '',
        };

        const generatedObject = buildObject(UserSchema);
        expect(generatedObject).toEqual(expectedObject);
    });

    it('buildObject should generate correct object structure for flow type/interface', () => {
        const expectedObject = {
            id: '',
            name: '',
            age: 0,
            email: '',
            address: '',
        };

        const generatedObject = buildObject(UserType);
        expect(generatedObject).toEqual(expectedObject);
    });
});