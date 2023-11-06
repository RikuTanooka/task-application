import db from "./firebase";

// データの取得
export async function getData() {
    try {
        const taskData = db.collection("tasks");
        const quarySnapshot = await taskData.orderBy("timestamp", "desc").get();
        if (!quarySnapshot.empty) {
            return quarySnapshot.docs.map((doc) => {
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
        } else {
            console.log("Document not found.");
            return null;
        }
    } catch (error) {
        console.error("Error getting document: ", error);
        return null;
    }
}
