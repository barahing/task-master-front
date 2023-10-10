import React, { useState } from "react";
import { useForm } from "react-hook-form"
import { put } from "../../httprequest/httprequest";
import toast, { Toaster } from 'react-hot-toast';

const ModalUserEditComponent = (setData) => {
  const [showModal, setShowModal] = useState(false);
  const { register, reset, handleSubmit } = useForm();
  const url = process.env.REACT_APP_API_BASE_URL;
  const inData=setData.data;

  console.log("DATA: " + JSON.stringify(inData));

  const userData = {
    nombre: inData.username,
    email: inData.email,
    phone: inData.phone,
    activo: inData.active,
    profileImage: inData.profile_image,
  }

  console.log(userData)
  
  const cbResponse = (response)=> {
    console.log("Response del cbREesponse" + JSON.stringify(response.affectedRows))
    if (response.affectedRows ==  1){
      console.log("Usuario actualizado con éxito")
      toast('Usuario actualizado con éxito.',
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
      toast('Error al modificar el Usuario.',
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
    window.location.reload(true);
}

  const onSubmit = async (data) => {
    console.log("Usuario que ingresa " + data.user_id)
    const success = await put(`${url}/users/`, {...data, user_id:inData.user_id}, cbResponse)
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
        className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
        type="button"
        onClick={() => {
          setShowModal(true)}}
      >
        Editar 
      </button>
      {showModal ? (
        <>
          
          <div className="flex flex-col justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-1/3 my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
                <h2 className="text-x font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-align: center">
                  Edición de Usuario
                </h2>
                </div>
                <div className="relative p-6 flex-auto">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 md:space-y-6">
                      <div>
                          <label htmlFor="nombre" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre</label>
                          <input id="nombre" defaultValue={userData.nombre} className="to-reset bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" {...register("username", { required: true, maxLength: 200 })} placeholder="Nombre de usuario" />
                      </div>
                      <div>
                          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                          <input id="email" defaultValue={userData.email} className="to-reset bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="email" {...register("email", { required: true, maxLength: 200 })} placeholder="Email"  />
                      </div>
                      <div>
                          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Teléfono</label>
                          <input id="phone" defaultValue={userData.phone} className="to-reset bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="phone" {...register("phone", { required: true, maxLength: 15 })} placeholder="Teléfono" />
                      </div>
                      <div>
                          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Activo</label>
                          <select defaultValue={userData.activo} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" {...register("active", { required: true, maxLength: 50 })} placeholder="Activo" >
                              <option value="1">Activo</option>
                              <option value="0">Inactivo</option>
                          </select>
                      </div>
                      <button
                    className="text-white bg-blue-500 active:bg-blue-900 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                    type="submit"
                    
                    >
                      Guardar Task
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

export default ModalUserEditComponent;