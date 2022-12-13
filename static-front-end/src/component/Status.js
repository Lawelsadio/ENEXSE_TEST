import React, { useEffect, useState, useContext } from "react";
import { MyContext } from "./MyContext";

function Status() {
  const [data, setData] = useContext(MyContext);
  const [active, setActive] = useState(0);
  const [disconnected, setDisconnected] = useState(0);
  const [pending, setPending] = useState(0);
  const [never_connected, setNever_connected] = useState(0);
  const [totalAgent, setTotalAgent] = useState(0);

  useEffect(() => {
    agentStatus(data);
  }, []);

  const agentStatus = (data) => {
    var totalAgent = 0;
    var disconnected = 0;
    var active = 0;
    var pending = 0;
    var never_connected = 0;
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
    setActive(active);
    setDisconnected(disconnected);
    setPending(pending);
    setNever_connected(never_connected);
    setTotalAgent(totalAgent);
  };

  return (
    <div className="status-container">
      <div className="wrapper">
        <div className="card">
          <div className="card-body">
            <p className="card-text">Total Agents</p>
            <h4 className="card-total">{totalAgent}</h4>
          </div>
        </div>
        <div className="card">
          <div className="card-body">
            <p className="card-text">Actve agents</p>
            <h4 className="card-active">{active}</h4>
          </div>
        </div>
        <div className="card">
          <div className="card-body">
            <p className="card-text">Disconnected agents</p>
            <h4 className="card-disconnected">{disconnected}</h4>
          </div>
        </div>
        <div className="card">
          <div className="card-body">
            <p className="card-text">Pending Agents</p>
            <h4 className="card-pending">{pending}</h4>
          </div>
        </div>
        <div className="card">
          <div className="card-body">
            <p className="card-text">Never connected Agents</p>
            <h4 className="card-never_connected">{never_connected}</h4>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Status;
