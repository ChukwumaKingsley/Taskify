import { Todo } from "../model"
import SingleTodo from "./SingleTodo";
import "./styles.css"

interface Props{
    todos: Todo[];
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoList: React.FC<Props> = ({ todos, setTodos }) => {
  return (
    <div className="todo--lists">
        <div className="todos--active">
            <h2 className="todos--tag">Active Todos</h2>
            {todos.filter(todo => !todo.isDone).map(todo => (
                <SingleTodo  
                todo={todo} 
                key={todo.id} 
                todos={todos} 
                setTodos={setTodos}
                />
            ))}
        </div>
        <div className="todos--completed">
            <h2 className="todos--tag">Completed Todos</h2>
            {todos.filter(todo => todo.isDone).map(todo => (
                <SingleTodo  
                todo={todo} 
                key={todo.id} 
                todos={todos} 
                setTodos={setTodos}
                />
            ))}
        </div>
    </div>
  )
}

export default TodoList