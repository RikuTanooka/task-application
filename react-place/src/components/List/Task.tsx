import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Button } from "@mui/material";
import "./Task.css";

type TaskProps = {
    id: string;
    task_name: string;
    ideal_progress: number;
    real_progress: number;
    onRemoveClick: Function;
};

function Task({ id, task_name, ideal_progress, real_progress, onRemoveClick }: TaskProps): JSX.Element {
    const handleRemoveClick = () => {
        onRemoveClick(id);
    };

    const input_real_progress = () => {};
    return (
        <div className="task">
            <label>
                <input
                    id={id}
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
                現在の進捗:{real_progress}%
                <br />
                <Button
                    className="progress"
                    variant="contained"
                    onClick={input_real_progress}
                >
                    進捗度の入力
                </Button>
            </label>
        </div>
    );
}

export default Task;
