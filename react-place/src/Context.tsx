import React, { createContext, useContext, useState } from "react";

type DocumentDataProps = {
    id: number;
    task_Name: string;
    ideal_progress: string;
    real_progress: string;
    documentId: string;
}[];

type SelectedPostContextType = {
    selectedPost: DocumentDataProps;
    setSelectedPost: React.Dispatch<React.SetStateAction<DocumentDataProps>>;
};

const SelectedPostContext = createContext<SelectedPostContextType | undefined>(undefined);

export function useSelectedPost() {
    const context = useContext(SelectedPostContext);
    if (context === undefined) {
        throw new Error("useSelectedPost must be used within a SelectedPostProvider");
    }
    return context;
}

export function TaskProvider({ children }: { children: React.ReactNode }) {
    const [selectedPost, setSelectedPost] = useState<DocumentDataProps>([]);

    return (
        <SelectedPostContext.Provider value={{ selectedPost, setSelectedPost }}>
            {children}
        </SelectedPostContext.Provider>
    );
}

/*
type DocumentDataProps = {
    id: number;
    task_Name: string;
    ideal_progress: string;
    real_progress: string;
    documentId: string;
}[];

//タスクデータに関するコンテキスト作成
const TaskDataContect = createContext<DocumentDataProps>([]);

//カスタムフックを使用してコンテキストを使用
export function useTaskData() {
    return useContext(TaskDataContect);
}

export default function TaskDataProvider({ children }: { children: React.ReactNode }) {
    //タスクデータを管理
    const [taskData, setTaskData] = useState([]);

    //タスクデータを更新する関数
    const updateTaskData = (newData: DocumentDataProps) => {
        setTaskData(newData);
    };

    //コンテキストの値
    const contextValue = {
        taskData,
        updateTaskData,
    };

    return <TaskDataContect.Provider value={contextValue}>{children}</TaskDataContect.Provider>;
}
*/
