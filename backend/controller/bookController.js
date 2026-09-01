import { Book } from '../models/bookModels.js';

export const createBook = async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send({
        message: 'Send all required fields: title, author, publishYear'
      });
    }

    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear
    };

    const book = await Book.create(newBook);

    return res.status(201).send(book);
  } catch (error) {
    console.log(error.message);

    return res.status(500).send({
      message: error.message
    });
  }
};

export const getAllBooks = async (req, res) => {
  try {
    const allBooks = await Book.find({});
    return res.status(200).json({ count: allBooks.length, data: allBooks });
  } catch (error) {
    console.log(error.message);

    return res.status(500).send({
      message: error.message
    });
  }
};
export const getSingleBook = async (req, res) => {
  try {
    const { id } = req.params;
    const singleBook = await Book.findById(id);
    return res.status(200).json(singleBook);
  } catch (error) {
    console.log(error.message);

    return res.status(500).send({
      message: error.message
    });
  }
};

export const updateBook = async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send({
        message: 'Send all required fields: title, author, publishYear'
      });
    }
    const { id } = req.params;
    const result = await Book.findByIdAndUpdate(id, req.body);
    if (!result) {
      return res.status(404).json({ message: 'Book not found' });
    }
    return res.status(200).json({ message: 'Book updated successfully' });
  } catch (error) {
    console.log(error.message);

    return res.status(500).send({
      message: error.message
    });
  }
};

export const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Book.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ message: 'Book not found' });
    }
    return res.status(200).json({ message: 'Book deleted successfuly' });
  } catch (error) {
    console.log(error.message);

    return res.status(500).send({
      message: error.message
    });
  }
};
