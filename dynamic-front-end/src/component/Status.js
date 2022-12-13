import React, { useEffect, useState } from "react";
import axios from "axios";

const baseURL = "http://localhost:4000/api/v1/agents";

function Status() {
  const [active, setActive] = useState(0);
  const [disconnected, setDisconnected] = useState(0);
  const [pending, setPending] = useState(0);
  const [never_connected, setNever_connected] = useState(0);
  const [totalAgent, setTotalAgent] = useState(0);

  useEffect(() => {
    getAgents();
  }, []);

  const getAgents = async () => {
    const response = await axios.get(baseURL);
    const data = response.data;
    var totalAgent = 0;
    var disconnected = 0;
    var active = 0;
    var pending = 0;
    var never_connected = 0;
    const dts = data.filter((agent) => agent.id !== "000");

    for (let i = 0; i < dts.length; i++) {
      if (dts[i].status === "disconnected") {
        disconnected++;
      } else if (dts[i].status === "active") {
        active++;
      } else if (dts[i].status === "pending") {
        pending++;
      } else if (dts[i].status === "never_connected") {
        never_connected++;
      }
    }
    totalAgent = disconnected + active + pending + never_connected;
    setActive(active);
    setDisconnected(disconnected);
    setPending(pending);
    setNever_connected(never_connected);
    setTotalAgent(totalAgent);
  };

  return (
    <div
      style={{
        display: "flex",
        flexGrow: "1",
        alignItems: "center",
        margin: "20px",
        justifyContent: "center",
      }}
    >
      <div
        style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
      >
        <div className="card" style={{ width: "250px", margin: "7px" }}>
          <div className="card-body">
            <p className="card-text">Total Agents</p>
            <h4 className="card-title" style={{ color: "rgb(0, 107, 180)" }}>
              {totalAgent}
            </h4>
          </div>
        </div>
        <div className="card" style={{ width: "250px", margin: "7px" }}>
          <div className="card-body">
            <p className="card-text">Actve agents</p>
            <h4 className="card-title" style={{ color: "rgb(0, 120, 113)" }}>
              {active}
            </h4>
          </div>
        </div>
        <div className="card" style={{ width: "250px", margin: "7px" }}>
          <div className="card-body">
            <p className="card-text">Disconnected agents</p>
            <h4 className="card-title" style={{ color: "rgb(189, 39, 30)" }}>
              {disconnected}
            </h4>
          </div>
        </div>
        <div className="card" style={{ width: "250px", margin: "7px" }}>
          <div className="card-body">
            <p className="card-text">Pending Agents</p>
            <h4 className="card-title" style={{ color: "rgb(254, 197, 20)" }}>
              {pending}
            </h4>
          </div>
        </div>
        <div className="card" style={{ width: "250px", margin: "7px" }}>
          <div className="card-body">
            <p className="card-text">Never connected Agents</p>
            <h4 className="card-title" style={{ color: "rgb(100, 106, 119)" }}>
              {never_connected}
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Status;
