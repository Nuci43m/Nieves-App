import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";
import { db } from "./firebase.js";

window.addEventListener('DOMContentLoaded', () => {
    const formularioSerie = document.querySelector('#Formulario-Serie'); // Actualiza el ID

    formularioSerie.addEventListener('submit', async (e) => {
        e.preventDefault();

        const NOMBRE = formularioSerie['Nombre-Serie'].value; // Actualiza los nombres de los campos
        const TIPO = formularioSerie['Tipo-Serie'].value;
        const DURACION = formularioSerie['Duracion-Serie'].value;
        const ANO_LANZAMIENTO = formularioSerie['AnoLanzamiento-Serie'].value;
        const PLATAFORMA = formularioSerie['Plataforma-Serie'].value;

        try {
            // Utiliza addDoc para agregar un documento con un identificador generado automáticamente
            const nuevaSerieRef = await addDoc(collection(db, 'Series'), { // Cambia a la colección "Series"
                Nombre: NOMBRE,
                Tipo: TIPO,
                Duracion: DURACION,
                AnoLanzamiento: ANO_LANZAMIENTO,
                Plataforma: PLATAFORMA,
            });

            // Muestra un mensaje si todo sale bien
            alert(`La serie ${NOMBRE} ha sido registrada exitosamente`); // Actualiza el mensaje

            // Limpia el formulario
            formularioSerie.reset();
        } catch (error) {
            // Maneja el error y muestra un mensaje con el error
            alert('Error al registrar la serie:', 'noValido'); // Actualiza el mensaje
        }
    });
});
