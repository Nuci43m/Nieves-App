import { deleteDoc, doc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";
import { db } from "./firebase.js";

const Series = document.querySelector('.Series');
const FormularioActualizarSerie = document.querySelector('#Formulario-ActualizarSerie');

const obtenerSerie = (id) => getDoc(doc(db, 'Series', id));

let id = '';

// Nueva función para actualizar serie
const actualizarSerie = async (id, nuevosValores) => {
    try {
        await updateDoc(doc(db, 'Series', id), nuevosValores);
        alert('Serie actualizada correctamente');
    } catch (error) {
        alert('Error al actualizar la serie', 'error');
    }
};

export const MostrarListaSeries = (Datos) => {
    if (Datos.length) {
        let html = '';
        Datos.forEach(documento => {
            const Serie = documento.data();
            const idDocumento = documento.id; // Obtén el identificador del documento
            const li = `
                <li class="custom-list-group-item custom-list-group-item-action">
                    <h5> Nombre de la serie: ${Serie.Nombre} </h5>
                    <p> Tipo: ${Serie.Tipo} </p>
                    <p> Duración: ${Serie.Duracion} </p>
                    <p> Año de lanzamiento: ${Serie.AnoLanzamiento} </p>
                    <p> Plataforma: ${Serie.Plataforma} </p>
                    <button class="btn btn-warning w-100 mb-2 botoneSinSesion Eliminar-Serie" data-id="${idDocumento}"> Eliminar </button>
                    <button class="btn btn-success w-100 mb-2 botoneSinSesion Actualizar-Serie" data-id="${idDocumento}" data-bs-toggle="modal" data-bs-target="#ActualizarSerie"> Actualizar </button>
                </li>
            `;
            html += li;
        });
        Series.innerHTML = html;

        const BotonesEliminar = Series.querySelectorAll('.Eliminar-Serie');

        // ELIMINAR SERIES
        BotonesEliminar.forEach(BotonEliminarIndividual => {
            BotonEliminarIndividual.addEventListener('click', async (event) => {
                const Documento = event.target.dataset.id;
                try {
                    await deleteDoc(doc(db, 'Series', Documento));
                    // Puedes agregar aquí algún código adicional después de eliminar el documento, si es necesario
                } catch (error) {
                    alert('Error al eliminar la serie:', 'error');
                }
            });
        });

        const BotonesActualizar = Series.querySelectorAll('.Actualizar-Serie');

        BotonesActualizar.forEach(BotonActualizarIndividual => {
            BotonActualizarIndividual.addEventListener('click', async (e) => {
                const identificadorDocumento = await obtenerSerie(e.target.dataset.id);

                // Accede a los datos del documento utilizando el método data()
                const DATOSDOCUMENTO = identificadorDocumento.data();

                // Ahora puedes acceder a las propiedades del documento
                const NOMBRE = FormularioActualizarSerie['Actualizar-Nombre'];
                const TIPO = FormularioActualizarSerie['Actualizar-Tipo'];
                const DURACION = FormularioActualizarSerie['Actualizar-Duracion'];
                const ANO_LANZAMIENTO = FormularioActualizarSerie['Actualizar-AnoLanzamiento'];
                const PLATAFORMA = FormularioActualizarSerie['Actualizar-Plataforma'];

                NOMBRE.value = DATOSDOCUMENTO.Nombre;
                TIPO.value = DATOSDOCUMENTO.Tipo;
                DURACION.value = DATOSDOCUMENTO.Duracion;
                ANO_LANZAMIENTO.value = DATOSDOCUMENTO.AnoLanzamiento;
                PLATAFORMA.value = DATOSDOCUMENTO.Plataforma;

                id = identificadorDocumento.id;
            });
        });

        // Evento para actualizar la serie al enviar el formulario
        FormularioActualizarSerie.addEventListener('submit', async (e) => {
            e.preventDefault();
            try {
                // Validar campos aquí si es necesario
                const NOMBRE = FormularioActualizarSerie['Actualizar-Nombre'].value;
                const TIPO = FormularioActualizarSerie['Actualizar-Tipo'].value;
                const DURACION = FormularioActualizarSerie['Actualizar-Duracion'].value;
                const ANO_LANZAMIENTO = FormularioActualizarSerie['Actualizar-AnoLanzamiento'].value;
                const PLATAFORMA = FormularioActualizarSerie['Actualizar-Plataforma'].value;

                await actualizarSerie(id, {
                    Nombre: NOMBRE,
                    Tipo: TIPO,
                    Duracion: DURACION,
                    AnoLanzamiento: ANO_LANZAMIENTO,
                    Plataforma: PLATAFORMA,
                });

                // Cerrar el modal (si es un modal)
                const actualizarModal = document.querySelector('#ActualizarSerie');
                const modal = bootstrap.Modal.getInstance(actualizarModal);
                modal.hide();
            } catch (error) {
                alert(error.message, 'error');
            }
        });

    } else if (Datos.length === 0) {
        Series.innerHTML = `
            <h1>
                Para visualizar el contenido es necesario que inicies sesión
                <br><br>
                Si no tienes una cuenta, regístrate para continuar
            </h1>
        `;
    }
};
