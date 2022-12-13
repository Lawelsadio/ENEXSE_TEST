import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import CreateAgent from "./component/CreateAgent";
import Footer from "./component/Footer";
import ListAgents from "./component/ListAgents";
import NavBar from "./component/NavBar";
import Status from "./component/Status";
import UpdateAgent from "./component/UpdateAgent";
import ErrorPage from "./component/ErrorPage";

function App() {
  return (
    <div className="App-container">
      <NavBar />
      <Routes>
        <Route exact path="/" element={<Status />} />
        <Route path="/agents" element={<ListAgents />} />
        <Route path="/agent" element={<CreateAgent />} />
        <Route path="/api/v1/:id" element={<UpdateAgent />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
