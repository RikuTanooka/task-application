import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
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
    check: boolean;
    task_Name: string;
    ideal_progress: string;
    real_progress: string;
    documentId: string;
}[];

type checkProps = {
    id: number;
    check: boolean;
}[];

function Task({ id, task_name, ideal_progress, real_progress, onRemoveClick }: TaskProps): JSX.Element {
    const [progress, setProgress] = useState<string>("0");
    const [input_state, setInput_state] = useState<Boolean>(false);
    const [selectedPost, setSelectedPost] = useState<DocumentDataProps>([]);
    const [checkData, setCheckData] = useState<number[]>([]);

    // コンポーネント内でのselectedPostの状態管理をuseEffectを使って行う
    useEffect(() => {
        const fetchData = async () => {
            const snapshot = await db.collection("tasks").get();

            const newSelectedPost = snapshot.docs.map((doc) => {
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

            setSelectedPost(newSelectedPost);
        };

        fetchData();
    }, [setInput_state]);

    const handleRemoveClick = () => {
        onRemoveClick(id);
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

    const check_event = async (e: number) => {
        if (checkData.includes(e)) {
            await setCheckData(checkData.filter((item) => item !== e));
            updateFirestore(id, false);
        } else {
            await setCheckData([...checkData, e]);
            updateFirestore(id, true);
        }
    };

    const updateFirestore = async (id: number, state: boolean) => {
        await Promise.all(
            selectedPost.map(async (post) => {
                console.log(id);
                console.log(post.id);
                console.log(post.documentId);
                if (id === post.id) {
                    db.collection("tasks").doc(post.documentId).update({
                        check: state,
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
                    checked={checkData.includes(id)}
                    onChange={() => check_event(id)}
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
                            onClick={() => setInput_state(true)}
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
