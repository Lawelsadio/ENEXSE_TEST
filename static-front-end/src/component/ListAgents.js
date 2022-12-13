import React, { useEffect, useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import { RiEditBoxLine } from "react-icons/ri";
import { BsFillTrashFill } from "react-icons/bs";
import { MyContext } from "./MyContext";
import { useNavigate } from "react-router-dom";

function ListAgents() {
  const navigate = useNavigate();
  const [data, setData] = useContext(MyContext);
  const [listeAgents, setListeAgents] = useState([]);
  useEffect(() => {
    getAgents();
  }, []);

  const getAgents = () => {
    setListeAgents(data);
  };

  const deleteAgent = (arr, id) => {
    const objWithIdIndex = arr.findIndex((obj) => obj.id === id);
    if (objWithIdIndex > -1) {
      arr.splice(objWithIdIndex, 1);
      setData(arr);
      navigate("/agents");
    }
  };

  const myList = listeAgents.map((item) => {
    return (
      <tr key={item.id}>
        <td>{item.name}</td>
        <td>{item.id}</td>
        <td>{item.status}</td>
        <td>
          <NavLink
            to={`/agent/${item.id}`}
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
            onClick={() => deleteAgent(data, item.id)}
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

  return (
    <div className="list-agents">
      <h1 className="mb-5">Liste des Agents</h1>
      <div className="table-responsive t-width">
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
              <th>id</th>
              <th>STATUS</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="table-group-divider">{myList}</tbody>
        </table>
      </div>
    </div>
  );
}

export default ListAgents;
