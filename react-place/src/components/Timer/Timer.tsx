import { Button } from "@mui/base";
import { useEffect, useRef, useState } from "react";
import "./Timer.css";

function Timer() {
    const [h_count, set_h_Count] = useState(5);
    const [m_count, set_m_Count] = useState(0);
    const [s_count, set_s_Count] = useState(10);

    const [dis_h_count, set_dis_h_Count] = useState<string>("05");
    const [dis_m_count, set_dis_m_Count] = useState<string>("00");
    const [dis_s_count, set_dis_s_Count] = useState<string>("10");

    const [isRunning, setIsRunning] = useState(false);

    const intervalIdRef = useRef<NodeJS.Timeout | null>(null);
    const start = () => {
        setIsRunning(true);
    };

    const stop = () => {
        setIsRunning(false);
    };

    const reset = () => {
        set_h_Count(0);
        set_m_Count(0);
        set_s_Count(0);
        set_dis_h_Count("00");
        set_dis_m_Count("00");
        set_dis_s_Count("00");
        setIsRunning(false);
    };

    const tick = () => {
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

    useEffect(() => {
        if (isRunning) {
            intervalIdRef.current = setInterval(() => {
                tick();
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
                {dis_h_count}:{dis_m_count}:{dis_s_count}
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
                    onClick={stop}
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
