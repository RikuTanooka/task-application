import { useState } from "react";
import "./List.css";
import Task from "./Task";

function List() {
    const [tasks, setTasks] = useState([
        { id: "1", task_name: "タスク1", ideal_progress: 50, real_progress: 30 },
        { id: "2", task_name: "タスク2", ideal_progress: 70, real_progress: 60 },
    ]);

    const removeTask = (taskId: string) => {
        const updatedTasks = tasks.filter((task) => task.id !== taskId);
        setTasks(updatedTasks);
    };
    return (
        <div className="list">
            <div className="list__header">やることリスト</div>
            {tasks.map((task) => (
                <Task
                    key={task.id}
                    id={task.id}
                    task_name={task.task_name}
                    ideal_progress={task.ideal_progress}
                    real_progress={task.real_progress}
                    onRemoveClick={removeTask}
                />
            ))}
        </div>
    );
}

export default List;
