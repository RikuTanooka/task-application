import { Button } from "@mui/base";
import { useEffect, useRef, useState } from "react";
import { getData } from "../../Firestoredata";
import db from "../../firebase";
import "./Timer.css";

type DocumentDataProps = {
    id: number;
    check: boolean;
    task_Name: string;
    ideal_progress: string;
    real_progress: string;
    documentId: string;
}[];

function Timer() {
    const [h_count, set_h_Count] = useState(0);
    const [m_count, set_m_Count] = useState(1);
    const [s_count, set_s_Count] = useState(40);

    const [dis_h_count, set_dis_h_Count] = useState<string>("00");
    const [dis_m_count, set_dis_m_Count] = useState<string>("01");
    const [dis_s_count, set_dis_s_Count] = useState<string>("40");

    const [isRunning, setIsRunning] = useState(false);

    const [input_state, setInput_state] = useState<Boolean>(false);

    const intervalIdRef = useRef<NodeJS.Timeout | null>(null);

    //分子
    const [molecule, setmolecule] = useState(0);
    //分母
    const [denominator, setDenominator] = useState(0);
    //タスクの中身
    const [checkedTask, setcheckedTask] = useState<DocumentDataProps>([]);

    const reset = () => {
        set_h_Count(0);
        set_m_Count(0);
        set_s_Count(0);
        set_dis_h_Count("00");
        set_dis_m_Count("00");
        set_dis_s_Count("00");
        setIsRunning(false);
        setmolecule(0);
    };

    const tick = () => {
        setmolecule(molecule + 1);
        if (dis_s_count !== "00") {
            let sn = s_count - 1;
            set_s_Count(sn);
            set_dis_s_Count(getdoubleDigestNumer(sn));
        } else if (dis_m_count !== "00") {
            let mn = m_count - 1;
            set_m_Count(mn);
            set_dis_m_Count(getdoubleDigestNumer(mn));

            set_s_Count(59);
            set_dis_s_Count("59");
        } else if (dis_h_count !== "00") {
            let hn = h_count - 1;
            set_h_Count(hn);
            set_dis_h_Count(getdoubleDigestNumer(hn));

            set_m_Count(59);
            set_dis_m_Count("59");

            set_s_Count(59);
            set_dis_s_Count("59");
        } else setIsRunning(false);
    };

    const getdoubleDigestNumer = (n: number) => {
        return n >= 10 ? String(n) : `0${n}`;
    };

    const hour_value_set = (e: string) => {
        set_h_Count(parseInt(e));
        set_dis_h_Count(getdoubleDigestNumer(parseInt(e)));
    };

    const minute_value_set = (e: string) => {
        set_m_Count(parseInt(e));
        set_dis_m_Count(getdoubleDigestNumer(parseInt(e)));
    };

    const seconds_value_set = (e: string) => {
        set_s_Count(parseInt(e));
        set_dis_s_Count(getdoubleDigestNumer(parseInt(e)));
    };

    const start = () => {
        if (!isRunning) {
            setDenominator(h_count * 3600 + m_count * 60 + s_count);
        }
        setIsRunning(true);
        console.log(denominator, molecule);
    };

    useEffect(() => {
        const fetchData = async () => {
            const Taskdata = await getData();

            if (Taskdata !== null) {
                await setcheckedTask(Taskdata);
            } else {
                console.log("selected tasks is empty");
            }
        };

        fetchData();

        if (isRunning) {
            intervalIdRef.current = setInterval(() => {
                tick();
                checkedTask.map(async (post) => {
                    console.log(post.id);
                    console.log(post.documentId);
                    if (post.check) {
                        db.collection("tasks")
                            .doc(post.documentId)
                            .update({
                                ideal_progress: parseFloat(((molecule / denominator) * 100).toFixed(1)),
                            });
                    }
                });
            }, 1000);
        } else {
            if (intervalIdRef.current) {
                clearInterval(intervalIdRef.current);
                intervalIdRef.current = null;
            }
        }

        return () => {
            if (intervalIdRef.current) {
                clearInterval(intervalIdRef.current);
                intervalIdRef.current = null;
            }
        };
    }, [isRunning, s_count]);

    return (
        <div className="timer">
            <div className="timer__header">タイマー</div>
            <div className="timer__timer">
                <div>
                    {input_state ? (
                        <div>
                            【時:分:秒】を入力してください
                            <br />
                            <input
                                type="number"
                                min="0"
                                value={h_count}
                                onChange={(e) => hour_value_set(e.target.value)}
                            />
                            :
                            <input
                                type="number"
                                min="0"
                                max="59"
                                value={m_count}
                                onChange={(e) => minute_value_set(e.target.value)}
                            />
                            :
                            <input
                                type="number"
                                min="0"
                                max="59"
                                value={s_count}
                                onChange={(e) => seconds_value_set(e.target.value)}
                            />
                            <br />
                            <Button
                                className="new_timer"
                                onClick={() => setInput_state(false)}
                            >
                                入力完了
                            </Button>
                        </div>
                    ) : (
                        <div>
                            {dis_h_count}:{dis_m_count}:{dis_s_count}
                            <br />
                            <Button
                                className="new_task"
                                onClick={() => setInput_state(true)}
                            >
                                タイマーの時間設定
                            </Button>
                        </div>
                    )}
                </div>
            </div>
            <div>
                <Button
                    className="button"
                    onClick={start}
                >
                    Start
                </Button>
                <Button
                    className="button"
                    onClick={() => setIsRunning(false)}
                >
                    Stop
                </Button>
                <Button
                    className="button"
                    onClick={reset}
                >
                    Reset
                </Button>
            </div>
        </div>
    );
}

export default Timer;
