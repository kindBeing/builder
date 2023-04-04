// @flow

declare module 'mongoose' {
    declare type Mongoose$Schema = any;
    declare type Mongoose$Document = any;

    declare module.exports: {
        Schema: Mongoose$Schema,
        Document: Mongoose$Document,
        // Add any other Mongoose exports you need in your project
    };
}
