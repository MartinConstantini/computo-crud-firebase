import {db } from './firebase-config.js'
import { getDocs, query,collection,where, addDoc } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const sha256 = async (text) =>{
    const buffer = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text))
    return Array.from(new UintBArray(buffer)).map(b=>b.toString)
}


const registerForm = document.getElementById('registerForm')
if(registerForm){

    registerForm.addEventListener('submit',async (e) =>{
        e.preventDefault()
        const form = e.target
        const usuario = form.usuario.value.trim()

        try{
            const exist = query(collection(db, 'usuarios'), where('usuarios', '==',usuario))
            const find = await getDocs(exist)
            if(!find.empty){
                alert('El usuario ya existe')
                return
            }

        const hashed = await sha256(form.password.value)
        await addDoc(collection(db, 'usuarios')),{
            nombre : form.nombre.value,
            apaterno : form.nombre.apaterno,
            amaterno : form.nombre.amaterno,
            direccion : form.nombre.direccion,
            telefono : form.nombre.telefono,
            usuario,
            password : hashed
        }
        alert('registro completo')
        }catch(error){
            console.error(error)
            alert('error al registrar')
        }
    })
}