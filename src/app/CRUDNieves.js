import { deleteDoc, doc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";
import { db } from "./firebase.js";

const Nieves = document.querySelector('.Nieves');
const FormularioActualizarNieve = document.querySelector('#Formulario-ActualizarNieve');

const obtenerNieve = (id) => getDoc(doc(db, 'Nieves', id));

let id = '';

// Nueva función para actualizar nieve
const actualizarNieve = async (id, nuevosValores) => {
    try {
        await updateDoc(doc(db, 'Nieves', id), nuevosValores);
        alert('Nieve actualizada correctamente');
    } catch (error) {
        alert('Error al actualizar la nieve', 'error');
    }
};

export const MostrarListaNieves = (Datos) => {
    if (Datos.length) {
        let html = '';
        Datos.forEach(documento => {
            const Nieve = documento.data();
            const idDocumento = documento.id; // Obtén el identificador del documento
            const li = `
                <li class="custom-list-group-item custom-list-group-item-action">
                    <h5> Nombre de la nieve: ${Nieve.Nombre} </h5>
                    <p> Tipo: ${Nieve.Tipo} </p>
                    <p> Litros por Envase: ${Nieve.LitrosPorEnvase} </p>
                    <p> Fecha de Caducidad: ${Nieve.FechaCaducidad} </p>
                    <p> Marca: ${Nieve.Marca} </p>
                    <button class="btn btn-warning w-100 mb-2 botoneSinSesion Eliminar-Nieve" data-id="${idDocumento}"> Eliminar </button>
                    <button class="btn btn-success w-100 mb-2 botoneSinSesion Actualizar-Nieve" data-id="${idDocumento}" data-bs-toggle="modal" data-bs-target="#ActualizarNieve"> Actualizar </button>
                </li>
            `;
            html += li;
        });
        Nieves.innerHTML = html;

        const BotonesEliminar = Nieves.querySelectorAll('.Eliminar-Nieve');

        // ELIMINAR NIEVES
        BotonesEliminar.forEach(BotonEliminarIndividual => {
            BotonEliminarIndividual.addEventListener('click', async (event) => {
                const Documento = event.target.dataset.id;
                try {
                    await deleteDoc(doc(db, 'Nieves', Documento));
                    // Puedes agregar aquí algún código adicional después de eliminar el documento, si es necesario
                } catch (error) {
                    alert('Error al eliminar la nieve:', 'error');
                }
            });
        });

        const BotonesActualizar = Nieves.querySelectorAll('.Actualizar-Nieve');

        BotonesActualizar.forEach(BotonActualizarIndividual => {
            BotonActualizarIndividual.addEventListener('click', async (e) => {
                const identificadorDocumento = await obtenerNieve(e.target.dataset.id);

                // Accede a los datos del documento utilizando el método data()
                const DATOSDOCUMENTO = identificadorDocumento.data();

                // Ahora puedes acceder a las propiedades del documento
                const NOMBRE = FormularioActualizarNieve['Actualizar-Nombre'];
                const TIPO = FormularioActualizarNieve['Actualizar-Tipo'];
                const LITROS_POR_ENVASE = FormularioActualizarNieve['Actualizar-LitrosPorEnvase'];
                const FECHA_CADUCIDAD = FormularioActualizarNieve['Actualizar-FechaCaducidad'];
                const MARCA = FormularioActualizarNieve['Actualizar-Marca'];

                NOMBRE.value = DATOSDOCUMENTO.Nombre;
                TIPO.value = DATOSDOCUMENTO.Tipo;
                LITROS_POR_ENVASE.value = DATOSDOCUMENTO.LitrosPorEnvase;
                FECHA_CADUCIDAD.value = DATOSDOCUMENTO.FechaCaducidad;
                MARCA.value = DATOSDOCUMENTO.Marca;

                id = identificadorDocumento.id;
            });
        });

        // Evento para actualizar la nieve al enviar el formulario
        FormularioActualizarNieve.addEventListener('submit', async (e) => {
            e.preventDefault();
            try {
                // Validar campos aquí si es necesario
                const NOMBRE = FormularioActualizarNieve['Actualizar-Nombre'].value;
                const TIPO = FormularioActualizarNieve['Actualizar-Tipo'].value;
                const LITROS_POR_ENVASE = FormularioActualizarNieve['Actualizar-LitrosPorEnvase'].value;
                const FECHA_CADUCIDAD = FormularioActualizarNieve['Actualizar-FechaCaducidad'].value;
                const MARCA = FormularioActualizarNieve['Actualizar-Marca'].value;

                await actualizarNieve(id, {
                    Nombre: NOMBRE,
                    Tipo: TIPO,
                    LitrosPorEnvase: LITROS_POR_ENVASE,
                    FechaCaducidad: FECHA_CADUCIDAD,
                    Marca: MARCA,
                });

                // Cerrar el modal (si es un modal)
                const actualizarModal = document.querySelector('#ActualizarNieve');
                const modal = bootstrap.Modal.getInstance(actualizarModal);
                modal.hide();
            } catch (error) {
                alert(error.message, 'error');
            }
        });

    } else if (Datos.length === 0) {
        Nieves.innerHTML = `
            <h1>
                Para visualizar el contenido es necesario que inicies sesión
                <br><br>
                Si no tienes una cuenta, regístrate para continuar
            </h1>
        `;
    }
};
