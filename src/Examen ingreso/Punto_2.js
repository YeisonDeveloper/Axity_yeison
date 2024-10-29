
let caracteres = "qwertyuiopasdfghjklzxcvbnm0987654321QWERTYUIOPASDFGHJKLZXCVBNM";


const generarContrasena = (longitud) => {
    let contrasena = "";  
    for (let i = 0; i < longitud; i++) {

        let randomIndex = Math.floor(Math.random() * caracteres.length);
        contrasena += caracteres[randomIndex];
    }
    return contrasena;
}


let contrasenaAleatoria = generarContrasena(12);

console.log("Contraseña aleatoria:", contrasenaAleatoria);
