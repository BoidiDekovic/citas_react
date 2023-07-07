import { useState, useEffect} from "react";
import Error from "./Error";

const Formulario = ({pacientes ,setPacientes, paciente, setPaciente}) => {

const [nombre, setNombre] = useState("");
const [propietario, setPropietario] = useState("");
const [email, setEmail] = useState("");
const [fecha, setFecha] = useState("");
const [sintomas, setSintomas] = useState("");
const [error, setError] = useState(false); 

useEffect(()=>{
    if(Object.keys(paciente).length > 0){
      setNombre(paciente.nombre)
      setPropietario(paciente.propietario)
      setEmail(paciente.email)
      setFecha(paciente.fecha)
      setSintomas(paciente.sintomas)
    }
    // comprueba que el objeto tenga algo..
}, [paciente])



const handleSubmit = (e) => {
    
    e.preventDefault();

    //validacion formulario
    if([nombre, propietario, email, fecha, sintomas].includes("")){
          console.log("Hay al menos un campo vacio")
          setError(true)
          return;
      }
      setError(false)
 
      const generarId = ()=>{
        const random = Math.random().toString(36).substr(2);
        const fecha = Date.now().toString(36);
        return fecha + random
      }

      // Objeto de Pacientes

      const objetoPaciente ={
        nombre, propietario, email, fecha,sintomas
      }

      if(paciente.id){
          // Editando registro
          objetoPaciente.id = paciente.id 
          const pacientesActualizados = pacientes.map( pacienteState => pacienteState.id === 
          paciente.id ? objetoPaciente : pacienteState)


          setPacientes(pacientesActualizados)
          setPaciente({})
      }else{
          // Nuevo registro
          objetoPaciente.id = generarId();
          setPacientes([... pacientes, objetoPaciente]);
      }
      // Reiniciar formulario

      setNombre("")
      setPropietario("")
      setEmail("")
      setFecha("")
      setSintomas("")


    }

  return (
    <div className = "md:w-1/2 lg:w-2/5 mx-5">
        <h2 className = "font-black text-3xl text-center">   Seguimiento 
        Pacientes</h2>
          
        <p className = "text-lg mt-5 text-center mb-10">
          Agregar Pacientes y {" "}
          <span className="text-green-700 font-bold ">Administralos</span>
          
         </p>

        <form 
          onSubmit={handleSubmit}
          className=" bg-sky-100 shadow-md rounded-lg py-10 px-5 mb-10" >

             { error && <Error> <p>Todos los campos son obligatorios </p></Error>}
            <div className="mb-5">
                <label htmlFor="mascota" className="block text-gray-700 uppercase font-bold"> 
                  Nombre Mascota
                </label>
                <input 
                    id="mascota"
                    type="text"
                    placeholder="Nombre de la mascota"
                    className="border-2 w-full p-2 mt-2 placeholder-lime-500 rounded-md"
                    value={nombre}
                    onChange={(e)=> setNombre(e.target.value)}
                />
            </div>

            <div className="mb-5">
                <label htmlFor="dueño" className="block text-gray-700 uppercase font-bold"> 
                Nombre Dueño
                </label>
                
                <input 
                    id="dueño"
                    type="text"
                    placeholder="Nombre del dueño"
                    className="border-2 w-full p-2 mt-2 placeholder-lime-500 rounded-md"
                    value={propietario}
                    onChange={(e)=> setPropietario(e.target.value)}
                />
            </div>

            
            <div className="mb-5">
                <label htmlFor="email" className="block text-gray-700 uppercase font-bold"> 
               Email
                </label>
                
                <input 
                    id="email"
                    type="email"
                    placeholder="email contacto del dueño"
                    className="border-2 w-full p-2 mt-2 placeholder-lime-500 rounded-md"
                    value={email}
                    onChange={(e)=> setEmail(e.target.value)}
                />
            </div>
            <div className="mb-5">
                <label htmlFor="alta" className="block text-gray-700 uppercase font-bold"> 
               Alta
                </label>
                
                <input 
                    id="alta"
                    type="date"
                    className="border-2 w-full p-2 mt-2 placeholder-lime-500 rounded-md"
                    value={fecha}
                    onChange={(e)=> setFecha(e.target.value)}
                />
            </div>

            <div className="mb-5">
                <label htmlFor="sintomas" className="block text-gray-700 uppercase font-bold"> 
               sintomas
                </label>
              
                <textarea id = "sintomas"
                          className="border-2 w-full p-2 mt-2 placeholder-lime-500"
                          placeholder="Describi los sintomas"
                          value={sintomas}
                          onChange={(e)=> setSintomas(e.target.value)}
                ></textarea>
              </div>

            <input
              
                type="submit"
                className="bg-lime-800 w-full p-3 text-white uppercase font-bold hover:bg-lime-400 cursor-pointer transition-all "
                value={paciente.id ? "Editar Paciente" : "Agregar Paciente"}
            
            />

        </form>

    </div>
  )

}

export default Formulario 
