import { Button } from "@mui/material";
import "./App.css";
import Header from "./components/Header/Header";
import List from "./components/List/List";
import Timer from "./components/Timer/Timer";

function App() {
    return (
        <div className="App">
            <Header />

            <Button variant="contained">新規タスクの作成</Button>

            <List />

            <Timer />
        </div>
    );
}

export default App;
