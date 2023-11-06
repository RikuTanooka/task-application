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
//・選択したタスク全体での進捗度表示機能
//ローカルでのデータ保存も考える。

//checkの値がtrueのもの×100の値を保持するuseStateを作る。
//おそらくHeader.tsxで情報取得して、Real_progress/(trueのもの * 100)にする？要改良かも
//上2行の動作確認をする。あと何を発端としてデータ取得を行うか考える。
//それらのデータ初期化をいつ、どう行うかを考えて実装する
//「ideal_progress」の初期化もいつ、どう行うかを考えて実装する
