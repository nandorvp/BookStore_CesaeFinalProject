import express from 'express';
import { User } from '../models/User.js';
import { Book } from '../models/Book.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const { sign, verify } = jwt;

const router = express.Router();

//Rota que redireciona para a página de Login
router.get('/login', async function (req, res) {
    const userAuthenticated = false;
    const existingUser = '';

    return res.status(234).render('login', {userAuthenticated,existingUser});
});

//Rota que redireciona para a página de Registo
router.get('/register', async function (req, res) {
    const userAuthenticated = false;
    const existingUser = '';
    return res.status(234).render('register', {userAuthenticated, existingUser});
});

//Rota que redireciona para a página de Admin
router.get('/admin', async function (req, res) {
    const flashData = req.session ? req.session.flashData : null;
    if (req.session) {
        delete req.session.flashData;
    }
    const { existingUser } = req.session;
    const books = await Book.find({});
    if(existingUser.role == 'admin') {
        req.session.userAuthenticated = true;
        req.session.existingUser = existingUser;
        return res.render('admin', {existingUser,books, flashData, message: flashData ? flashData.message : null });       
    }
});

//Rota que lida com o registo de um utilizador
router.post("/register", async (req, res) => {
    const { username, email, password } = req.body;
    const saltRounds = 10;

    try {
        // Verificar se o utilizador ou o email já existem
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });

        if (existingUser) {
            return res.status(400).json({ error: "O username ou email já estão em utilização. Por favor, escolha outro." });
        }

        // Se não existir, criar um novo utilizador
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            role: "client",
        });

        await newUser.save();
        return res.status(201).json({ message: "Utilizador registado com sucesso. A redirecionar para /books" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Erro ao registar utilizador" });
    }
});

router.post("/login", async (req, res) => {
    try {
        const existingUser = await User.findOne({ username: req.body.username });
        
        if (!existingUser) {
            return res.render("login", { error: "O username não existe. Por favor, registe-se." });
        }

        const isPasswordCorrect = await bcrypt.compare(req.body.password, existingUser.password);

        if (isPasswordCorrect) {
            // Geração do token JWT
            const jwtToken = jwt.sign({ username: existingUser.username }, '1z!G3rU2Oz#7qJ&i6I^sP5n@tL$mAfFdC!bB*vX@e7');

            // Salvar o token nos cookies
            res.cookie('token', jwtToken, { httpOnly: true });
            const books = await Book.find({});
            const userAuthenticated = true;

            if(existingUser.role == 'admin') {
                req.session.userAuthenticated = true;
                req.session.existingUser = existingUser;
                return res.redirect('/admin');        
            }

            // Definir a variável userAuthenticated como true e armazenar o username
            if (req.session) {
                req.session.userAuthenticated = true;
                req.session.existingUser = existingUser;

                return res.redirect('/');
            }
        } else {
            return res.render("login", { error: "Password incorreta. Tente novamente." });
        }
    } catch (error) {
        console.log(error);
        return res.render("login", { error: "Ocorreu um erro ao fazer login. Por favor, tente novamente mais tarde." });
    }
});

router.get('/logout', async (req, res) => {
    // Limpar a sessão para fazer logout
    req.session.destroy((err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Erro ao fazer logout" });
        }
        res.redirect('/'); // Redirecionar para a página de login após logout
    });
});


export default router;