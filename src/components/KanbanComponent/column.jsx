import React from 'react'
import styled from 'styled-components'
import Task from './task';
import { Droppable, Draggable } from 'react-beautiful-dnd';

const Container = styled.div`
    
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  width: 300px;
  background: rgb(13,132,181);
  background: linear-gradient(90deg, rgba(13,132,181,1) 1%, rgba(58,58,125,1) 34%, rgba(5,90,175,1) 62%);
  min-height: 100vh;

  display: flex;
  flex-direction: column;
`;
const Title = styled.h3`
    padding: 8px;
    color: white;
`;
const TaskList = styled.div`
    padding: 8px;
    transition: background-color 0.2s ease;
    background-color: ${props => (props.isDragginOver ? 'skyblue' : 'inherit')};
    flex-grow: 1;
    min-height: 100px;
`;

class InnerList extends React.Component {
  shouldComponentUpdate(nextPropos) {
    if (nextPropos.tasks === this.props.tasks)
      return false;
    return true;
  }
  
  render() {
     return this.props.tasks.map((task, index)=> (
      <Task key={task.id} task={task} index={index} />
    ));
  }
}


export default class Column extends React.Component {
render() {
return (
  <Draggable draggableId={this.props.column.id} index={this.props.index}>
  {(provided)=> (
      <Container {...provided.draggableProps} ref={provided.innerRef}>
          <Title {...provided.dragHandleProps}>{this.props.column.title}</Title>
          <Droppable droppableId={this.props.column.id} type="task">
              {(provided, snapshot)=> (
                  <TaskList 
                      ref={provided.innerRef} 
                      {...provided.droppableProps}
                      isDragginOver={snapshot.isDraggingOver}
                      >
                      
                      <InnerList tasks={this.props.tasks}/>
                      {provided.placeholder}
                  </TaskList>
              )}
          </Droppable>
      </Container>
  )}
  </Draggable>
  );
}
}