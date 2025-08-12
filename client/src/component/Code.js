import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AutoContext } from "./contexte.js";
import voiture from "../images/voiture.png";

function Series() {
  const navigate = useNavigate();
  const { setCurrentSerieIndex, setGlobalAnswer } = useContext(AutoContext);

  useEffect(() => {
    setCurrentSerieIndex(0);
    setGlobalAnswer([]);
  }, [setCurrentSerieIndex, setGlobalAnswer]);
  const [seriData, setSeriData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchLevels() {
      try {
        const res = await fetch("http://localhost:4000/api/v1/series");
        if (!res.ok) {
          setError(`HTTP ${res.status}`);
          setSeriData([]);
          return;
        }
        const data = await res.json();
        setSeriData(Array.isArray(data) ? data : []);
      } catch (e) {
        console.error(e);
        setError(String(e));
        setSeriData([]);
      } finally {
        setLoading(false);
      }
    }
    fetchLevels();
  }, []);

  const showLevels = seriData.map((level, idx) => {
    return (
      <div
        className="card levelhover"
        key={idx}
        style={{
          width: "49%",
          margin: "0px",
          marginTop: "5px",
          height: "58px",
          overflow: "hidden",
          padding: "15px",
          textAlign: "center",
          cursor: "pointer",
        }}
        onClick={() => handleClick(level.level || level.serieLevel)}
      >
        <h5>
          <b>{level.level || level.serieLevel}</b>
        </h5>
      </div>
    );
  });
  const handleClick = (level) => {
    const queryString = new URLSearchParams({ level }).toString();
    navigate(`/testCode?${queryString}`);
  };
  if (loading) {
    return (
      <div
        style={{
          backgroundColor: "#edeceb",
          width: "80%",
          alignContent: "center",
          flexGrow: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: 400,
        }}
      >
        Chargement des séries…
      </div>
    );
  }
  if (error) {
    return (
      <div style={{ padding: 20, color: "#900" }}>
        Erreur de chargement des séries: {error}. Assure-toi que le serveur tourne
        et que la route /api/v1/series est disponible.
      </div>
    );
  }
  return (
    <div
      style={{
        backgroundColor: "#edeceb",
        backgroundImage: `url(${voiture})`,
        height: "700px" /* You must set a specified height */,
        backgroundPosition: "center" /* Center the image */,
        backgroundRepeat: "no-repeat" /* Do not repeat the image */,
        backgroundSize:
          "100%" /* Resize the background image to cover the entire container */,
        width: "80%",
        alignContent: "center",
        flexGrow: 1,
      }}
    >
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          margin: "20px",
          marginBottom: "0px",
          marginTop: "0px",
          alignItems: "center",
          height: "100%",
        }}
      >
        <div className="card" style={{ width: "50%", height: "15%" }}>
          Accroche
        </div>
        <h5 style={{ marginTop: "0px" }}>Séries B (26 questions par Series)</h5>
        <div
          className="card"
          style={{
            width: "50%",
            backgroundColor: "transparent",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            flexWrap: "wrap",
            padding: "5px",
            overflow: "hidden",
            flexGrow: 1,
          }}
        >
          {showLevels}
        </div>
      </div>
    </div>
  );
}

export default Series;
