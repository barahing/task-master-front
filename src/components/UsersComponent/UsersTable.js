import React, { useMemo } from 'react';
import { MaterialReactTable } from 'material-react-table';
import initialData from './initialData'
import Swal from 'sweetalert2';
import ModalUserEditComponent from './ModalUserEditComponent';

let data = [];

const usersArray = initialData.data;
console.log(usersArray)
usersArray.map((value, index)=>{
    console.log(value.active)
    let user = {nombre: value.username,
                email: value.email,
                phone: value.phone,
                activo: value.active==0 ? 'Inactivo' : 'Activo',
                profileImage: value.profile_image,
                acciones: 
                    <div className='flex'>
                        <button onClick={()=>showUser(user)} className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                            Ver
                        </button>
                        <ModalUserEditComponent data={value} className="flex"/>
                    </div>
    };
    data.push(user);
})

export const Example = () => {
  const columns = useMemo(
    //column definitions...
    () => [
      {
        accessorKey: 'nombre',
        header: 'Nombre',
      },
      {
        accessorKey: 'email',
        header: 'Email',
      },
      {
        accessorKey: 'phone',
        header: 'Teléfono',
      },
      {
        accessorKey: 'activo',
        header: 'Activo',
      },
      {
        accessorKey: 'profileImage',
        header: 'Imagen de Perfil',
      },
      {
        accessorKey: 'acciones',
        header: 'Acciones',
      },
    ],
    [],
    //end
  );

  return (
    <MaterialReactTable 
      columns={columns}
      data={data}
      enableColumnActions={false}
      enableColumnFilters={false}
      enablePagination={false}
      enableSorting={false}
      enableBottomToolbar={false}
      enableTopToolbar={false}
      muiTableBodyRowProps={{ hover: false }}
      muiTableProps={{
        sx: {
          border: '1px solid rgba(81, 81, 81, 1)',
        },
      }}
      muiTableHeadCellProps={{
        sx: {
          border: '1px solid rgba(81, 81, 81, 1)',
        },
      }}
      muiTableBodyCellProps={{
        sx: {
          border: '1px solid rgba(81, 81, 81, 1)',
        },
      }}
    />
  );
};

function showUser (user) {
    console.log(user)
    console.log(user.activo)
    const userActive = user.activo == 1 ? 'Activo' : 'Inactivo'
    console.log("User activo" + userActive)
    Swal.fire({
      title: '<strong>' + 'Información del usuario' +'</strong>',
      icon: 'info',
      html:
        'Nombre: '+ user.nombre + '<br/>' +
        'Email: ' + user.email + '<br/>' +
        'Teléfono: ' + user.phone + '<br/>' + 
        'Estado: ' + user.activo 
       ,
      showCloseButton: true,

      


      showCancelButton: false,
      focusConfirm: false,
      confirmButtonText:
        '<i class="fa fa-thumbs-up"></i> Cerrar',
      confirmButtonAriaLabel: 'Thumbs up, great!',
  
    })
  }

export default Example;
