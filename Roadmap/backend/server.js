const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const path = require('path');
const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Servir arquivos estáticos da pasta frontend
app.use(express.static(path.join(__dirname, '../frontend')));

// Conectar ao banco de dados SQLite
const db = new sqlite3.Database('../usuarios.db', (err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err.message);
    } else {
        console.log('Conectado ao banco de dados SQLite.');
    }
});

// Criar tabela de usuários se não existir
db.run(`
    CREATE TABLE IF NOT EXISTS usuarios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        matricula TEXT NOT NULL UNIQUE
    )
`, () => {
    // Inserir usuários iniciais
    const usuariosIniciais = [
        { nome: 'Rodrigo Angelo', matricula: '13338465769' },
        { nome: 'Maria Oliveira', matricula: '67890' },
        { nome: 'Carlos Souza', matricula: '54321' }
    ];

    usuariosIniciais.forEach(({ nome, matricula }) => {
        db.get('SELECT matricula FROM usuarios WHERE matricula = ?', [matricula], (err, row) => {
            if (err) {
                console.error('Erro ao verificar usuário:', err.message);
            } else if (!row) {
                db.run('INSERT INTO usuarios (nome, matricula) VALUES (?, ?)', [nome, matricula], (err) => {
                    if (err) {
                        console.error(`Erro ao inserir ${nome}:`, err.message);
                    } else {
                        console.log(`Usuário ${nome} inserido com sucesso.`);
                    }
                });
            } else {
                console.log(`Usuário com matrícula ${matricula} já existe.`);
            }
        });
    });
});

// Rota para login
app.post('/login', (req, res) => {
    const { nome, matricula } = req.body;

    if (!nome || !matricula) {
        return res.status(400).json({ error: 'Nome e matrícula são obrigatórios.' });
    }

    const query = 'SELECT * FROM usuarios WHERE nome = ? AND matricula = ?';
    db.get(query, [nome, matricula], (err, row) => {
        if (err) {
            return res.status(500).json({ error: 'Erro no servidor.' });
        }
        if (row) {
            res.json({ success: true, message: 'Login bem-sucedido!' });
        } else {
            res.status(401).json({ error: 'Nome ou matrícula inválidos.' });
        }
    });
});

// Iniciar servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});