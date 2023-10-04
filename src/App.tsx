import { useState } from 'react'
import './App.css'
import InputFeild from './components/InputFeild'
import { Todo } from './model';
import TodoList from './components/TodoList';
import { DragDropContext, DropResult } from 'react-beautiful-dnd'

function App() {

  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([])
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([])

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (todo) {
      setTodos(
        [...todos, 
          {id: Date.now(), 
          todo: todo,
          isDone: false}
        ])
        setTodo("")
    }
    setTodos
  };

  const onDragEnd = (results: DropResult) => {
    console.log(results)
  }


  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className='App' onSubmit={handleAdd}>
        <span className='heading'>Taskify</span>
        <InputFeild todo={todo} setTodo={setTodo} handleAdd={handleAdd}/>
        <TodoList todos={todos} setTodos={setTodos} completedTodos={completedTodos} setCompletedTodos={setCompletedTodos} />
      </div>
    </DragDropContext>
  )
}

export default App;
