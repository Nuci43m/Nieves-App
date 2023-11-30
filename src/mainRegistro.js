import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";
import { getDocs, collection } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";
import { MostrarListaNieves } from "./app/CRUDNieves.js";
import { revisaSesion } from "./app/revisaSesion.js";
import { auth, db } from "./app/firebase.js";
import './app/iniciaSesionEmailAndPass.js'
import './app/iniciaSesionFacebook.js'
import './app/iniciaSesionGoogle.js'
import './app/formularioRegistro.js'
import './app/subirNieve.js'
import './app/cierreSesion.js'

onAuthStateChanged(auth, async (usuario) => {
    if (usuario) {
        const currentPath = window.location.pathname;

        if (currentPath === '/src/index.html') {
            // Si el usuario está en el index, muestra la lista de manualidades
            const querySnapshot = await getDocs(collection(db, 'Nieves'))
            MostrarListaNieves(querySnapshot.docs);
        } else if (currentPath === '/src/Subir Series.html') {
            // Si el usuario está en la interfaz "Subir Manualidades.html", no muestra nada
            MostrarListaNieves([]);  // Puedes ajustar esto según tu lógica
        }
    } else {
        MostrarListaNieves([]);  // Puedes ajustar esto según tu lógica
    }
    revisaSesion(usuario);
});
