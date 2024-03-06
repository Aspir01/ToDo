import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface Task {
    id: number;
    title: string;
    text: string;
    completed: boolean;
    hidden: boolean; // Добавляем новое поле hidden
}

const initialState = [
    { id: 1, title: "Покупки в магазине", text: 'Не забудь купить кетчуп для шашлыка', completed: false, hidden: false },
    { id: 2, title: "Пойти к другу", text: 'Пойти к другу чтобы потом вместе поехать отдыхать', completed: true, hidden: false },
    { id: 3, title: "Потренироваться", text: 'Сделать приседания и отжимания', completed: false, hidden: false },
    { id: 4, title: "Выполнить ТЗ", text: 'Выполнить тз для компании ЧатАпп', completed: true, hidden: false }
] as Task[];

const tasksSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        deleteTask: (state, action: PayloadAction<number>) => {
            const newState = state.filter((task: Task) => task.id !== action.payload);
            return newState;
        },
        moveTask: (state, action: PayloadAction<{ dragIndex: number; hoverIndex: number }>) => {
            const { dragIndex, hoverIndex } = action.payload;
            const tasks = [...state];
            const dragTask = tasks[dragIndex];
            tasks.splice(dragIndex, 1);
            tasks.splice(hoverIndex, 0, dragTask);
            const newState = tasks;
            localStorage.setItem("tasks", JSON.stringify(newState));
            return newState;
        },
        addTask: (state, action: PayloadAction<Task>) => {
            state.push(action.payload);
        },
        showActiveTask: (state) => {
            state.forEach((task) => {
                task.hidden = task.completed;
            });
        },
        showCompleteTask: (state) => {
            state.forEach((task) => {
                task.hidden = !task.completed;
            });
        },
        showAllTask: (state) => {
            state.forEach((task) => {
                task.hidden = false;
            });
        },
        updateTaskStatus: (state, action: PayloadAction<{ id: number; completed: boolean }>) => {
            return state.map((task) => {
                if (task.id === action.payload.id) {
                    return { ...task, completed: action.payload.completed };
                }
                return task;
            });
        }
    }
})

export const { addTask, deleteTask, moveTask, showActiveTask, showAllTask, showCompleteTask, updateTaskStatus } = tasksSlice.actions;
export default tasksSlice.reducer;