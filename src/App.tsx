import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';

const App: React.FC = () => {
  return (
    <div className='App'>
      <h1>Todo List</h1>
      <TaskForm />
      <TaskList />
    </div >
  );
}

export default App;