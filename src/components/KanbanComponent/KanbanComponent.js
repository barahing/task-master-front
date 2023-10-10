import { put } from "../../httprequest/httprequest";
import React from 'react'
import initialData from "./initial-data";
import Column from './column'
import styled from 'styled-components'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import ModalCreateComponent from "../ModalCreateComponent/ModalCreateComponent";


const Container = styled.div`
  display: flex;
  flex-direction: row;
`

const Button = styled.button`
  background-color: black;
  color: white;
  font-size: 15px;
  padding: 10px 40px;
  border-radius: 5px;
  margin: 10px 0px;
  cursor: pointer;
`;

class InnerList extends React.PureComponent {
  render() {
    const { column, taskMap, index} = this.props;
    const tasks = column.taskIds.map(taskId => taskMap[taskId]);
    return <Column column={column} tasks={tasks} index={index} />
  }
}

class KanbanComponent extends React.Component {
  
  state= initialData;
  
  
  onDragEnd = result => {
    const { destination, source, draggableId, type } = result;

    if (!destination ){
      return;
    }

    if (
        destination.droppableId === source.droppableId &&
        destination.index === source.index
    ){
      return;
    }

    if (type === 'column') {
      const newColumnOrder = Array.from(this.state.columnOrder);
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId)

      const newState = {
        ...this.state,
        columnOrder: newColumnOrder,
      }
      this.setState(newState);
      return;
    }

    const start = this.state.columns[source.droppableId];
    const finish  = this.state.columns[destination.droppableId];

    if (start===finish) {
      const newTaskIds = Array.from(start.taskIds)
      newTaskIds.splice(source.index, 1)
      newTaskIds.splice(destination.index, 0, draggableId);
  
      const newColumn = {
        ...start,
        taskIds: newTaskIds,
      };
      
      const newState = {
        ...this.state,
        columns: {
          ...this.state.columns,
          [newColumn.id]: newColumn,
        }
      }
  
      this.setState(newState);
      return;
    }

    // Moving from one list to another
    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds,
    };
    
    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId)
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds
    }
    
    newFinish.taskIds.forEach(element => {
      console.log("Element:")
      console.log(element)
      put('http://localhost:3500/tasks/setStatusId', {
        kanban_id: element, 
        status_id: newFinish.id.slice(7)
      })
    })

    const newState = {
      ...this.state,
      columns: {
        ...this.state.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };
    this.setState(newState);
  };

  render() {
    return (
      
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable 
          droppableId="all-columns" 
          direction="horizontal" 
          type="column"
        >
        {provided => (
          <Container
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            
            {this.state.columnOrder.map((columnId, index) => {
              const column = this.state.columns[columnId];
              return <InnerList 
                key={column.id} 
                column={column} 
                taskMap={this.state.tasks} 
                index={index} 
                />
            })}
            {provided.placeholder}
            <ModalCreateComponent/>
          </Container>
          )}
        </Droppable>
     </DragDropContext>
    );
  }
}

export default KanbanComponent

