import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MyContext } from "./MyContext";
import { initialStatus } from "./data";

const UpdateAgent = () => {
  const initialValues = {
    name: "",
    id: "",
    status: "",
  };

  const [agent, setAgent] = useState(initialValues);
  const [data, setData] = useContext(MyContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const verif = initialStatus.includes(agent.status);
  const disabled = agent.name === "" || agent.id === "" || !verif;

  useEffect(() => {
    getAgentById();
  }, []);

  const getAgentById = async () => {
    const foundElement = data.find((element) => element.id === id);
    setAgent(foundElement);
  };

  const removeAgentWithId = (data, id) => {
    const IdIndex = data.findIndex((obj) => obj.id === id);
    if (IdIndex > -1) {
      data.splice(IdIndex, 1);
    }
    return data;
  };

  const updateAgent = async (e) => {
    e.preventDefault();
    try {
      const newData = removeAgentWithId(data, id);
      setData([...newData, agent]);
      navigate("/agents");
    } catch (error) {
      console.log(error);
    }
  };
  const selectSatus = initialStatus.map((st, idx) => {
    return (
      <option key={idx} value={st}>
        {st}
      </option>
    );
  });
  const handlChange = (e) => {
    setAgent({
      ...agent,
      id: id,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="create-agent">
      <form className="submit" onSubmit={updateAgent}>
        <label className="form-control form-control-sm"> ID: {agent.id}</label>
        <div className="input-group mb-2">
          <div className="input-group-text col-md-3 ">NAME</div>
          <input
            class="form-control text-center"
            type="text"
            aria-label="default input example"
            name="name"
            value={agent.name}
            placeholder="Update Name"
            onChange={handlChange}
          />
        </div>
        <div className="input-group mb-2">
          <div className="input-group-text col-md-3 ">STATUS</div>
          <select
            className="form-select form-control text-center"
            id="sel2"
            name="status"
            value={agent.status}
            onChange={handlChange}
          >
            {selectSatus}
          </select>
        </div>
        <button
          className="btn form-control btn-primary d-flex justify-content-center"
          type="submit"
          disabled={disabled}
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateAgent;
