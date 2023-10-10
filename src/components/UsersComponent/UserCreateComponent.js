import React, { useState } from "react";
import { useForm } from "react-hook-form"
import { postUser } from "../../httprequest/httprequest";
import toast, { Toaster } from 'react-hot-toast';

const UserCreateComponent = () => {
  const [showModal, setShowModal] = useState(false);
  const { register, reset, handleSubmit } = useForm();
 
  
  const cbResponse = (response)=> {
    console.log("Response del cbREesponse" + JSON.stringify(response))
    if (response.code== "ER_DUP_ENTRY"){
        toast('ERROR: El correo electrónico ya se encuentra registrado.',
      {
        icon: '⛔',
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      }
      );
    }
    else if (response.affectedRows ==  1){
      toast('Usuario creado con éxito.',
      {
        icon: '👏',
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      }
      );
    }
    else{
      toast('Error al crear el Usuario.',
      {
        icon: '⛔',
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      }
      );
    }
    window.location.reload(true);
}

  const onSubmit = async (data) => {
    
    const success = await postUser(`http:/localhost:3500/users/register`, {...data}, cbResponse)
    if (success === 'AxiosError: Network Error'){
      toast.error("Error de red. No se pudo editar el Usuario")
    }
    setShowModal(false)
    //window.location.reload(true);
  }
  
  
  return (
    
    <div>
      <Toaster/>
     <button
        className="mb-10 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
        type="button"
        onClick={() => {
          setShowModal(true)}}
      >
        Crear Usuario 
      </button>
      {showModal ? (
        <>
          
          <div className="flex flex-col justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-1/3 my-6 mx-auto max-w-3xl">
              <div className="border-8 border-cyan-500 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
                <h2 className="text-x font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-align: center">
                  Crear Usuario
                </h2>
                </div>
                <div className="relative p-6 flex-auto">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 md:space-y-6">
                      <div>
                          <label htmlFor="username" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Nombre</label>
                          <input id="username" className="to-reset bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" {...register("username", { required: true, maxLength: 200 })} placeholder="Nombre de usuario" />
                      </div>
                      <div>
                          <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                          <input id="email" className="to-reset bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="email" {...register("email", { required: true, maxLength: 200 })} placeholder="Email"  />
                      </div>
                      <div>
                          <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                          <input id="password" className="to-reset bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p- dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="password" {...register("password", { required: true, maxLength: 15 })} placeholder="Teléfono" />
                      </div>
                      <div>
                          <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Teléfono</label>
                          <input id="phone" className="to-reset bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="phone" {...register("phone", { required: true, maxLength: 15 })} placeholder="Teléfono" />
                      </div>
                      <div>
                          <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Rol</label>
                          <select id="rol" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" {...register("rol", { required: true, maxLength: 50 })} placeholder="Rol" >
                              <option value="1">Administrador</option>
                              <option value="0">Usuario</option>
                          </select>
                      </div>
                      <button
                    className="text-white bg-blue-500 active:bg-blue-900 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                    type="submit"
                    
                    >
                      Guardar Usuario
                    </button>
                  </form>
                </div>
                  <button
                    className="flex text-white text-center w-20 bg-red-500 active:bg-yellow-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none m-auto mb-1"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                  Close
                  </button>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default UserCreateComponent;