import { get, post, put } from "../../httprequest/httprequest";
var tasks=new Object();
var tasksIdsArray = [];

var toDoArray = [];
var inProgressArray = [];
var completedArray = [];

const user = localStorage.getItem('user_id')

try {
  
  const contenido = await get(`http://localhost:3500/tasks/user/${user}`)  
  
  contenido.data.forEach((element,index) => {
      tasks[`task-${index+1}`] = 
      { id: `task-${index+1}`,
        content: element.description, 
        date: element.task_deadline,
        status: element.status,
        category: element.category_name,
        user: element.username,
        task_id: element.task_id,
        priority: element.priority_name,
      }
    put('http://localhost:3500/tasks/setKanbanId', {
      task_id: element.task_id, 
      kanban_id: `task-${index+1}`,
    })

      switch(element.status) {
        case 'Pendiente':
          toDoArray.push(`task-${index+1}`)
          break;
        case 'En progreso':
          inProgressArray.push(`task-${index+1}`)
          break;
        case 'Completado':
          completedArray.push(`task-${index+1}`)
          break;
        default:
          break;
      }
     
      //tasksIdsArray.push(`task-${index+1}`)
  });
}
catch(error) {
  console.log("Servidor de data no iniciado")
}

// const tasks={
//     'task-1': { id: 'task-1', content: `${contenido.data[0].description}` },
//     'task-2': { id: 'task-2', content: `${contenido.data[1].description}` },
//     'task-3': { id: 'task-3', content: 'Charge my phone' },
//     'task-4': { id: 'task-4', content: 'Cook dinner' },
// }
let initialData={};

if (tasks!=null){
  initialData = {
      tasks,
      columns: {
        'column-1': {
          id: 'column-1',
          title: 'Pendiente',
          taskIds: toDoArray,
        },
        'column-2': {
          id: 'column-2',
          title: 'En progreso',
          taskIds: inProgressArray,
        },
        'column-3': {
          id: 'column-3',
          title: 'Completado',
          taskIds: completedArray,
        },
      },
      // Facilitate reordering of the columns
      columnOrder: ['column-1', 'column-2', 'column-3'],
    };
  }
  else {
    initialData = {}
  }

  export default initialData;