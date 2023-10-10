import { useForm } from "react-hook-form"
import React, { useEffect } from 'react'
import { post } from "../../httprequest/httprequest";
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";

const bcrypt = require ('bcryptjs');

function LoginForm() {
  
  const navigate = useNavigate();
    const { register, handleSubmit } = useForm();
    const url = process.env.REACT_APP_API_BASE_URL;

    const cbResponse = (response)=> {
      console.log("Respuesta: " + JSON.stringify(response));
      if (response.message==='SUCCESS'){

          toast('Usuario loggeado con éxito.',
          {
            icon: '👏',
            style: {
              borderRadius: '10px',
              background: '#333',
              color: '#fff',
            },
          }
          );
          const token = response.succesfull;
          localStorage.setItem ('token', token)
          localStorage.setItem ('user_id', response.user_id)
          navigate('/kanban');
          window.location.reload(true);
        }
        else{
          toast.error("Error en la combinación Usuario/Contraseña")
        }
    }
    
  
  
  const onSubmit = async (datos) => {
    await post(`${url}/users/login`, {...datos}, cbResponse);
  }
    
    

  return (
    <div>
            <div><Toaster/></div>
            <section className="bg-gray-50 dark:bg-gray-900">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                        <img className="w-8 h-8 mr-2" src="https://cdn.icon-icons.com/icons2/119/PNG/128/task_list_19659.png" alt="logo"/>
                        TaskManager    
                    </a>
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-align: center">
                            INICIO DE SESIÓN
                            </h1>
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 md:space-y-6">
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                    <input className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="email" {...register("email", { required: true, maxLength: 200 })} placeholder="Email" />
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Contraseña</label>
                                    <input className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type= "password" {...register("password", { required: true, maxLength: 200 })} placeholder="Password" />
                                </div>
                                <button className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" type="submit">Ingresar</button>
                            </form>
                        </div>
                    </div>
                </div>
        </section>
    </div>
  )
}

export default LoginForm