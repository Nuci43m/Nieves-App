import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";
import { db } from "./firebase.js";

window.addEventListener('DOMContentLoaded', () => {
    const formularioNieve = document.querySelector('#Formulario-Nieve'); // Actualiza el ID

    formularioNieve.addEventListener('submit', async (e) => {
        e.preventDefault();

        const NOMBRE = formularioNieve['Nombre-Nieve'].value; // Actualiza los nombres de los campos
        const TIPO = formularioNieve['Tipo-Nieve'].value;
        const LITROS_POR_ENVASE = formularioNieve['LitrosPorEnvase-Nieve'].value;
        const FECHA_CADUCIDAD = formularioNieve['FechaCaducidad-Nieve'].value;
        const MARCA = formularioNieve['Marca-Nieve'].value;

        try {
            // Utiliza addDoc para agregar un documento con un identificador generado automáticamente
            const nuevaNieveRef = await addDoc(collection(db, 'Nieves'), { // Cambia a la colección "Nieves"
                Nombre: NOMBRE,
                Tipo: TIPO,
                LitrosPorEnvase: LITROS_POR_ENVASE,
                FechaCaducidad: FECHA_CADUCIDAD,
                Marca: MARCA,
            });

            // Muestra un mensaje si todo sale bien
            alert(`La nieve ${NOMBRE} ha sido registrada exitosamente`); // Actualiza el mensaje

            // Limpia el formulario
            formularioNieve.reset();
        } catch (error) {
            // Maneja el error y muestra un mensaje con el error
            alert('Error al registrar la nieve:', 'noValido'); // Actualiza el mensaje
        }
    });
});
