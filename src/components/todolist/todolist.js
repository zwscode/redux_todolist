import React, { useState, useEffect } from "react";
import "./todolist.css";
import { useDispatch, useSelector } from "react-redux";
import {
    getTodosAsync,
    createTodoAsync,
    editTodoAsync,
    deleteTodoAsync,
} from "../../redux/todoSlice";

const Todolist = () => {
    const dispatch = useDispatch();
    const todos = useSelector((state) => state.todos.todos);

    const [newTodo, setNewTodo] = useState("");
    const [editId, setEditId] = useState(null);
    const [editInput, setEditInput] = useState("");

    useEffect(() => {
        dispatch(getTodosAsync());
    }, [dispatch]);

    const handleSubmit = () => {
        dispatch(createTodoAsync({ content: newTodo }));
        setNewTodo("");
    };

    const handleEdit = (id) => {
        if (editId === id) {
            setEditInput("");
            setEditId(null);
            dispatch(editTodoAsync({ id: id, content: editInput }));
        } else {
            setEditId(id);
            setEditInput(todos.find((todo) => todo.id === id).content);
        }
    };

    const handleDelete = (id) => {
        dispatch(deleteTodoAsync({ id: id }));
    };

    return (
        <div className="todo-container">
            <div className="form-container">
                <input
                    value={newTodo}
                    onChange={(event) => {
                        setNewTodo(event.target.value);
                    }}
                />
                <button onClick={handleSubmit}>submit</button>
            </div>

            <div className="list-container">
                <ul>
                    {todos.map((item, index) => {
                        const isEdit = item.id === editId;
                        return (
                            <li key={item.id}>
                                {/* conditional rendering */}
                                {isEdit ? (
                                    <input
                                        value={editInput}
                                        onChange={(e) =>
                                            setEditInput(e.target.value)
                                        }
                                    />
                                ) : (
                                    <span>{item.content}</span>
                                )}

                                {/* replace span */}
                                <div className="todo-action">
                                    <button onClick={() => handleEdit(item.id)}>
                                        {editId === item.id ? "save" : "edit"}
                                        {/* save */}
                                    </button>
                                    <button
                                        onClick={() => {
                                            handleDelete(item.id);
                                        }}
                                    >
                                        delete
                                    </button>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
};

export default Todolist;
