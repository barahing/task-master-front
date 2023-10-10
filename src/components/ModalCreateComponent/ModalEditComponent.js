import React, { useState } from "react";
import { useForm } from "react-hook-form"
import { put } from "../../httprequest/httprequest";
import toast, { Toaster } from 'react-hot-toast';


const ModalEditComponent = (data) => {
  const [showModal, setShowModal] = useState(false);
  const { register, reset, handleSubmit } = useForm();
  
  const user_id = localStorage.getItem('user_id')  

  const categoryId = setCategory(data.data.category)
  const statusId = setStatusId(data.data.status)
  console.log("StatusId " + statusId)

  const taskData = {
    task_id: data.data.task_id,
    description: data.data.content,
    date: data.data.date.slice(0, 10),
    category: categoryId,
    priority: data.data.priority,
    status: statusId
  }

  console.log(taskData)
  
  const date = data.data.date.slice(0, 10) 
  
  const cbResponse = (response)=> {
    console.log("Response del cbREesponse" + JSON.stringify(response.affectedRows))
    if (response.affectedRows ===  1){
      toast('Task actualizado con éxito.',
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
    const success = await put(`http://localhost:3500/tasks/`, {...data, user_id: user_id,task_id: taskData.task_id}, cbResponse)
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
        Editar 
      </button>
      {showModal ? (
        <>
          <Toaster/>
          <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-1/3 my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-center p-5 border-b border-solid border-gray-300 rounded-t ">
                <h2 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center ">
                  Edita tu Task
                </h2>
                </div>
                <div className="relative p-6 flex-auto">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 md:space-y-4">
                      <div>
                          <label htmlFor="descripcion" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Descripción</label>
                          <input id="descripcion" defaultValue={taskData.description} className="to-reset bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" {...register("description", { required: true, maxLength: 200 })} placeholder="Descripción" />
                      </div>
                      <div>
                          <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Fecha de finalización</label>
                          <input id="deadline" defaultValue={taskData.date} className="to-reset bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full 1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="date" {...register("task_deadline", { required: true, maxLength: 200 })} placeholder="Fecha" />
                      </div>
                      <div>
                          <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Categoría</label>
                          <select defaultValue={taskData.category} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full 1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" {...register("category_id", { required: true, maxLength: 50 })} placeholder="Categoría" >
                              <option value="1">Reunión</option>
                              <option value="2">Videollamada</option>
                              <option value="3">Llamada telefónica</option>
                              <option value="4">Cita</option>
                              <option value="5">Evento</option>
                              <option value="6">Tarea</option>
                          </select>
                      </div>
                      <div>
                          <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Estado</label>
                          <select defaultValue={statusId} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full 1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" {...register("status_id", { required: true, maxLength: 50 })} placeholder="Categoría" >
                              <option value="1">Pendiente</option>
                              <option value="2">En Progreso</option>
                              <option value="3">Completado</option>
                          </select>
                      </div>
                      <div>
                          <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Prioridad</label>
                          <select defaultValue={taskData.priority=='Urgente' ? "1":"2"}className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full 1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" {...register("task_priority", { required: true, maxLength: 50 })} placeholder="Prioridad">
                              <option value="1">Urgente</option>
                              <option value="2">No urgente</option>
                          </select>
                      </div>
                      <button
                    className="text-white bg-blue-500 active:bg-blue-900 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 "
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

function setCategory(category) {
    let categoryId="";
    switch(category){
        case 'Reunión':
        categoryId='1';
        break;
        case 'Videollamada':
            categoryId='2';
            break;
        case 'Llamada Telefónica':
            categoryId='3';
            break;
        case 'Cita':
            categoryId='4';
            break;
        case 'Evento':
            categoryId='5';
            break;
        case 'Tarea':
            categoryId='6';
            break;
        default:
        break;
        
    }
    return categoryId
}

function setStatusId (status) {
    if (status==='Pendiente')
        return 1
    if (status==='En progreso')
        return 2
    if (status==='Completado')
        return 3
}


export default ModalEditComponent;