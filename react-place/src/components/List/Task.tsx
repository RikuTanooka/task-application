import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Button } from "@mui/material";
import React, { useState } from "react";
import db from "../../firebase";
import "./Task.css";

type TaskProps = {
    id: number;
    task_name: string;
    ideal_progress: string;
    real_progress: string;
    onRemoveClick: Function;
};

type DocumentDataProps = {
    id: number;
    task_Name: string;
    ideal_progress: string;
    real_progress: string;
    documentId: string;
}[];

function Task({ id, task_name, ideal_progress, real_progress, onRemoveClick }: TaskProps): JSX.Element {
    const [progress, setProgress] = useState<string>("0");
    const [input_state, setInput_state] = useState<Boolean>(false);
    const [selectedPost, setSelectedPost] = useState<DocumentDataProps>([]);

    const handleRemoveClick = () => {
        onRemoveClick(id);
    };

    const input_real_progress = async () => {
        setInput_state(true);

        const snapshot = await db.collection("tasks").get();

        const newSelectedPost = await Promise.all(
            snapshot.docs.map(async (doc) => {
                const data = doc.data();
                return {
                    id: data.taskId,
                    task_Name: data.taskName,
                    ideal_progress: data.ideal_progress,
                    real_progress: data.real_progress,
                    documentId: doc.id,
                };
            })
        );

        setSelectedPost(newSelectedPost);

        console.log(newSelectedPost);
    };

    const output_real_progress = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        setInput_state(false);

        await console.log(selectedPost);

        await Promise.all(
            selectedPost.map(async (post) => {
                console.log(id);
                console.log(post.id);
                console.log(post.documentId);
                if (id === post.id) {
                    db.collection("tasks").doc(post.documentId).update({
                        real_progress: progress,
                    });
                }
            })
        );
    };

    return (
        <div className="task">
            <label>
                <input
                    id={String(id)}
                    className="task__checkbox"
                    type="checkbox"
                />
                {task_name}
                想定進捗:{ideal_progress}%
                <Button onClick={handleRemoveClick}>
                    <DeleteForeverIcon
                        color="secondary"
                        fontSize="small"
                    />
                </Button>
                <br />
                {input_state ? (
                    <div>
                        現在の進捗度を入力してください:
                        <input
                            type="number"
                            min="0"
                            max="100"
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProgress(e.target.value)}
                        />
                        <br />
                        <Button
                            className="progress"
                            variant="contained"
                            onClick={output_real_progress}
                        >
                            入力完了
                        </Button>
                    </div>
                ) : (
                    <div>
                        現在の進捗:{real_progress}%
                        <br />
                        <Button
                            className="progress"
                            variant="contained"
                            onClick={input_real_progress}
                        >
                            進捗度の入力
                        </Button>
                    </div>
                )}
            </label>
        </div>
    );
}

export default Task;
