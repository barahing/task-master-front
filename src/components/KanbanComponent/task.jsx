import React from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';
import { Button } from '@mui/material';
import toast, { Toaster } from 'react-hot-toast';
import Swal from 'sweetalert2';
import ModalEditComponent from '../ModalCreateComponent/ModalEditComponent';
import { del, get } from '../../httprequest/httprequest';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid lightgrey;
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
  background-color: ${props => (props.isDragging ? '#C3D1B9' : '#E1DDDC')};

`;

const TaskTitle = styled.div`
  color: black;  
  font-size: x-large;
  font-weight: 700;
  cursor: pointer;
`

const ButtonContainer = styled.div`
  diplay: flex;
  flex-direction: column;
  justify-items: center;
`;


export default class Task extends React.Component {
  render() {
    return (
      //<Draggable draggableId={this.props.task.id} index={this.props.index}>
      <Draggable draggableId={this.props.task.id} index={this.props.index}>
        {(provided, snapshot) => (
          
          <Container
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            isDragging={snapshot.isDragging}
          >
            <Toaster/>
            <TaskTitle onClick = {()=>showTask(this.props.task)}>{this.props.task.content}</TaskTitle>
            Finaliza en: {this.props.task.date.slice(0, 10)}
            <ButtonContainer>
              <div className='flex justify-between'>
                <ModalEditComponent data={this.props.task}/>
                <button className="h-10 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 mt-5" onClick={()=>deleteTask(this.props.task)}>Borrar</button>
              </div>
            </ButtonContainer>
          </Container>
        )}
      </Draggable>
    );
  }
}

async function showTask (task) {
  try {
    
    let taskData = await get(`http://localhost:3500/tasks/${task.task_id}`);
    console.log(taskData)
    taskData=taskData.data[0]

    task.status = getStatusName(taskData.status_id)

    Swal.fire({
      title: '<strong>' + taskData.description +'</strong>',
      icon: 'info',
      html:
        'Fecha de finalización: '+ task.date.slice(0,10) + '<br/>' +
        'Prioridad: ' + task.priority + '<br/>' +
        'Categoría: ' + task.category + '<br/>' +
        'Estado: ' + task.status + '<br/>' +
        'Usuario: ' + task.user
        ,
      showCloseButton: true,
      showCancelButton: false,
      focusConfirm: false,
      confirmButtonText:
        '<i class="fa fa-thumbs-up"></i> Cerrar',
      confirmButtonAriaLabel: 'Thumbs up, great!',

    })
  }
  catch (error) {
    console.log(error);
  }
}

function getStatusName(status_id) {
  switch (status_id) {
    case 1:
      return 'Pendiente'
      break;
    case 2:
      return 'En progreso'
      break;  
    case 3:
      return 'Completado'
      break;
    default:
      break;
  }
}

async function deleteTask (task) {
  
  Swal.fire({
    title: '¿Estás seguro de eliminar el Task?',
    text: "No podrás recuperarlo una vez borrado",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Confirmar'
  }).then((result) => {
    if (result.isConfirmed) {
      const success=del(`http://localhost:3500/tasks/${task.task_id}`, task.task_id)
      if (success === 'AxiosError: Network Error')
        toast.error("Error de red. No se eliminó el Task")
      else 
        toast.success("Task eliminado");
      setTimeout(() => {
        window.location.reload(true)
      }, 2000);
          
    
      
    }
  })
}