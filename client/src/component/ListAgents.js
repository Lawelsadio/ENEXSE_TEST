import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { RiEditBoxLine } from "react-icons/ri";
import { BsFillTrashFill } from "react-icons/bs";
import MyLoader from "../MyLoader.js";

const baseURL = "http://localhost:4000/api/v1/agents";

function ListAgents() {
  const [listeAgents, setListeAgents] = useState([]);
  const [isDataLoading, setDataLoading] = useState([]);

  useEffect(() => {
    getAgents();
  }, []);

  const getAgents = async () => {
    setDataLoading(true);
    try {
      const response = await fetch(baseURL);
      const AgentsList = await response.json();
      setListeAgents(AgentsList);
    } catch (err) {
      console.log(err);
    } finally {
      setDataLoading(false);
    }
  };

  const deleteAgent = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/v1/agents/${id}`);
      getAgents();
    } catch (error) {
      console.log(error);
    }
  };

  const myList = listeAgents.map((item) => {
    return (
      <tr key={item._id}>
        <td>{item.name}</td>
        <td>{item.status}</td>
        <td>
          <NavLink
            to={`/api/v1/${item._id}`}
            className="button is-info is-small mr-1"
          >
            <RiEditBoxLine
              style={{
                fontSize: 50,
                color: "grey",
              }}
            />
          </NavLink>

          <button
            onClick={() => deleteAgent(item._id)}
            className="button is-danger is-small"
          >
            <BsFillTrashFill
              style={{
                fontSize: 35,
                color: "red",
              }}
            />
          </button>
        </td>
      </tr>
    );
  });

  const affichage = isDataLoading ? (
    <MyLoader />
  ) : (
    <>
      <h1 className="mb-5">Liste des Agents</h1>
      <div className="table-responsive text-center t-width">
        <table
          className="table table-striped
      table-hover	
      table-borderless
      table-bordered
      align-middle"
        >
          <thead className="table-light">
            <tr>
              <th>NAME</th>
              <th>STATUS</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="table-group-divider">{myList}</tbody>
        </table>
      </div>
    </>
  );

  return (
    <div className="list-agents">
      <h1 className="mb-5">Liste des Agents</h1>
      {affichage}
    </div>
  );
}

export default ListAgents;
