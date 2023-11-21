import express from 'express';
import { Book } from '../models/Book.js';

const router = express.Router();

//Route to get add Book view
router.get('/addBook', async (request, response) => {
    try {
        const { existingUser } = request.session;

        if (existingUser != undefined && existingUser.role == 'admin') {
            return response.render('addBookAdmin', { existingUser });
        } else {
            return response.redirect('/');
        }

    } catch (error) {
        console.log(error);
        response.status(500).send({ message: error.message });
        return;
    }
});

//Route to add a new Book
router.post('/addBook', async (request, response) => {
        try {
            if (
                !request.body.title ||
                !request.body.author ||
                !request.body.publishYear
            ) {
                return response.status(400).send({
                    message: 'Fill in all required fields: title, author, and publish year',
                });
            }
    
            const newBook = {
                title: request.body.title,
                author: request.body.author,
                publishYear: request.body.publishYear,
                publishingHouse: request.body.publishingHouse,
                price: request.body.price,
                quantity: request.body.quantity,
                sinopse: request.body.sinopse,
                sinopseAuthor: request.body.sinopseAuthor,
                image: request.body.image,
                keywords: request.body.keywords
            };
    
            const book = await Book.create(newBook);
    
            const showMessage = true;
            const message = 'Book added successfully';
    
            // Armazena os dados na sessão
            if (request.session) {
                request.session.flashData = { showMessage, message };
            }
    
            response.redirect('/admin');
            
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
        response.render('index', { books, userAuthenticated, existingUser });
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
        const userAuthenticated = request.session ? request.session.userAuthenticated : false;



        const book = await Book.findById(id);

        if (existingUser != undefined && existingUser.role == 'admin') {
            return response.render('editarLivroAdmin', { book, existingUser });
        } else {
            return response.render('detalhesLivro', { book,userAuthenticated,existingUser });
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
        const { existingUser } = request.session;
        const books = await Book.find({});



        // Verifica os campos obrigatórios
        const requiredFields = ['title', 'author', 'publishYear'];
        const missingFields = requiredFields.filter(field => !request.body[field]);

        if (missingFields.length > 0) {
            return response.status(400).send({
                message: `Fill in all required fields: ${missingFields.join(', ')}`,
            });
        }

        // Separa a string de keywords num array
        const keywords = request.body.keywords.split(',').map(keyword => keyword.trim());

        // Atualiza o livro, incluindo as keywords
        const result = await Book.findByIdAndUpdate(id, { ...request.body, keywords }, { new: true });

        if (!result) {
            return response.status(404).json({ message: 'Book not found' });
        }

        const showMessage = true;
        const message = 'Book updated successfully';

        // Armazena os dados na sessão
        if (request.session) {
            request.session.flashData = { showMessage, message };
        }

        response.redirect('/admin');
       
        
    } catch (error) {
        console.log(error);
        response.status(500).send({ message: error.message });
    }
});

//Route for delete a book
router.post('/delete/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const result = await Book.findByIdAndDelete(id);

        if (!result) {
            return response.status(404).json({ message: 'Book not found' });
        }

        const showMessage = true;
        const message = 'Book deleted successfully';

        if (request.session) {
            request.session.flashData = { showMessage, message };
        }
        response.redirect('/admin');
    } catch (error) {
        console.log(error);
        response.status(500).send({ message: error.message });
    }
});

export default router;