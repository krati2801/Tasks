// import books from './data'
import { books } from '../db'

const mutation = {
    addBook: async ({ title, author, description } : any, context : any) => {
        try {
            const book = await books.createBook({ title, author, description })
            // const book = { id: `${books.length+1}`, title, author, description }
            // books.push(book)
            return {
                data: book,
                ok: true,
                error: ''
            };
        } catch (error : any) {
            return {
                data: null,
                ok: false,
                error: error.message
            };
        }
    },

    updateBook: async ({ id, title, author, description } : any, context : any) => {
        // const book = books.find(book => book.id === id);
        // if (!book) {
        //     return {
        //         data: null,
        //         ok: false,
        //         error: 'Book not found'
        //     };
        // }
        // if (author) book.author = author
        // if (title) book.title = title
        // if (description) book.description = description
        // books = books.map(b => b.id === id ? book : b)
        try {
            const book = await books.updateBook(id, { title, author, description })
            if (!book) {
                return {
                    data: null,
                    ok: false,
                    error: 'Book not found'
                };
           }
            return {
                data: book,
                ok: true,
                error: ''
            };
        } catch (error : any) {
            return {
                data: null,
                ok: false,
                error: error.message
            };
        }
    },
    deleteBook: async ({ id} : any, context : any) => {
        // const book = books.find(book => book.id === id)
        // books = books.filter(book => book.id !== id)
        try {
            const book = await books.deleteBook(id)
            if (!book) {
                return {
                    data: null,
                    ok: false,
                    error: 'Book not found'
                };
            }
            return {
                data: book,
                ok: true,
                error: ''
            };
        }
        catch (error : any) {
            return {
                data: null,
                ok: false,
                error: error.message
            };
        }
    }
};

export default mutation