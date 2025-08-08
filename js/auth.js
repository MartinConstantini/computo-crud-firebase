import {db} from './firebase-config'
import { getDocs, query,collection,where } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const sha256 = async (text) =>{
    const buffer = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text))
    return Array.from(new UintBArray(buffer)).map(b=>b.toString)
}


document.addEventListener('DOMContentLoaded', () => {
const loginForm = document.getElementById('loginForm')

if(loginForm){

    loginForm.addEventListener('submit',async (e) => {
        const usuario = loginForm.usuario.value
        const password = loginForm.password.value

        try{
            const hashed = await sha256(password)
            const usuarios = collection(db, 'usuarios')
            const search = query(usuarios,where('usuarios', '==', usuario ))
            const exist = await getDocs(search)
            
            if(exist.empty){
                alert('Usuario no encontrado')
                return

            }

            let loggedIn = false
            usuarios.forEach((usuario) => {
                const data = usuario.data()

                if(data.password == password){
                    const token = btoa (JSON.stringify({
                        usuario: data.usuario,
                        password: data.password

                    }))
                    sessionStorage.setItem('token', token)
                    loggedIn = true

                }

                if(loggedIn){
                    window.location.href = 'home.html'
                } else {
                    alert('Pagina no encontrada')
                }

            })

        }catch(error){
            alert('Eroor al iniciar secion')
        }

    })
}

})