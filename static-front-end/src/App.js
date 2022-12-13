import "./App.css";
import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import CreateAgent from "./component/CreateAgent";
import Footer from "./component/Footer";
import ListAgents from "./component/ListAgents";
import NavBar from "./component/NavBar";
import Status from "./component/Status";
import UpdateAgent from "./component/UpdateAgent";
import ErrorPage from "./component/ErrorPage";
import { MyContext } from "./component/MyContext";
import { myData } from "./component/data";

function App() {
  const dt = myData;
  const [data, setData] = useState(dt);

  return (
    <MyContext.Provider value={[data, setData]}>
      <div className="App-container">
        <NavBar />
        <Routes>
          <Route exact path="/" element={<Status />} />
          <Route path="/agents" element={<ListAgents />} />
          <Route path="/agent" element={<CreateAgent />} />
          <Route path="/agent/:id" element={<UpdateAgent />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
        <Footer />
      </div>
    </MyContext.Provider>
  );
}

export default App;
