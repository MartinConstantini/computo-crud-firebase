import { db } from './firebase-config.js';
import { getDocs, query, collection, where, addDoc } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const sha256 = async (text) => {
  const buffer = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
  return Array.from(new Uint8Array(buffer))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
};

const registerForm = document.getElementById('registerForm');

if (registerForm) {
  registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const form = e.target;
    const usuario = form.usuario.value.trim();

    try {
      // Verificar si el usuario ya existe
      const existQuery = query(collection(db, 'usuarios'), where('usuario', '==', usuario));
      const found = await getDocs(existQuery);

      if (!found.empty) {
        alert('El usuario ya existe');
        return;
      }

      // Hashear contraseña
      const hashed = await sha256(form.password.value);

      // Guardar en Firestore
      await addDoc(collection(db, 'usuarios'), {
        nombre: form.nombre.value,
        apaterno: form.apaterno.value,
        amaterno: form.amaterno.value,
        direccion: form.direccion.value,
        telefono: form.telefono.value,
        usuario: usuario,
        password: hashed
      });

      alert('Registro completo');
      form.reset();
    } catch (error) {
      console.error(error);
      alert('Error al registrar');
    }
  });
}
