import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import React from 'react';

import Dashboard from "./components/Dashboard.js";
import Login from "./components/Login.js"
import Welcome from "./components/Welcome.js";
import NotFound from "./components/NotFound.js"


function App() {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<Welcome/>}/>
                <Route path="/dashboard" element={<Dashboard/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </Router>
    );
}

export default App;