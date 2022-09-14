import {Schema, model }from 'mongoose';
import { Ibook } from "../types/books";
const bookSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
});

// export default new Model('Books', bookSchema);
export default model<Ibook>("Books", bookSchema);