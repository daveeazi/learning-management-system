import express from 'express';
import { Book } from '../models/Book';
import { bookController } from '../controllers/bookController';

const router = express.Router();

router.get('/', async (req, res) => {
  const books = await Book.find();
  res.json(books);
});

router.post('/', bookController.createBook);

router.put('/:id', bookController.updateBook);

router.delete('/:id', bookController.deleteBook);

export default router;
