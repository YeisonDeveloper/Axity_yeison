let arrayPruebas= [
    {"cantidadVendida":2,"NombreProducto":"Té Dharamsala","Proveedor":"Exotic Liquids","Categoria":"Bebidas","PrecioUnidad":"18"},
    {"cantidadVendida":20,"NombreProducto":"Cerveza tibetana Barley","Proveedor":"Exotic Liquids","Categoria":"Bebidas","PrecioUnidad":"19"},
    {"cantidadVendida":12,"NombreProducto":"Sirope de regaliz","Proveedor":"Exotic Liquids","Categoria":"Condimentos","PrecioUnidad":"10"},
    {"cantidadVendida":21,"NombreProducto":"Especias Cajun del chef Anton","Proveedor":"New Orleans Cajun Delights","Categoria":"Condimentos","PrecioUnidad":"22"},
    {"cantidadVendida":2,"NombreProducto":"Mezcla Gumbo del chef Anton","Proveedor":"New Orleans Cajun Delights","Categoria":"Condimentos","PrecioUnidad":"21,35"},
    {"cantidadVendida":32,"NombreProducto":"Mermelada de grosellas de la abuela","Proveedor":"Grandma Kelly's Homestead","Categoria":"Condimentos","PrecioUnidad":"25"},
    {"cantidadVendida":4,"NombreProducto":"Peras secas orgánicas del tío Bob","Proveedor":"Grandma Kelly's Homestead","Categoria":"Frutas/Verduras","PrecioUnidad":"30"},
    {"cantidadVendida":32,"NombreProducto":"Salsa de arándanos Northwoods","Proveedor":"Grandma Kelly's Homestead","Categoria":"Condimentos","PrecioUnidad":"40"},
    {"cantidadVendida":5,"NombreProducto":"Buey Mishi Kobe","Proveedor":"Tokyo Traders","Categoria":"Carnes","PrecioUnidad":"97"},
    {"cantidadVendida":4,"NombreProducto":"Pez espada","Proveedor":"Tokyo Traders","Categoria":"Pescado/Marisco","PrecioUnidad":"31"},
    {"cantidadVendida":7,"NombreProducto":"Queso Cabrales","Proveedor":"Cooperativa de Quesos 'Las Cabras'","Categoria":"Lácteos","PrecioUnidad":"21"},
    {"cantidadVendida":65,"NombreProducto":"Queso Manchego La Pastora","Proveedor":"Cooperativa de Quesos 'Las Cabras'","Categoria":"Lácteos","PrecioUnidad":"38"},
    {"cantidadVendida":8,"NombreProducto":"Algas Konbu","Proveedor":"Mayumi's","Categoria":"Pescado/Marisco","PrecioUnidad":"6"},
    {"cantidadVendida":6,"NombreProducto":"Cuajada de judías","Proveedor":"Mayumi's","Categoria":"Frutas/Verduras","PrecioUnidad":"23,25"},
    {"cantidadVendida":7,"NombreProducto":"Salsa de soja baja en sodio","Proveedor":"Mayumi's","Categoria":"Condimentos","PrecioUnidad":"15,5"},
    {"cantidadVendida":0,"NombreProducto":"Postre de merengue Pavlova","Proveedor":"Pavlova, Ltd.","Categoria":"Repostería","PrecioUnidad":"17,45"},
    {"cantidadVendida":7,"NombreProducto":"Cordero Alice Springs","Proveedor":"Pavlova, Ltd.","Categoria":"Carnes","PrecioUnidad":"39"},
    {"cantidadVendida":9,"NombreProducto":"Langostinos tigre Carnarvon","Proveedor":"Pavlova, Ltd.","Categoria":"Pescado/Marisco","PrecioUnidad":"62,5"},
    {"cantidadVendida":8,"NombreProducto":"Pastas de té de chocolate","Proveedor":"Specialty Biscuits, Ltd.","Categoria":"Repostería","PrecioUnidad":"9,2"},
    {"cantidadVendida":6,"NombreProducto":"Mermelada de Sir Rodney's","Proveedor":"Specialty Biscuits, Ltd.","Categoria":"Repostería","PrecioUnidad":"81"}

];

// 3.	Del array “arrayPruebas” extraer el producto que más se vendió (no hay productos repetidos).

let productoMasVendido = arrayPruebas.reduce((max, producto) =>
    producto.cantidadVendida > max.cantidadVendida ? producto : max
);

console.log(`Producto más vendido: ${productoMasVendido.NombreProducto}`);


// 4.	Ordenar de mayor a menor los proveedores que más productos nos venden.

let ventasPorProveedor = arrayPruebas.reduce((acumulador, producto) => {
    acumulador[producto.Proveedor] = (acumulador[producto.Proveedor] || 0) + producto.cantidadVendida;
    return acumulador;
}, {});

let proveedoresOrdenados = Object.entries(ventasPorProveedor).sort((a, b) => b[1] - a[1]);

console.log(`Proveedores ordenados por productos vendidos:`);
proveedoresOrdenados.forEach(proveedor => console.log(proveedor[0] + " vendió " + proveedor[1] + " productos"));


// 5. Cual fue el producto que más ganancias nos generó (ganancias es cantidadVendida * PrecioUnidad).

let productoMasGanancias = arrayPruebas.reduce((max, producto) => {
    let precio = parseFloat(producto.PrecioUnidad.replace(",", "."));
    let ganancias = producto.cantidadVendida * precio;
    return ganancias > max.ganancias ? { producto: producto.NombreProducto, ganancias } : max;
}, { producto: "", ganancias: 0 });

console.log(`Producto que más ganancias generó: ${productoMasGanancias.producto}`);
console.log(`Ganancias: ${productoMasGanancias.ganancias}`);


// 6.	Cuáles fueron las ganancias por categoría.

let gananciasPorCategoria = arrayPruebas.reduce((acumulador, producto) => {
    let precio = parseFloat(producto.PrecioUnidad.replace(",", "."));
    let ganancias = producto.cantidadVendida * precio;
    acumulador[producto.Categoria] = (acumulador[producto.Categoria] || 0) + ganancias;
    return acumulador;
}, {});

console.log("Ganancias por categoría:");
Object.entries(gananciasPorCategoria).forEach(([categoria, ganancias]) => {
    console.log(`${categoria}: ${ganancias.toFixed(2)} unidades de ganancia`);
});
