import React from 'react'
import UserCreateComponent from './UserCreateComponent'

function UsersHeader() {
  return (
    <div>
        <h1 class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Bienvenido a la zona de usuarios</h1>
        <p class="mb-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">Desde aquí podras crear, modificar y desactivar usuarios. ¿Quieres empezar creando un nuevo usuario?</p>
        <UserCreateComponent/>
    </div>
  )
}

export default UsersHeader