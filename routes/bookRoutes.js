import express from 'express';
import { Book } from '../models/Book.js';

const router = express.Router();


//Route to add a new Book
router.post('/', async (request, response) => {
    try {
        if (
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear
        ) {
            return response.status(400).send({
                message: 'Fill in all required fields: title, author and publish year',
            });
        }
        const newBook = {
            title: request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear
        };

        const book = await Book.create(newBook);

        return response.status(201).send(book);

    } catch (error) {
        console.log(error);
        response.status(500).send({ message: error.message });
    }
});

//Route to get all books
router.get('/', async (request, response) => {
    try {
        const books = await Book.find({});
        // Renderiza a página index.ejs e passa os dados dos livros
        response.render('index', { books });
    } catch (error) {
        console.log(error);
        response.status(500).send({ message: error.message });
    }
});

//Route to get Book by id
router.get('/detalhesLivro/:id', async (request, response) => {
    try {
      const { id } = request.params;
  
      const book = await Book.findById(id);
  
      return response.render('detalhesLivro', { book });
       
    } catch (error) {
      console.log(error);
      response.status(500).send({ message: error.message });
      return;
    }
  });

//Route to get Book by name
router.get('/books/search/:query', async (request, response) => {
    try {
      const query = request.params.query;
  
      const searchCriteria = {
        $or: [
          { title: { $regex: query, $options: 'i' } },
          { author: { $regex: query, $options: 'i' } },
        ],
      };
  
      const books = await Book.find(searchCriteria);
  
      response.status(200).send({ data: books });
    } catch (error) {
      console.log(error);
      response.status(500).send({ message: error.message });
    }
  });

//Route to update a Book
router.put('/:id', async (request, response) => {
    try {
        if (
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear
        ) {
            return response.status(400).send({
                message: 'Fill in all required fields: title, author and publish year',
            });
        }

        const { id } = request.params;

        const result = await Book.findByIdAndUpdate(id, request.body);

        if (!result) {
            return response.status(404).json({ message: 'Book not found' });
        }

        return response.status(200).send({ message: 'Book updated successfully' });

    } catch (error) {
        console.log(error);
        response.status(500).send({ message: error.message });
    }
});

//Route for delete a book
router.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const result = await Book.findByIdAndDelete(id);

        if (!result) {
            return response.status(404).json({ message: 'Book not found' });
        }

        return response.status(200).send({ message: 'Book deleted successfully' });

    } catch (error) {
        console.log(error);
        response.status(500).send({ message: error.message });
    }
});

export default router;