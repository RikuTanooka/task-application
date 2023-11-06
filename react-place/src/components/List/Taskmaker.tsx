import { Button } from "@mui/material";
import { serverTimestamp } from "firebase/firestore";
import { useState } from "react";
import { getData } from "../../Firestoredata";
import db from "../../firebase";

type DocumentDataProps = {
    id: number;
    check: boolean;
    task_Name: string;
    ideal_progress: string;
    real_progress: string;
    documentId: string;
}[];

function Taskmaker() {
    const [input_state, setInput_state] = useState<Boolean>(false);
    const [task_name, setTask_name] = useState<string>("");
    const [selectedPost, setSelectedPost] = useState<DocumentDataProps>([]);

    const input_new_task = async () => {
        setInput_state(true);

        const Taskdata = await getData();

        if (Taskdata !== null) {
            await setSelectedPost(Taskdata);
        } else {
            console.log("selected tasks is empty");
        }
    };

    const output_new_task = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        setInput_state(false);

        if (selectedPost.length > 0) {
            await db.collection("tasks").add({
                taskId: selectedPost[0].id + 1,
                check: false,
                taskName: task_name,
                ideal_progress: 0,
                real_progress: 0,
                timestamp: serverTimestamp(),
            });
        } else {
            db.collection("tasks").add({
                taskId: 1,
                check: false,
                taskName: task_name,
                ideal_progress: 0,
                real_progress: 0,
                timestamp: serverTimestamp(),
            });
        }
    };

    return (
        <div>
            {input_state ? (
                <div>
                    新しいタスク名を入力してください:
                    <input
                        type="string"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTask_name(e.target.value)}
                    />
                    <br />
                    <Button
                        className="new_task"
                        variant="contained"
                        onClick={output_new_task}
                    >
                        入力完了
                    </Button>
                </div>
            ) : (
                <div>
                    <Button
                        className="new_task"
                        variant="contained"
                        onClick={input_new_task}
                    >
                        新規タスクの作成
                    </Button>
                </div>
            )}
        </div>
    );
}

export default Taskmaker;
