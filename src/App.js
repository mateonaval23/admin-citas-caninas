import { Fragment, useState, useEffect } from "react";
import Formulario from "./components/Formulario";
import Cita from "./components/Cita";

function App() {


  //Obtencion de citas si existen en el local storage
  let citasInicialesState = JSON.parse(localStorage.getItem('citas'))
  if(!citasInicialesState) {
    citasInicialesState = []
  }
  // State para el listado de citas creadas
  const [ citas , guardarCitas ] = useState(citasInicialesState)

  // Vamos a ver otro hook que nos permite ejecutar funcionalidades cuando un state cambia

  useEffect(() => {

        // Se obtienen las citas si existen iniciales y se transforman de cadena a un arreglo de objeto cita
        let citasIniciales = JSON.parse(localStorage.getItem('citas'))
    
        if(citasIniciales){
          localStorage.setItem('citas', JSON.stringify(citas))
        }else{
          localStorage.setItem('citas', JSON.stringify([]))
        }
        
        
  }, [citas])



  // Funcion que vamos a pasar a formulario para agregar una cita al array o listado
  const crearCita =  cita => {
    guardarCitas([...citas, cita])
  } 


  // 
  const eliminarCita = id => {
    const nuevasCitas = citas.filter(cita => cita.id !== id)
    guardarCitas(nuevasCitas)
  }


  // Mensaje condicional para el titulo de citas
  const titulo = citas.length === 0 ? 'No hay Citas' : 'Administra tus citas'

  return (
    <Fragment>
      <h1>Administrador de Pacientes</h1>

      <div className="container">
        <div className="row">
          <div className="one-half column">
            <Formulario
              crearCita={crearCita}
            />
          </div>
          <div className="one-half column">
            <h2>{titulo}</h2>
            {citas.map(cita => (
              <Cita
                key={cita.id}
                cita={cita}
                eliminarCita={eliminarCita}
              />
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
