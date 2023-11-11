import React, { useEffect, useState } from "react";
import "./CreateData.css";
import { handleGetData } from "../dataTable/DataTable";

const CreateData = (props) => {
    // props
    const {setProgressStatus} = props

    // state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    salary: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setProgressStatus(20)

    // add data to database
    fetch(`${process.env.REACT_APP_API_KEY}/employees_data.json`, {
      method: "POST",
      "Content-Type": "application/json",
      body: JSON.stringify(formData),
    })
      .then((res) => {
        if (res.status === 200) {
          // call get function to show updated data
          handleGetData();

          // Reset the form fields
          setFormData({
            name: "",
            email: "",
            salary: "",
          });
        }
      })
      .catch((err) => {
        alert(err);
      })
      .finally(() => {
        setProgressStatus(100)

        setTimeout(() => {
            setProgressStatus(0)
        }, 700);
      });
  };

  return (
    <div className="create-data-container">
      <div className="centered-content">
        <h1>Add New Data</h1>
        <form className="create-data-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name : </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email : </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="salary">Salary : </label>
            <input
              type="number"
              id="salary"
              name="salary"
              value={formData.salary}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default CreateData;
