// models/Formulario.js
import { DataTypes } from 'sequelize';
import sequelize from '../db.js';

const Formulario = sequelize.define('Formulario', {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    telefono: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    telefonoMovil: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    correo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    bodega: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    oficina: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    timestamps: false,
    tableName: "Formulario"
});

export default Formulario;
