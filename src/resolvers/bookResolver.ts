import { Book } from '../models/Book';
import { Student } from '../models/Student';

export const bookResolver = {
  Query: {
    books: async () => await Book.find(),
    book: async (_, { id }) => await Book.findById(id),
  },
  Mutation: {
    addBook: async (_, { title, author }) => {
      const newBook = new Book({ title, author });
      await newBook.save();
      return newBook;
    },
    updateBook: async (_, { id, title, author }) => {
      const updatedBook = await Book.findByIdAndUpdate(id, { title, author }, { new: true });
      return updatedBook;
    },
    deleteBook: async (_, { id }) => {
      const deletedBook = await Book.findByIdAndRemove(id);
      return deletedBook;
    },
  },
};
