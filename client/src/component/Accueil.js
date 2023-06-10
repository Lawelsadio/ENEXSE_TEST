import React from "react";
import voiture from "../images/voiture.png";

function Accueil() {
  return (
    <div
      style={{
        width: "100%",
        flexGrow: 1,
        backgroundColor: "#edeceb",
        color: "green",
        backgroundImage: `url(${voiture})`,
        height: "700px" /* You must set a specified height */,
        backgroundPosition: "center" /* Center the image */,
        backgroundRepeat: "no-repeat" /* Do not repeat the image */,
        backgroundSize:
          "100%" /* Resize the background image to cover the entire container */,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        padding: "15px",
        paddingInline: "50px",
      }}
    >
      <h1>Code de la route gratuit</h1>
      <h3>Vous aimez quand c'est gratuit ? Nous aussi.</h3>
      <button type="button" className="btn btn-outline-success">
        Button
      </button>
    </div>
  );
}

export default Accueil;
