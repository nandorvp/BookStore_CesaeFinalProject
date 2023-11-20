import express from 'express';
import { Book } from '../models/Book.js';

const router = express.Router();


//Route to add a new Book
router.post('/',async (request, response) => {
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

        const userAuthenticated = request.session ? request.session.userAuthenticated : false;
        const existingUser = request.session ? request.session.existingUser : null;

        // Renderiza a página index.ejs e passa os dados dos livros
        response.render('index', { books,userAuthenticated, existingUser});
    } catch (error) {
        console.log(error);
        response.status(500).send({ message: error.message });
    }
});


//Route to get Book by id
router.get('/detalhesLivro/:id', async (request, response) => {
    try {
      const { id } = request.params;
      const { existingUser } = request.session;

  
      const book = await Book.findById(id);


        

        if(existingUser != undefined && existingUser.role == 'admin') {
            return response.render('editarLivroAdmin', {book});
        } else {
            return response.render('detalhesLivro', { book });
        }

       
    } catch (error) {
      console.log(error);
      response.status(500).send({ message: error.message });
      return;
    }
  });


//Route to update a Book
router.post('/:id', async (request, response) => {
    try {
        const { id } = request.params;

        // Verifica os campos obrigatórios
        const requiredFields = ['title', 'author', 'publishYear'];
        const missingFields = requiredFields.filter(field => !request.body[field]);

        if (missingFields.length > 0) {
            return response.status(400).send({
                message: `Fill in all required fields: ${missingFields.join(', ')}`,
            });
        }

        // Separa a string de keywords em um array
        const keywords = request.body.keywords.split(',').map(keyword => keyword.trim());

        // Atualiza o livro, incluindo as keywords
        const result = await Book.findByIdAndUpdate(id, { ...request.body, keywords }, { new: true });

        if (!result) {
            return response.status(404).json({ message: 'Book not found' });
        }

        return response.status(200).send({ message: 'Book updated successfully', updatedBook: result });

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