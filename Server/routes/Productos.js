import express from 'express';

const router = express.Router();

let arrayPruebas = [
    { "cantidadVendida": 2, "NombreProducto": "Té Dharamsala", "Proveedor": "Exotic Liquids", "Categoria": "Bebidas", "PrecioUnidad": "18" },
    { "cantidadVendida": 20, "NombreProducto": "Cerveza tibetana Barley", "Proveedor": "Exotic Liquids", "Categoria": "Bebidas", "PrecioUnidad": "19" },
    { "cantidadVendida": 12, "NombreProducto": "Sirope de regaliz", "Proveedor": "Exotic Liquids", "Categoria": "Condimentos", "PrecioUnidad": "10" },
    { "cantidadVendida": 21, "NombreProducto": "Especias Cajun del chef Anton", "Proveedor": "New Orleans Cajun Delights", "Categoria": "Condimentos", "PrecioUnidad": "22" },
    { "cantidadVendida": 2, "NombreProducto": "Mezcla Gumbo del chef Anton", "Proveedor": "New Orleans Cajun Delights", "Categoria": "Condimentos", "PrecioUnidad": "21,35" },
    { "cantidadVendida": 32, "NombreProducto": "Mermelada de grosellas de la abuela", "Proveedor": "Grandma Kelly's Homestead", "Categoria": "Condimentos", "PrecioUnidad": "25" },
    { "cantidadVendida": 4, "NombreProducto": "Peras secas orgánicas del tío Bob", "Proveedor": "Grandma Kelly's Homestead", "Categoria": "Frutas/Verduras", "PrecioUnidad": "30" },
    { "cantidadVendida": 32, "NombreProducto": "Salsa de arándanos Northwoods", "Proveedor": "Grandma Kelly's Homestead", "Categoria": "Condimentos", "PrecioUnidad": "40" },
    { "cantidadVendida": 5, "NombreProducto": "Buey Mishi Kobe", "Proveedor": "Tokyo Traders", "Categoria": "Carnes", "PrecioUnidad": "97" },
    { "cantidadVendida": 4, "NombreProducto": "Pez espada", "Proveedor": "Tokyo Traders", "Categoria": "Pescado/Marisco", "PrecioUnidad": "31" },
    { "cantidadVendida": 7, "NombreProducto": "Queso Cabrales", "Proveedor": "Cooperativa de Quesos 'Las Cabras'", "Categoria": "Lácteos", "PrecioUnidad": "21" },
    { "cantidadVendida": 65, "NombreProducto": "Queso Manchego La Pastora", "Proveedor": "Cooperativa de Quesos 'Las Cabras'", "Categoria": "Lácteos", "PrecioUnidad": "38" },
    { "cantidadVendida": 8, "NombreProducto": "Algas Konbu", "Proveedor": "Mayumi's", "Categoria": "Pescado/Marisco", "PrecioUnidad": "6" },
    { "cantidadVendida": 6, "NombreProducto": "Cuajada de judías", "Proveedor": "Mayumi's", "Categoria": "Frutas/Verduras", "PrecioUnidad": "23,25" },
    { "cantidadVendida": 7, "NombreProducto": "Salsa de soja baja en sodio", "Proveedor": "Mayumi's", "Categoria": "Condimentos", "PrecioUnidad": "15,5" },
    { "cantidadVendida": 0, "NombreProducto": "Postre de merengue Pavlova", "Proveedor": "Pavlova, Ltd.", "Categoria": "Repostería", "PrecioUnidad": "17,45" },
    { "cantidadVendida": 7, "NombreProducto": "Cordero Alice Springs", "Proveedor": "Pavlova, Ltd.", "Categoria": "Carnes", "PrecioUnidad": "39" },
    { "cantidadVendida": 9, "NombreProducto": "Langostinos tigre Carnarvon", "Proveedor": "Pavlova, Ltd.", "Categoria": "Pescado/Marisco", "PrecioUnidad": "62,5" },
    { "cantidadVendida": 8, "NombreProducto": "Pastas de té de chocolate", "Proveedor": "Specialty Biscuits, Ltd.", "Categoria": "Repostería", "PrecioUnidad": "9,2" },
    { "cantidadVendida": 6, "NombreProducto": "Mermelada de Sir Rodney's", "Proveedor": "Specialty Biscuits, Ltd.", "Categoria": "Repostería", "PrecioUnidad": "81" }

];

// Ruta para obtener el producto más vendido
router.get('/mas-vendido', (req, res) => {
    const productoMasVendido = arrayPruebas.reduce((prev, current) => {
        return (prev.cantidadVendida > current.cantidadVendida) ? prev : current;
    });
    res.json(productoMasVendido);
});

// Ruta para obtener proveedores ordenados
router.get('/proveedores-ordenados', (req, res) => {
    const proveedores = arrayPruebas.reduce((acc, producto) => {
        acc[producto.Proveedor] = (acc[producto.Proveedor] || 0) + producto.cantidadVendida;
        return acc;
    }, {});

    const proveedoresOrdenados = Object.entries(proveedores)
        .sort((a, b) => b[1] - a[1])
        .map(([proveedor, cantidad]) => ({ proveedor, cantidad }));

    res.json(proveedoresOrdenados);
});

// Ruta para obtener el producto que más ganancias generó
router.get('/ganancias', (req, res) => {
    const productoConMasGanancias = arrayPruebas.reduce((prev, current) => {
        const gananciasPrev = prev.cantidadVendida * prev.PrecioUnidad.replace(',', '.');
        const gananciasCurrent = current.cantidadVendida * current.PrecioUnidad.replace(',', '.');
        return (gananciasPrev > gananciasCurrent) ? prev : current;
    });
    res.json(productoConMasGanancias);
});

// Ruta para obtener ganancias por categoría
router.get('/ganancias-categoria', (req, res) => {
    const gananciasPorCategoria = arrayPruebas.reduce((acc, producto) => {
        const ganancias = producto.cantidadVendida * producto.PrecioUnidad.replace(',', '.');
        acc[producto.Categoria] = (acc[producto.Categoria] || 0) + ganancias;
        return acc;
    }, {});

    res.json(gananciasPorCategoria);
});

export default router;
