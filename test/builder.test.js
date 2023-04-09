// @flow

import {buildClassInstance, buildDocument} from '../src/builder';
import {Schema} from 'mongoose';
import {ObjectId} from "mongodb";
import type {ClazzInterface} from "../src/builder";

describe('builder', function () {
    // Company schema
    const CompanySchema = new Schema({
        companyName: {type: String, required: true},
        foundedAt: {type: Date, required: true},
    });

    // Updated User schema with nested Company schema
    const UserSchema = new Schema({
        userNumber: {type: Number, required: true},
        name: {type: String, required: true},
        createdAt: {type: Date, required: true},
        address: String,
        active: {type: Boolean, required: true},
        scores: [{
            date: {type: Date, required: true},
            score: Number,
        }],
        extraData: Object,
        objectIdExample: {type: Schema.Types.ObjectId},
        company: CompanySchema,
    });

    class UserClass implements ClazzInterface{
        userNumber: number;
        name: string;
        createdAt: Date;
        address: string;
        active: boolean;

        constructor({ userNumber, name, createdAt, address, active }) {
            this.userNumber = userNumber;
            this.name = name;
            this.createdAt = createdAt;
            this.address = address;
            this.active = active;
        }

        static createFromDocument(document) {
            return new UserClass(document);
        }
    }


    describe('buildDocument', () => {
        it('should handle a Mongoose schema', () => {
            const result = buildDocument(UserSchema);
            expect(result).toEqual({
                _id: expect.any(ObjectId),
                userNumber: 0,
                name: '',
                createdAt: expect.any(Date),
                address: '',
                active: false,
                scores: [{
                    _id: expect.any(ObjectId),
                    date: expect.any(Date),
                    score: 0,
                }],
                extraData: {},
                objectIdExample: expect.any(ObjectId),
                company: {
                    _id: expect.any(ObjectId),
                    companyName: '',
                    foundedAt: expect.any(Date),
                },
            });
        });

        it('should throw an error for invalid input', () => {
            expect(() => buildDocument({})).toThrow('Invalid schema provided');
            expect(() => buildDocument('invalid')).toThrow('Invalid schema provided');
        });
    });

    describe('buildClassInstance', () => {
        it('should handle a class', () => {
            const result = buildClassInstance<UserClass>(UserClass, UserSchema);
            expect(result).toEqual({
                userNumber: 0,
                name: '',
                createdAt: expect.any(Date),
                address: '',
                active: false,
            });
        });

        it('should throw an error for invalid input', () => {
            expect(() => buildClassInstance<UserClass>(UserClass, {})).toThrow('Invalid class constructor provided');
            expect(() => buildClassInstance<UserClass>(UserClass, 'invalid')).toThrow('Invalid class constructor provided');
        });
    });
});