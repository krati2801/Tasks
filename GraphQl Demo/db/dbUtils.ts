import BookModel from './books';

const getAllBooks = async (limit : number) => {
    return await BookModel.find({}).limit(limit);
}

const getBookById = async (id : string) => {
    return await BookModel.findById(id);
}

const createBook = async ({ title, description, author} : any) => {
    return await BookModel.create({ title, description, author });
}

const updateBook = async (id : string, { title, description, author } : any) => {
    const set : any = {};
    if (title) set.title = title;
    if (description) set.description = description;
    if (author) set.author = author;
    return await BookModel.findByIdAndUpdate(id, set);
}

const deleteBook = async (id : string) => {
    return await BookModel.findByIdAndDelete(id);
}

export default {
    getAllBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook
}