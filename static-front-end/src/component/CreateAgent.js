import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { initialStatus } from "./data";
import { MyContext } from "./MyContext";
const CreateAgent = () => {
  const initialValues = {
    name: "",
    id: "",
    status: "",
  };
  const [agent, setAgent] = useState(initialValues);
  const [data, setData] = useContext(MyContext);

  const verif = initialStatus.includes(agent.status);
  const disabled = agent.name === "" || agent.id === "" || !verif;

  const navigate = useNavigate();
  const saveAgent = async (e) => {
    e.preventDefault();
    try {
      setData([...data, agent]);
      navigate("/agents");
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
          <div class="input-group-text col-md-3 ">ID</div>
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
          <div class="input-group-text col-md-3 ">NAME</div>
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
          <div class="input-group-text col-md-3 ">STATUS</div>
          <select
            className="form-select form-control text-center"
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
