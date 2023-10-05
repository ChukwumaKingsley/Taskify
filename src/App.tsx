import { useState, useEffect } from 'react';
import './App.css'
import InputFeild from './components/InputFeild'
import { Todo } from './model';
import TodoList from './components/TodoList';
import { DragDropContext, DropResult } from 'react-beautiful-dnd'

function App() {

  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([])
  const [activeTodos, setActiveTodos] = useState<Todo[]>([])
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([])

  useEffect(() => {
    setActiveTodos(todos.filter(todo => !todo.isDone))
    setCompletedTodos(todos.filter(todo => todo.isDone))
  }, [todos])

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
  };

  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;
    console.log(result)

    if (!destination) {
      return;
    }
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    let add;
    let active = [...activeTodos];
    let complete = [...completedTodos];

    if (source.droppableId === 'TodosList') {
      add = active[source.index];
      active.splice(source.index, 1);
    } else {
      add = complete[source.index];
      complete.splice(source.index, 1);
    }

    if (destination.droppableId === 'TodosList' && destination.droppableId === source.droppableId) {
      active.splice(destination.index, 0, add);
    } else if (destination.droppableId === 'TodosComplete' && destination.droppableId === source.droppableId) {
      complete.splice(destination.index, 0, add);
    } else {
      complete.splice(destination.index, 0, {...add, isDone: !add.isDone});
    }
    setTodos([...active, ...complete])
  } 


  console.log("todos>>", todos)
  console.log("completed>>", completedTodos)

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className='App' onSubmit={handleAdd}>
        <span className='heading'>Taskify</span>
        <InputFeild todo={todo} setTodo={setTodo} handleAdd={handleAdd}/>
        <TodoList
          todos={todos}
          setTodos={setTodos}
          activeTodos={activeTodos}
          setActiveTodos={setActiveTodos}
          completedTodos={completedTodos}
          setCompletedTodos={setCompletedTodos}
        />
      </div>
    </DragDropContext>
  )
}

export default App;
