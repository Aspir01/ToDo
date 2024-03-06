import React, { useState } from 'react';
import "./Task.css"
import { Task, addTask, deleteTask, updateTaskStatus } from '../store/tasksSlice';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { useDrag, useDrop } from 'react-dnd'


interface TaskItemProps {
    task: Task;
    index: number;
    moveTask: (dragIndex: number, hoverIndex: number) => void;
}


const TaskItem: React.FC<TaskItemProps> = ({ task, index, moveTask }) => {
    const [editingTask, setEditingTask] = useState<Task | null>(null);

    const handleEdit = (task: Task) => {
        setEditingTask(task);
    };

    const [, drag] = useDrag({
        type: "TASK",
        item: { id: task.id, index },
    });

    const tasks = useSelector((state: RootState) => state.tasks);
    const dispatch = useDispatch();
    const [isCompleted, setisCompleted] = useState<boolean>(task.completed)

    function handleClick() {
        setisCompleted(!isCompleted);
        dispatch(updateTaskStatus({ id: task.id, completed: !isCompleted }));
    }

    const [, drop] = useDrop({
        accept: 'TASK',
        hover(item: { id: number; index: number }) {
            if (!item || item.id === task.id) {
                return;
            }

            moveTask(item.index, index);
            item.index = index;
        },
    });
    const saveEdit = () => {
        if (editingTask) {
            dispatch(deleteTask(editingTask.id));
            dispatch(addTask(editingTask));
            setEditingTask(null);
        }
    };
    return (
        <div ref={(node) => drag(drop(node))} className={`task ${isCompleted ? 'active' : ''}`}>
            {editingTask && editingTask.id === task.id ? (
                <>
                    <input type="text" className='editing' value={editingTask.title} onChange={(e) => setEditingTask({ ...editingTask, title: e.target.value })} />
                    <textarea className='editing' value={editingTask.text} onChange={(e) => setEditingTask({ ...editingTask, text: e.target.value })} />
                    <button className="editSave" onClick={saveEdit}>Сохранить</button>
                </>
            ) : (
                <>
                    <h3>{task.title}</h3>
                    <p>{task.text}</p>
                    <div className='btns'>
                        <button onClick={handleClick} className='complete'>Завершить</button>
                        <button onClick={() => handleEdit(task)} className='edit'>Редактировать</button>
                        <button onClick={() => dispatch(deleteTask(task.id))} className='delete'>Удалить</button>
                    </div>
                </>
            )}
        </div>
    );
}

export default TaskItem;