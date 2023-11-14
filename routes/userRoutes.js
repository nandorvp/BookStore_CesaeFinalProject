import express from 'express';
import { User } from '../models/User.js';
import bcrypt from 'bcrypt';

const router = express.Router();

//Rota que redireciona para a página de Login
router.get('/login', async function (req, res) {
    return res.status(234).render('login');
});

//Rota que redireciona para a página de Registo
router.get('/register', async function (req, res) {
    return res.status(234).render('register');
});

router.post("/register", async (req, res) => {
    const { username, email, password } = req.body;
    const saltRounds = 10;

    try {
        // Verificar se o usuário ou o email já existem
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });

        if (existingUser) {
            return res.status(400).json({ error: "O username ou email já estão em utilização. Por favor, escolha outro." });
        }

        // Se não existir, criar um novo usuário
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


export default router;