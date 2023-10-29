import "./App.css";
import Header from "./components/Header/Header";
import List from "./components/List/List";
import Taskmaker from "./components/List/Taskmaker";
import Timer from "./components/Timer/Timer";

function App() {
    return (
        <div className="App">
            <Header />

            <Taskmaker />

            <List />

            <Timer />
        </div>
    );
}

export default App;

//残り実装予定機能
//・進捗度の入力及びタスク作成を行った際にFirestoreからデータを取得し、画面の再表示を行う処理。
//・タスクとタイマー機能紐づけ
//・選択したタスク全体での進捗度表示機能
