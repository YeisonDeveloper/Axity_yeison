// app.js
import express from 'express';
import sequelize from './db.js';
import Formulario from './routes/Formulario.js';
import cors from 'cors';


const app = express();
app.use(express.json());
app.use(cors());

// Ruta para guardar datos del formulario
app.post('/api/formulario', async (req, res) => {
    try {
        const formulario = await Formulario.create(req.body);
        res.status(201).json(formulario);
    } catch (error) {
        console.error('Error al crear formulario:', error);
        res.status(500).json({ error: 'Error al crear formulario' });
    }
});

// Ruta para modificar datos del formulario
app.put('/api/formulario/:id', async (req, res) => {
    try {
        const formulario = await Formulario.findByPk(req.params.id);
        if (formulario) {
            await formulario.update(req.body);
            res.json(formulario);
        } else {
            res.status(404).json({ error: 'Formulario no encontrado' });
        }
    } catch (error) {
        res.status(400).json({ error: 'No se pudo modificar el formulario' });
    }
});

// Ruta para consultar datos del formulario por ID
app.get('/api/formulario/:id', async (req, res) => {
    try {
        const formulario = await Formulario.findByPk(req.params.id);
        if (formulario) {
            res.json(formulario);
        } else {
            res.status(404).json({ error: 'Formulario no encontrado' });
        }
    } catch (error) {
        res.status(400).json({ error: 'No se pudo consultar el formulario' });
    }
});

// Ruta para consultar todos los datos del formulario
app.get('/api/formulario', async (req, res) => {
    try {
        const formularios = await Formulario.findAll(); // Obtiene todos los registros de la tabla Formulario
        res.json(formularios);
    } catch (error) {
        console.error('Error al consultar formularios:', error);
        res.status(500).json({ error: 'Error al consultar formularios' });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
