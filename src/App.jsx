
import { useEffect, useState } from "react";
import "./App.css";
import Conversor from "./Conversor";
import Registro from "./Registro";
import Usuarios from "./Usuarios";

function App() {
  const [usuario, setUsuario] = useState('');
  const [clave, setClave] = useState('');
  const [logueado, setLogueado] = useState(false);
  const [recargar, setRecargar] = useState(false);


  function cambiarUsuario(evento) {
    setUsuario(evento.target.value);
  }

  function cambiarClave(evento) {
    setClave(evento.target.value);
  }

  function recargarAhora(){
    setRecargar(!recargar)
  }

  async function ingresar() {
    const peticion = await fetch('https://loginexpress-production-2b86.up.railway.app/login?usuario=' + usuario + '&clave=' + clave, 
      { credentials: 'include' })
    if (peticion.ok) {
      setLogueado(true)    
    } else {
      alert('usuario o clave incorrectos')
    }
  }

 async function validar() {
    const peticion = await fetch('https://loginexpress-production-2b86.up.railway.app/validar', {credentials: 'include'})
    if (peticion.ok) {
      setLogueado(true)
     
    }
  }

  useEffect(() => {
    validar()    
  }, [])

  if (logueado) {
    return (
      <>
        <Registro recargarAhora={recargarAhora}/>
        <Conversor />
       <Usuarios recargar={recargar}/>
      
        </>)    

  }
  return (
    <>
      <h1>Inicio de sesión</h1>
      <input placeholder='Usuario' type="text" name="usuario" id="usuario" value={usuario} onChange={cambiarUsuario} />
      <input placeholder='Clave' type="password" name="clave" id="clave" value={clave} onChange={cambiarClave} />
      <button onClick={ingresar}>Ingresar</button>
    </>)
}

export default App;
