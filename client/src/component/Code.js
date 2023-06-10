import React, { useState, useContext, useEffect } from "react";
import { dataa } from "../Data.js";
import { useNavigate } from "react-router-dom";
import { AutoContext } from "./contexte.js";
import voiture from "../images/voiture.png";

console.log("dataa", dataa[0].serie_b);
function Series() {
  const series = [
    "un",
    "deux",
    "trois",
    "quatre",
    "cinq",
    "six",
    "sept",
    "huite",
    "neuf",
    "dix",
    "ounze",
    "douze",
  ];

  const result = series.map((serie) => {
    return {
      serieLevel: serie,
      serieData: dataa[0].serie_b[serie],
    };
  });
  const navigate = useNavigate();
  const { setCurrentSerieIndex, setGlobalAnswer } = useContext(AutoContext);

  useEffect(() => {
    setCurrentSerieIndex(0);
    setGlobalAnswer([]);
  }, []);
  const [seriData, setSeriData] = useState(result);
  console.log("seriData", seriData);
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
        onClick={() => handleClick(level.serieLevel)}
      >
        <h5>
          <b>{level.serieLevel}</b>
        </h5>
      </div>
    );
  });
  const handleClick = (level) => {
    const queryString = new URLSearchParams({ level }).toString();
    navigate(`/testCode?${queryString}`);
  };
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
