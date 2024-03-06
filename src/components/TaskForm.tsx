import React, { useState } from 'react';
import "./TaskForm.css"
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { addTask, Task, showActiveTask, showCompleteTask, showAllTask } from '../store/tasksSlice';

const TaskForm: React.FC = () => {
    const tasks = useSelector((state: RootState) => state.tasks);
    const dispatch = useDispatch();
    const [taskInput, setTaskInput] = useState<string>("");
    const [taskBody, setTaskBody] = useState<string>("")

    const handleAddTask = () => {
        if (taskInput.trim() === "") {
            return;
        }

        const newTask: Task = {
            id: tasks.length + 1,
            title: taskInput,
            text: taskBody,
            completed: false,
            hidden: false,
        };

        dispatch(addTask(newTask));
        setTaskInput("");
        setTaskBody("")
    };

    const handleShowActive = () => {
        dispatch(showActiveTask());
    };

    const handleShowComplete = () => {
        dispatch(showCompleteTask());
    };

    const handleShowAll = () => {
        dispatch(showAllTask());
    };


    return (
        <form>
            <input
                type="text"
                value={taskInput}
                onChange={(e) => setTaskInput(e.target.value)}
                placeholder='Введите заголовок'
            />
            <textarea placeholder='Введите описание' value={taskBody} onChange={(e) => setTaskBody(e.target.value)} />
            <button className='addTask' type="button" onClick={handleAddTask}>Добавить задачу</button>
            <div className='btns two'>
                <button className='addTask' type="button" onClick={handleShowComplete} >Завершенные</button>
                <button className='addTask' type="button" onClick={handleShowAll} >Все задачи</button>
                <button className='addTask' type="button" onClick={handleShowActive} >Активные</button>
            </div>
        </form>
    );
}

export default TaskForm;