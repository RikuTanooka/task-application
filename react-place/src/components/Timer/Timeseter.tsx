import { Button } from "@mui/material";
import { useState } from "react";

function Timeseter() {
    const [input_state, setInput_state] = useState<Boolean>(false);
    return (
        <div>
            {input_state ? (
                <div>
                    【時:分:秒】を入力してください
                    <br />
                    <input type="number" />
                    :
                    <input
                        type="number"
                        min="0"
                        max="59"
                    />
                    :
                    <input
                        type="number"
                        min="0"
                        max="59"
                    />
                    <br />
                    <Button
                        className="new_timer"
                        variant="contained"
                        onClick={() => setInput_state(false)}
                    >
                        入力完了
                    </Button>
                </div>
            ) : (
                <div>
                    <Button
                        className="new_task"
                        variant="contained"
                        onClick={() => setInput_state(true)}
                    >
                        タイマーの時間設定
                    </Button>
                </div>
            )}
        </div>
    );
}

export default Timeseter;
