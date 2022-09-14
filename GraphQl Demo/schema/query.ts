// import booksData from './data'
import {books} from '../db/';

const query = {
    books: async ({limit} : any, context : any) => {
        // return limit ? booksData.slice(0, limit) : booksData;
        return await books.getAllBooks(limit)
    },

    book: async ({id} : any, context : any) => {
        // return booksData.find(book => book.id === id);
        return await books.getBookById(id)
    }
};

export default query