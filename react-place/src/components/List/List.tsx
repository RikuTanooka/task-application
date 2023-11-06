import { useEffect, useState } from "react";
import db from "../../firebase";
import "./List.css";
import Task from "./Task";

type DocumentDataProps = {
    id: number;
    check: boolean;
    task_Name: string;
    ideal_progress: string;
    real_progress: string;
    documentId: string;
}[];

function List() {
    const [tasks, setTasks] = useState<DocumentDataProps>([]);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const taskData = db.collection("tasks");
                const quarySnapshot = await taskData.orderBy("timestamp", "desc").get();
                const newSelectedPost = quarySnapshot.docs.map((doc) => {
                    const data = doc.data();
                    return {
                        id: data.taskId,
                        check: data.check,
                        task_Name: data.taskName,
                        ideal_progress: data.ideal_progress,
                        real_progress: data.real_progress,
                        documentId: doc.id,
                    };
                });
                setTasks(newSelectedPost);
            } catch (error) {
                console.error("Error fetching tasks", error);
            }
        };

        fetchTasks();
    }, [tasks]);

    const removeTask = async (taskId: number) => {
        await Promise.all(
            tasks.map(async (task) => {
                if (taskId === task.id) {
                    await db
                        .collection("tasks")
                        .doc(task.documentId)
                        .delete()
                        .then(() => {
                            console.log("Success delete data!");
                        })
                        .catch((error) => {
                            console.log("Unsuccess delete data...", error);
                        });
                }
            })
        );
    };
    return (
        <div className="list">
            <div className="list__header">やることリスト</div>
            {tasks.map((task) => (
                <Task
                    key={task.id}
                    id={task.id}
                    task_name={task.task_Name}
                    ideal_progress={task.ideal_progress}
                    real_progress={task.real_progress}
                    onRemoveClick={() => removeTask(task.id)}
                />
            ))}
        </div>
    );
}

export default List;
