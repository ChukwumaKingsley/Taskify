import { Droppable } from "react-beautiful-dnd";
import { Todo } from "../model"
import SingleTodo from "./SingleTodo";
import "./styles.css"

interface Props{
    todos: Todo[];
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
    activeTodos: Todo[];
    setActiveTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
    completedTodos: Todo[];
    setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoList: React.FC<Props> = ({ todos, setTodos, activeTodos, completedTodos }) => (
    <div className="todo--lists">
        <Droppable droppableId="TodosList">
            {(provided, snapshot) => (
                <div
                    className={`todos--active  ${snapshot.isDraggingOver ? "dragactive" : ""}`}
                    ref={provided.innerRef}
                    {...provided.droppableProps}>
                    <h2 className="todos--tag">Active Todos</h2>
                    {activeTodos?.map((todo, index) => (
                        <SingleTodo
                            index={index}
                            todo={todo}
                            key={todo.id}
                            todos={todos}
                            setTodos={setTodos} />
                    ))}
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
        <Droppable droppableId="TodosComplete">
            {(provided, snapshot) => (
                <div
                    className={`todos--completed ${snapshot.isDraggingOver ? "dragcomplete" : ""}`}
                    ref={provided.innerRef}
                    {...provided.droppableProps}>
                    <h2 className="todos--tag">Completed Todos</h2>
                    {completedTodos?.map((todo, index) => (
                        <SingleTodo
                            index={index}
                            todo={todo}
                            key={todo.id}
                            todos={todos}
                            setTodos={setTodos} />
                    ))}
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    </div>
)

export default TodoList