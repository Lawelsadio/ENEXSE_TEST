import "./App.css";
import React, { useState, useRef } from "react";
import { Routes, Route } from "react-router-dom";
import CreateAgent from "./component/CreateAgent";
import Footer from "./component/Footer";
import ListAgents from "./component/ListAgents";
import NavBar from "./component/NavBar";
import Status from "./component/Status";
import UpdateAgent from "./component/UpdateAgent";
import ErrorPage from "./component/ErrorPage";
import MyComponent from "./component/MyComponent.js";
import Auto from "./component/Auto.js";
import { data } from "./component/autoData";
import AutoReview from "./component/AutoRevew.js";
import { AutoContext } from "./component/contexte.js";
import CodeTest from "./component/CodeTest.js";
import TestCode from "./component/TestCode.js";
import Accueil from "./component/Accueil.js";
import Code from "./component/Code.js";
import { dataa } from "./Data.js";
import Recapitulatif from "./component/Recapitulatif.js";

/*
<Route exact path="/" element={<MyComponent />} />
        <Route path="/agents" element={<ListAgents />} />
        <Route path="/agent" element={<CreateAgent />} />
        <Route path="/api/v1/:id" element={<UpdateAgent />} />
*/
function App() {
  const [currentSerieIndex, setCurrentSerieIndex] = useState(0);
  const [globalAnswer, setGlobalAnswer] = useState([]);

  return (
    <div className="App-container">
      <AutoContext.Provider
        value={{
          currentSerieIndex,
          setCurrentSerieIndex,
          globalAnswer,
          setGlobalAnswer,
        }}
      >
        <NavBar />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#999999",
            width: "80%",
            alignContent: "center",
            flexGrow: 1,
          }}
        >
          <Routes>
            <Route exact path="/" element={<Accueil />} />
            <Route exact path="/code" element={<Code />} />
            <Route exact path="/code/examen" element={<Auto data={data} />} />
            <Route exact path="/codetest" element={<CodeTest data={data} />} />
            <Route path="/testCode" element={<TestCode data={dataa} />} />
            <Route path="/autoreview" element={<AutoReview />} />
            <Route path="/recapitulatif" element={<Recapitulatif />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </div>
        <Footer />
      </AutoContext.Provider>
    </div>
  );
}

export default App;
