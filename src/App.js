import React, { useEffect, useState } from 'react';

import Tasks from './components/Tasks/Tasks';
import NewTask from './components/NewTask/NewTask';
import useFetch from './hooks/use-fetch';

function App() {
  const [tasks, setTasks] = useState([]);

  const transformTasks = (tasks) => {
    const loadedTasks = [];

    for (const taskKey in tasks) {
      loadedTasks.push({id: taskKey, text: tasks[taskKey].text});
    }

    setTasks(loadedTasks);
  }

  const httpData = useFetch({
    url: 'https://react-http-ec3e5-default-rtdb.firebaseio.com/tasks.json',
  }, transformTasks);

  useEffect(() => {
    httpData.fetchTasks();
  }, []);

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={httpData.isLoading}
        error={httpData.error}
        onFetch={httpData.fetchTasks}
      />
    </React.Fragment>
  );
}

export default App;
