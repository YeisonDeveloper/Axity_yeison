import React, { useState, useEffect } from 'react';
import axios from 'axios';
import medellin from '../assets/Bandera-Medellin.png';
import cali from '../assets/Bandera-Cali.png';
import ModalProductos from './Modal';
import Swal from "sweetalert2";

const Formulario = () => {
    const [nombre, setNombre] = useState('');
    const [telefono, setTelefono] = useState('');
    const [telefonoMovil, setTelefonoMovil] = useState('');
    const [correo, setCorreo] = useState('');
    const [bodega, setBodega] = useState('');
    const [oficina, setOficina] = useState('');
    const [errores, setErrores] = useState({});
    const [id, setId] = useState('');
    const [isEditMode, setIsEditMode] = useState(false);
    const [tablaData, setTablaData] = useState([]);
    const [imagenBodega, setImagenBodega] = useState('');

    const oficinasPorBodega = {
        Medellín: ['M3390', 'M1425'],
        Cali: ['C4490', 'C1222']
    };

    useEffect(() => {
        fetchTablaData();
    }, []);

    useEffect(() => {
        // Actualizar la imagen según la bodega seleccionada
        if (bodega === 'Medellín') {
            setImagenBodega(medellin);
        } else if (bodega === 'Cali') {
            setImagenBodega(cali);
        } else {
            setImagenBodega(''); // Limpiar imagen si no hay bodega seleccionada
        }
    }, [bodega]);

    const fetchTablaData = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/formulario');
            setTablaData(response.data);
        } catch (error) {
            console.error('Error al cargar los datos de la tabla:', error);
            alert('Hubo un problema al cargar los datos.');
        }
    };

    const validarFormulario = () => {
        let errores = {};

        if (!/^[a-zA-Z\s]+$/.test(nombre)) {
            errores.nombre = 'El nombre solo puede contener letras';
        }
        if (!/^\d{7}$/.test(telefono)) {
            errores.telefono = 'El teléfono debe tener exactamente 7 dígitos';
        }
        if (!/^3\d{9}$/.test(telefonoMovil)) {
            errores.telefonoMovil = 'El teléfono móvil debe empezar con 3 y tener exactamente 10 dígitos';
        }
        if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(correo)) {
            errores.correo = 'El correo no tiene un formato válido';
        }

        setErrores(errores);
        return Object.keys(errores).length === 0;
    };

    const handleInsert = async (e) => {
        e.preventDefault();

        if (validarFormulario()) {
            const result = await Swal.fire({
                title: isEditMode ? '¿Actualizar formulario?' : '¿Crear formulario?',
                text: isEditMode ? '¿Estás seguro de que deseas actualizar este formulario?' : '¿Estás seguro de que deseas crear este formulario?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Sí, proceder',
                cancelButtonText: 'Cancelar'
            });

            if (result.isConfirmed) {
                try {
                    let response;
                    if (isEditMode) {
                        response = await axios.put(`http://localhost:3000/api/formulario/${id}`, {
                            nombre,
                            telefono,
                            telefonoMovil,
                            correo,
                            bodega,
                            oficina,
                        });
                        Swal.fire('Actualizado', 'Formulario actualizado correctamente', 'success');
                    } else {
                        response = await axios.post('http://localhost:3000/api/formulario', {
                            nombre,
                            telefono,
                            telefonoMovil,
                            correo,
                            bodega,
                            oficina,
                        });
                        Swal.fire('Creado', 'Formulario enviado correctamente', 'success');
                    }

                    console.log(response.data);
                    resetFormulario();
                    fetchTablaData();
                } catch (error) {
                    console.error('Error al enviar el formulario:', error);
                    if (error.response) {
                        console.error('Error del servidor:', error.response.data);
                        Swal.fire('Error', `Hubo un problema al enviar el formulario: ${error.response.data.error}`, 'error');
                    } else {
                        Swal.fire('Error', 'Hubo un problema al enviar el formulario', 'error');
                    }
                }
            }
        }
    };

    const handleSearch = async (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            try {
                const response = await axios.get(`http://localhost:3000/api/formulario/${id}`);
                const data = response.data;
                setNombre(data.nombre);
                setTelefono(data.telefono);
                setTelefonoMovil(data.telefonoMovil);
                setCorreo(data.correo);
                setBodega(data.bodega);
                setOficina(data.oficina);
                setIsEditMode(true);
            } catch (error) {
                console.error('Error al buscar el formulario:', error);
                alert('Formulario no encontrado o hubo un error en la búsqueda.');
            }
        }
    };

    const resetFormulario = () => {
        setNombre('');
        setTelefono('');
        setTelefonoMovil('');
        setCorreo('');
        setBodega('');
        setOficina('');
        setErrores({});
        setId('');
        setIsEditMode(false);
    };

    return (
        <div className="min-h-screen flex flex-col justify-between bg-gradient-to-br from-gray-200 to-gray-100">
            {/* Encabezado */}
            <header className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 text-center shadow-lg">
                <h1 className="text-3xl font-semibold">Formulario de Registro</h1>
            </header>

            {/* Formulario y Tabla */}
            <main className="flex-grow container mx-auto p-6 flex gap-6">
                {/* Formulario */}
                <form className="bg-white p-8 rounded-lg shadow-lg transition-transform transform hover:scale-105 w-1/2">
                    {/* Input para ID de búsqueda */}
                    <div className="mb-6">
                        <label className="block text-gray-800 font-medium">Buscar por ID:</label>
                        <input
                            type="text"
                            value={id}
                            onChange={(e) => setId(e.target.value)}
                            onKeyDown={handleSearch}
                            className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                            placeholder="Ingresa el ID del formulario"
                        />
                    </div>

                    {/* Nombre */}
                    <div className="mb-6">
                        <label className="block text-gray-800 font-medium">Nombre:</label>
                        <input
                            type="text"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            className={`mt-1 block w-full p-3 border ${errores.nombre ? 'border-red-500' : 'border-gray-300'} rounded-lg transition duration-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200`}
                            placeholder="Ingresa tu nombre"
                        />
                        {errores.nombre && <p className="text-red-500 text-sm mt-1">{errores.nombre}</p>}
                    </div>

                    {/* Teléfono */}
                    <div className="mb-6">
                        <label className="block text-gray-800 font-medium">Teléfono:</label>
                        <input
                            type="text"
                            value={telefono}
                            onChange={(e) => setTelefono(e.target.value)}
                            className={`mt-1 block w-full p-3 border ${errores.telefono ? 'border-red-500' : 'border-gray-300'} rounded-lg transition duration-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200`}
                            placeholder="Ingresa tu teléfono fijo"
                        />
                        {errores.telefono && <p className="text-red-500 text-sm mt-1">{errores.telefono}</p>}
                    </div>

                    {/* Teléfono móvil */}
                    <div className="mb-6">
                        <label className="block text-gray-800 font-medium">Teléfono móvil:</label>
                        <input
                            type="text"
                            value={telefonoMovil}
                            onChange={(e) => setTelefonoMovil(e.target.value)}
                            className={`mt-1 block w-full p-3 border ${errores.telefonoMovil ? 'border-red-500' : 'border-gray-300'} rounded-lg transition duration-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200`}
                            placeholder="Ingresa tu teléfono móvil"
                        />
                        {errores.telefonoMovil && <p className="text-red-500 text-sm mt-1">{errores.telefonoMovil}</p>}
                    </div>

                    {/* Correo */}
                    <div className="mb-6">
                        <label className="block text-gray-800 font-medium">Correo:</label>
                        <input
                            type="text"
                            value={correo}
                            onChange={(e) => setCorreo(e.target.value)}
                            className={`mt-1 block w-full p-3 border ${errores.correo ? 'border-red-500' : 'border-gray-300'} rounded-lg transition duration-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200`}
                            placeholder="Ingresa tu correo"
                        />
                        {errores.correo && <p className="text-red-500 text-sm mt-1">{errores.correo}</p>}
                    </div>

                    {/* Bodega */}
                    <div className="mb-6">
                        <label className="block text-gray-800 font-medium">Bodega:</label>
                        <select
                            value={bodega}
                            onChange={(e) => {
                                setBodega(e.target.value);
                                setOficina('');
                            }}
                            className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                        >
                            <option value="">Selecciona una bodega</option>
                            <option value="Medellín">Medellín</option>
                            <option value="Cali">Cali</option>
                        </select>
                    </div>

                    {/* Oficina */}
                    {bodega && (
                        <div className="mb-6">
                            <label className="block text-gray-800 font-medium">Oficina:</label>
                            <select
                                value={oficina}
                                onChange={(e) => setOficina(e.target.value)}
                                className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                            >
                                <option value="">Selecciona una oficina</option>
                                {oficinasPorBodega[bodega].map((oficina) => (
                                    <option key={oficina} value={oficina}>{oficina}</option>
                                ))}
                            </select>
                        </div>
                    )}

                    {/* Imagen de la bodega */}
                    {imagenBodega && (
                        <div className="mb-6">
                            <img src={imagenBodega} alt={`Bodega ${bodega}`} className="w-[300px] h-auto mt-4" />
                        </div>
                    )}
                    {/* Botones de Envío y Limpiar */}
                    <div className="flex gap-3">
                        <button
                            type="submit"
                            onClick={handleInsert}
                            className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
                        >
                            {isEditMode ? 'Actualizar' : 'Crear'}
                        </button>
                        <button
                            type="button"
                            onClick={resetFormulario}
                            className="bg-red-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-700 transition duration-300"
                        >
                            Limpiar y Restablecer
                        </button>
                        <ModalProductos />
                    </div>
                </form>

                {/* Tabla de datos */}
                <div className="w-1/2 bg-white p-2 rounded-lg shadow-lg">
                    <h2 className="text-xl font-semibold mb-4">Datos Registrados</h2>
                    <table className="min-w-full bg-white">
                        <thead>
                            <tr>
                                <th className="py-2 px-4 border-b">Nombre</th>
                                <th className="py-2 px-4 border-b">Teléfono</th>
                                <th className="py-2 px-4 border-b">Teléfono Móvil</th>
                                <th className="py-2 px-4 border-b">Correo</th>
                                <th className="py-2 px-4 border-b">Bodega</th>
                                <th className="py-2 px-4 border-b">Oficina</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tablaData.map((item) => (
                                <tr key={item.id}>
                                    <td className="py-2 px-4 border-b">{item.nombre}</td>
                                    <td className="py-2 px-4 border-b">{item.telefono}</td>
                                    <td className="py-2 px-4 border-b">{item.telefonoMovil}</td>
                                    <td className="py-2 px-4 border-b">{item.correo}</td>
                                    <td className="py-2 px-4 border-b">{item.bodega}</td>
                                    <td className="py-2 px-4 border-b">{item.oficina}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>

            {/* Pie de página */}
            <footer className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-center p-4">
                <p>&copy; 2024 Yeison. Todos los derechos reservados.</p>
            </footer>
        </div>
    );
};

export default Formulario;
