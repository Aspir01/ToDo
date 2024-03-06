import React from 'react';
import "./Task.css"
import { RootState } from '../store/store';
import TaskItem from './TaskItem';
import { Task, moveTask } from '../store/tasksSlice';
import { useSelector, useDispatch } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const TaskList: React.FC = () => {
    const tasks = useSelector((state: RootState) => state.tasks);
    const dispatch = useDispatch();

    const handleTaskMove = (dragIndex: number, hoverIndex: number) => {
        const newTasks = [...tasks];
        const dragTask = newTasks[dragIndex];
        newTasks.splice(dragIndex, 1);
        newTasks.splice(hoverIndex, 0, dragTask);

        dispatch(moveTask({ dragIndex, hoverIndex }));
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <div className='taskList'>
                {tasks.map((task: Task, index: number) => (
                    <TaskItem key={task.id} task={task} index={index} moveTask={handleTaskMove} />
                ))}
            </div>
        </DndProvider>
    );
}

export default TaskList;