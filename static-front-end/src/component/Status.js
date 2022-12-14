import React, { useEffect, useState, useContext } from "react";
import { MyContext } from "./MyContext";

function Status() {
  const [data] = useContext(MyContext);
  const [status, setSatus] = useState([]);

  useEffect(() => {
    const statusData = agentStatus(data);
    setSatus(statusData);
  }, []);

  const agentStatus = (data) => {
    var totalAgent = 0;
    var active = 0;
    var pending = 0;
    var never_connected = 0;
    var disconnected = 0;

    const dts = data.filter((person) => person.id !== "000");

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
    var dataStutus = [
      {
        name: "Total Agents",
        value: totalAgent,
        color: "rgb(0, 107, 180)",
      },
      {
        name: "Active Agents",
        value: active,
        color: "rgb(0, 120, 113)",
      },
      {
        name: "Pending Agents",
        value: pending,
        color: "rgb(254, 197, 20)",
      },
      {
        name: "Disconnected Agents",
        value: disconnected,
        color: "rgb(189, 39, 30)",
      },
      {
        name: "Never connected Agents",
        value: never_connected,
        color: "rgb(100, 106, 119)",
      },
    ];
    return dataStutus;
  };

  const newStatus = status.map((data, idx) => {
    return (
      <div key={idx} className="card">
        <div className="card-body">
          <p className="card-text">{data.name}</p>
          <h4 style={{ color: data.color }}>{data.value}</h4>
        </div>
      </div>
    );
  });

  return (
    <div className="status-container">
      <div className="wrapper">{newStatus}</div>
    </div>
  );
}

export default Status;
