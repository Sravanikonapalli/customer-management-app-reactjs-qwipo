import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/AddCustomerPage.css';
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";


function AddCustomerPage() {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleSave = async () => {
    if (!firstName || !lastName || !phoneNumber) {
      alert("Please fill all fields");
      return;
    }

    try {
      await axios.post("https://customer-management-app-reactjs-qwipo.onrender.com/customers", {
        first_name: firstName,
        last_name: lastName,
        phone_number: phoneNumber
      });

      alert("Customer added successfully!");
      navigate("/"); // go back to customers list
    } catch (err) {
      console.error("Error saving customer:", err);
      alert("Failed to add customer");
    }
  };

  return (
    <div className="add-customer-page">
      <div className='add-customer-header'>
      <Link to="/"><FaArrowLeft color='white'/></Link>
      <h2>Add Customer</h2>
      </div>
      <hr />

      <div className="input-field">
        <label>First Name</label>
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="form-control"
        />
      </div>

      <div className="input-field">
        <label>Last Name</label>
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="form-control"
        />
      </div>  

      <div className="input-field">
        <label>Phone Number</label>
        <input
          type="text"
          placeholder="Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="form-control"
        />
      </div>  

      <div className="form-buttons">
        <button className='cancel-btn' onClick={() => navigate(-1)}>Cancel</button>
        <button className='save-btn' onClick={handleSave}>Save</button>
      </div>
    </div>
  );
}

export default AddCustomerPage;
