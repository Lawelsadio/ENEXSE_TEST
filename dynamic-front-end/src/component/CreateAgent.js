import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { initialStatus } from "./data";

const baseURL = "http://localhost:4000/api/v1/agent";
const CreateAgent = () => {
  const initialValues = {
    name: "",
    id: "",
  };
  const [agent, setAgent] = useState(initialValues);
  const navigate = useNavigate();
  const verif = initialStatus.includes(agent.status);
  const disabled = agent.name === "" || agent.id === "" || !verif;

  const saveAgent = async (e) => {
    e.preventDefault();
    try {
      await axios.post(baseURL, {
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
      <form className="submit" onSubmit={saveAgent}>
        <div class="input-group mb-2">
          <div class="input-group-text col-md-3 text-center">ID</div>
          <input
            class="form-control text-center "
            type="number"
            aria-label="default input example"
            name="id"
            min="0"
            step="1"
            data-bind="value:replyNumber"
            placeholder="Ad registration number"
            onChange={handlChange}
          />
        </div>
        <div class="input-group mb-2">
          <div class="input-group-text col-md-3 text-center">NAME</div>
          <input
            class="form-control text-center"
            type="text"
            aria-label="default input example"
            name="name"
            placeholder="Add a Name"
            onChange={handlChange}
          />
        </div>
        <div class="input-group mb-2">
          <div class="input-group-text col-md-3 text-center">STATUS</div>
          <select
            className="form-select form-control"
            id="status"
            name="status"
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
          Add
        </button>
      </form>
    </div>
  );
};
export default CreateAgent;
