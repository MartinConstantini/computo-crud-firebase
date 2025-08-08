import { db } from './firebase-config.js';
import { getDocs, query, collection, where, limit } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

// Función para hashear con SHA-256
const sha256 = async (text) => {
    const buffer = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
    return Array.from(new Uint8Array(buffer))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');
};

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');

    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const usuario = loginForm.usuario.value.trim();
            const password = loginForm.password.value.trim();

            try {
                const hashed = await sha256(password);

                // Buscar solo 1 usuario
                const usuariosRef = collection(db, 'usuarios');
                const search = query(usuariosRef, where('usuario', '==', usuario), limit(1));
                const snapshot = await getDocs(search);

                if (snapshot.empty) {
                    alert('Usuario no encontrado');
                    return;
                }

                const docSnap = snapshot.docs[0];
                const data = docSnap.data();

                if (data.password === hashed) {
                    const token = btoa(JSON.stringify({
                        usuario: data.usuario,
                        uid: docSnap.id,
                        exp: Date.now() + (60 * 60 * 1000) // Expira en 1 hora
                    }));

                    sessionStorage.setItem('token', token);
                    window.location.href = 'home.html';
                } else {
                    alert('Contraseña incorrecta');
                }
            } catch (error) {
                console.error(error);
                alert('Error al iniciar sesión');
            }
        });
    }
});
