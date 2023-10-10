import React, { useState } from "react";
import { useForm } from "react-hook-form"
import { post } from "../../httprequest/httprequest";
import toast, { Toaster } from 'react-hot-toast';
import LabelCheckboxComponent from "./LabelCheckboxComponent";



const ModalCreateComponent = () => {
  const [showModal, setShowModal] = useState(false);
  const { register, reset, handleSubmit } = useForm();
  
  const user_id = localStorage.getItem('user_id')  

  const cbResponse = (response)=> {
    console.log("Response del cbREesponse" + JSON.stringify(response.affectedRows))
    if (response.affectedRows ===  1){
      toast('Task creado con éxito.',
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
      toast('Error al crear el Task.',
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
}

  const onSubmit = async (data) => {
    console.log(data);
    const success = await post(`http://localhost:3500/tasks/`, {...data, status_id: 1, user_id: user_id}, cbResponse)
    if (success === 'AxiosError: Network Error'){
      toast.error("Error de red. No se creó el Task")
    }
    reset();
    setShowModal(false)
    window.location.reload(true);
  }
  
  
  return (
    <div>
      <button
        className="h-10 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 mt-5"
        type="button"
        onClick={() => {
          setShowModal(true)}}
      >
        Crear Tarea
      </button>
      {showModal ? (
        <>
          <Toaster/>
          
          <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-1/3 my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-center p-2 border-b border-solid border-gray-300 rounded-t ">
                <h2 className="text-l font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-align: center">
                  Crea tu nuevo Task
                </h2>
                </div>
                <div className="relative p-6 flex-auto">
                <form id="createForm" onSubmit={handleSubmit(onSubmit)} className="space-y-4 md:space-y-4">
                      <div>
                          <label htmlFor="descripcion" className="block text-sm font-medium text-gray-900 dark:text-white">Descripción</label>
                          <input id="descripcion" className="to-reset bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" {...register("description", { required: true, maxLength: 200 })} placeholder="Descripción" />
                      </div>
                      <div>
                          <label className="block text-sm font-medium text-gray-900 dark:text-white">Fecha de finalización</label>
                          <input id="deadline" className="to-reset bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="date" {...register("task_deadline", { required: true, maxLength: 200 })} placeholder="Fecha" />
                      </div>
                      <div>
                          <label className="block text-sm font-medium text-gray-900 dark:text-white">Categoría</label>
                          <select className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" {...register("category_id", { required: true, maxLength: 50 })} placeholder="Categoría">
                              <option value="1">Personal</option>
                              <option value="2">Laboral</option>
                              <option value="3">Entretenimiento</option>
                              <option value="4">Académico</option>
                              <option value="5">Médico</option>
                          </select>
                      </div>
                      <div>
                          <label className="block text-sm font-medium text-gray-900 dark:text-white">Prioridad</label>
                          <select className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" {...register("task_priority", { required: true, maxLength: 50 })} placeholder="Prioridad">
                              <option value="1">Urgente</option>
                              <option value="2">No urgente</option>
                          </select>
                      </div>
                      <div className="bg-white">
                        <LabelCheckboxComponent/>
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



export default ModalCreateComponent;