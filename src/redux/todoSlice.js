import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getTodos, createTodo, updateTodo, deleteTodo } from "../API/todoAPI";

const getTodosAsync = createAsyncThunk("todos/getTodos", async () => {
    const response = await getTodos();
    return response;
});

const createTodoAsync = createAsyncThunk(
    "todos/createTodo",
    async (payload) => {
        const response = await createTodo(payload);
        return response;
    }
);

const editTodoAsync = createAsyncThunk("todos/editTodo", async (payload) => {
    const response = await updateTodo(payload.id, { content: payload.content });
    return response;
});

const deleteTodoAsync = createAsyncThunk(
    "todos/deleteTodo",
    async (payload) => {
        const id = payload.id;
        const response = await deleteTodo(id);
        return response;
    }
);

const todoSlice = createSlice({
    name: "todos",
    initialState: {
        todos: [],
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getTodosAsync.fulfilled, (state, action) => {
                state.todos = action.payload;
            })
            .addCase(createTodoAsync.fulfilled, (state, action) => {
                state.todos.push(action.payload);
            })
            .addCase(editTodoAsync.fulfilled, (state, action) => {
                const index = state.todos.findIndex(
                    (todo) => todo.id === action.payload.id
                );
                if (index !== -1) {
                    state.todos[index].content = action.payload.content;
                }
            })
            .addCase(deleteTodoAsync.fulfilled, (state, action) => {
                const index = state.todos.findIndex(
                    (todo) => todo.id === action.payload.id
                );
                if (index !== -1) {
                    state.todos.splice(index, 1);
                }
            });
    },
});

export { getTodosAsync, createTodoAsync, editTodoAsync, deleteTodoAsync };

export default todoSlice.reducer;
