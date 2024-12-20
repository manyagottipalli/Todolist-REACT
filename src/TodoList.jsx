import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';

export default function TodoList() {
    let [todos, setTodos] = useState([{ task: "sample-task", id: uuidv4(), isDone: false }]);
    let [newTodo, setNewTodo] = useState("");  

    let addNewTask = () => {
        if (newTodo.trim() === "") {
            alert("Task cannot be empty! Please enter a valid task.");
            return; 
        }
        setTodos((prevTodos) => {
            return [...prevTodos, { task: newTodo, id: uuidv4() }];
        });
        setNewTodo("");
    };
        
    let updateTodoValue = (event) => {
        setNewTodo(event.target.value);
    };

    let deleteTodo = (id) => {
        setTodos((prevTodos) => todos.filter((todo) => todo.id !== id));
    };

    let AllDone = () => {
        setTodos(
            todos.map((todo) => {
                return {
                    ...todo,
                    isDone: true,
                };
            })
        );
    };

    let OneTaskDone = (id) => {
        setTodos((prevTodos) => 
            prevTodos.map((todo) => {
                if (todo.id === id) {
                    return {
                        ...todo,
                        isDone: true,
                    };
                } else {
                    return todo;
                }
            })
        );
    };

    return (
        <div className="todo-app">
            <input 
                className="todo-input"
                placeholder="Add a task" 
                value={newTodo} 
                onChange={updateTodoValue} 
            />
            <br />
            <br />
            <button className="add-task-btn" onClick={addNewTask}>Add Task</button>
            <br />
            <br />
    
            <h4 className="todo-list-title">Todo List</h4>
       
            <ol className="todo-list">
                {todos.map((todo) => (
                    <li key={todo.id} className="todo-item">
                        <span 
                            className={todo.isDone ? "task-done" : "task-pending"}>
                            {todo.task}
                        </span>
                        <div className="todo-buttons">
                            <button 
                                className="delete-btn" 
                                onClick={() => deleteTodo(todo.id)}>
                                Delete
                            </button>
                            <button 
                                className="done-btn" 
                                onClick={() => OneTaskDone(todo.id)}>
                                DONE
                            </button>
                        </div>
                    </li>
                ))}
            </ol>
            <br />
            <button className="all-done-btn" onClick={AllDone}>ALL DONE</button>
        </div>
    );
}
