import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { initialStatus } from "./data";

const UpdateAgent = () => {
  const initialValues = {
    name: "",
    id: "",
  };

  const [agent, setAgent] = useState(initialValues);
  const verif = initialStatus.includes(agent.status);
  const disabled = agent.name === "" || agent.id === "" || !verif;
  const navigate = useNavigate();
  const { id } = useParams();
  const baseURL = `http://localhost:4000/api/v1/${id}`;

  useEffect(() => {
    getAgentById();
  }, []);

  const getAgentById = async () => {
    const response = await axios.get(baseURL);
    setAgent(response.data);
  };

  const updateAgent = async (e) => {
    e.preventDefault();
    try {
      await axios.put(baseURL, {
        ...agent,
      });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handlChange = (e) => {
    setAgent({
      ...agent,
      [e.target.name]: e.target.value,
    });
  };
  const selectSatus = initialStatus.map((st, idx) => {
    return (
      <option key={idx} value={st}>
        {st}
      </option>
    );
  });

  return (
    <div className="create-agent">
      <form className="submit" onSubmit={updateAgent}>
        <label class="form-control form-control-sm"> ID: {agent.id}</label>
        <div class="input-group mb-2">
          <div class="input-group-text col-md-3 ">NAME</div>
          <input
            class="form-control"
            type="text"
            aria-label="default input example"
            name="name"
            value={agent.name}
            placeholder="Add a Name"
            onChange={handlChange}
          />
        </div>
        <div class="input-group mb-2">
          <div class="input-group-text col-md-3 ">STATUS</div>
          <select
            className="form-select form-control align-center"
            id="sel2"
            name="status"
            value={agent.status}
            onChange={handlChange}
          >
            <option> SELECT </option>

            {selectSatus}
          </select>
        </div>
        <button
          className="btn form-control btn-primary d-flex justify-content-center"
          type="submit"
          disabled={disabled}
        >
          UPDATE
        </button>
      </form>
    </div>
  );
};

export default UpdateAgent;
