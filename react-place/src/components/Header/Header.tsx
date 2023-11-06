import { useEffect, useState } from "react";
import { getData } from "../../Firestoredata";
import "./Header.css";

type DocumentDataProps = {
    id: number;
    check: boolean;
    task_Name: string;
    ideal_progress: string;
    real_progress: string;
    documentId: string;
}[];

function Header() {
    const [tasks, setTasks] = useState<DocumentDataProps>([]);
    const [selectedTaskNum, setSelectedTaskNum] = useState<number>(0);
    const [allper, setAllper] = useState<number>(0);
    const [ave, setAve] = useState<number>(0);

    const set_totalData = async () => {
        const data = await getData();
        await setSelectedTaskNum(0);
        await setAllper(0);

        if (data !== null) {
            await setTasks(data);
        } else {
            console.log("selected tasks is empty");
        }

        tasks.map(async (task) => {
            if (task.check) {
                await setSelectedTaskNum(selectedTaskNum + 1);
                console.log(selectedTaskNum);
                await setAllper(allper + Number(task.real_progress));
                console.log(allper);
            }
        });

        await setAve(parseFloat((allper / (selectedTaskNum * 100)).toFixed(1)));
    };

    useEffect(() => {
        set_totalData();
    }, []);

    return (
        <div className="header">
            <h2>選択したタスク全体での進捗度は「{ave}%」です</h2>
        </div>
    );
}

export default Header;
