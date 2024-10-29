import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('Formulario', 'axity', 'Ingre$o', {
    host: 'localhost',
    dialect: 'mssql', 
    dialectOptions: {
        options: { encrypt: true },
    },
});

const connectToDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log('Conexión establecida con éxito');
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error);
    }
};

connectToDatabase();

export default sequelize;

// NOTA!!!!!!!!!! CREAR LOGIN PARA LA CONEXIÓN DE LA BASE DE DATOS

// CREATE LOGIN axity WITH PASSWORD = 'Ingre$o';
// USE Formulario;
// CREATE USER axity FOR LOGIN axity;
// ALTER ROLE db_owner ADD MEMBER axity;
