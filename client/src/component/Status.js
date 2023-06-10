import React, { useEffect, useState } from "react";
import MyLoader from "../MyLoader.js";
import MyComponent from "./MyComponent.js";
const baseURL = "http://localhost:4000/api/v1/agents";

function Status() {
  const [agentStatus, setAgentStatus] = useState([]);
  const [isDataLoading, setDataLoading] = useState([]);

  useEffect(() => {
    setDataLoading(true);
    getAgents();
    setDataLoading(false);
  }, []);

  const getAgents = async () => {
    fetch(baseURL).then((response) =>
      response
        .json()
        .then((stat) => {
          const data = stat;
          var totalAgent = 0;
          var disconnected = 0;
          var active = 0;
          var pending = 0;
          var never_connected = 0;

          const filteredData = data.filter((agent) => agent.id !== "000");
          totalAgent = filteredData.length;
          for (let i = 0; i < totalAgent; i++) {
            if (filteredData[i].status === "disconnected") {
              disconnected++;
            } else if (filteredData[i].status === "active") {
              active++;
            } else if (filteredData[i].status === "pending") {
              pending++;
            } else if (filteredData[i].status === "never_connected") {
              never_connected++;
            }
          }

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
          setAgentStatus(dataStutus);
          // return dataStutus;
        })
        .catch((error) => console.log(error))
    );
  };

  const newtest = isDataLoading ? (
    <MyLoader />
  ) : (
    agentStatus.map((data, idx) => {
      return (
        <div key={idx} className="card">
          <div className="card-body">
            <p className="card-text">{data.name}</p>
            <h4 style={{ color: data.color }}>{data.value}</h4>
          </div>
        </div>
      );
    })
  );

  return (
    <div className="status-container">
      <MyComponent />
    </div>
  );
}

export default Status;
