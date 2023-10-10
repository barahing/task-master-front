import React from 'react'

const url = process.env.REACT_APP_API_BASE_URL;

function SideBar() {
  return (
   <div>
    <head>
        <meta charset="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <title>TASKMASTER</title>
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" rel="stylesheet"/>
    </head>
        <nav className="bg-blue-500 p-4 flex items-center justify-between w-100">
            <div>
                <h1 class="text-white text-l font-semibold">TASKMASTER</h1>
            </div>
            <div class="flex items-center space-x-4">
                <span class="text-white">Bienvenido</span>
                
                <i class="fas fa-user-circle text-white text-2xl"></i>
            </div>
        </nav>

        {/* <!-- Navegación lateral --> */}
        <aside class="bg-gray-800 text-white w-64 min-h-screen p-4">
            <nav>
                <ul class="space-y-2">
                <li class="opcion-con-desplegable">
                        <div class="flex items-center justify-between p-2 hover:bg-gray-700">
                            <div class="flex items-center">
                                <i class="fas fa-solid fa-user mr-2"></i>
                                <a href={`http://localhost:3000/users`}>Zona de Usuario</a>
                            </div>
                        </div>
                        
                    </li>
                    <li class="opcion-con-desplegable">
                        <div class="flex items-center justify-between p-2 hover:bg-gray-700">
                            <div class="flex items-center">
                                <i class="fas fa-calendar-alt mr-2"></i>
                                <span>Dashboard</span>
                            </div>
                        </div>
                        
                    </li>
                    <li class="opcion-con-desplegable">
                        <div class="flex items-center justify-between p-2 hover:bg-gray-700">
                            <div class="flex items-center">
                                <i class="fas fa-money-bill-wave mr-2"></i>
                                <a href={`http://localhost:3000/kanban`}>Kanban</a>
                            </div>
                        </div>
                    </li>
                    <li class="opcion-con-desplegable">
                        <div class="flex items-center justify-between p-2 hover:bg-gray-700">
                            <div class="flex items-center">
                                <i class="fas fa-chart-bar mr-2"></i>
                                <span>Acerca De</span>
                            </div>
                        </div>
                    </li>
                    <li class="opcion-con-desplegable">
                        <div class="flex items-center justify-between p-2 hover:bg-gray-700">
                            <div class="flex items-center">
                            <i class="fas fa-file-alt mr-2"></i>
                            <span>Cerrar Sesión</span>
                            </div>
                        </div>
                    </li>
        
                </ul>
            </nav>
        </aside>
   </div>
   
  )
}


document.addEventListener("DOMContentLoaded", function () {
      // Obtener todas las opciones principales con desplegables
      const opcionesConDesplegable = document.querySelectorAll(".opcion-con-desplegable");

      // Agregar evento de clic a cada opción principal
      opcionesConDesplegable.forEach(function (opcion) {
        opcion.addEventListener("click", function () {
          // Obtener el desplegable asociado a la opción
          const desplegable = opcion.querySelector(".desplegable");

          // Alternar la clase "hidden" para mostrar u ocultar el desplegable
          desplegable.classList.toggle("hidden");
        });
      });
    });

export default SideBar