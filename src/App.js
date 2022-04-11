import React from 'react'
import './style.scss'
import Header from "./components/Header/Header";
import Overlay from "./components/Overlay/Overlay";
import Trainers from "./components/Trainers/Trainers";
import Search from "./components/Search/Search";

function App() {


    return (
        <div className="App">
            <Overlay/>
            <div className="container">
                <Header/>
                <Search/>
                <Trainers/>
            </div>
        </div>
    );
}

export default App;
