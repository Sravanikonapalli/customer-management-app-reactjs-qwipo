import { useParams, useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { FaPlus, FaTrash, FaEllipsisV,FaArrowLeft } from "react-icons/fa";

import '../styles/CustomerProfilePage.css';


function CustomerProfile() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [addresses, setAddresses] = useState([]);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    fetchCustomer();
    fetchAddresses();
  }, []);

  const fetchCustomer = async () => {
    try {
      const res = await axios.get(`https://customer-management-app-reactjs-qwipo.onrender.com/customers/${id}`);
      setFirstName(res.data.data.first_name);
      setLastName(res.data.data.last_name);
      setPhoneNumber(res.data.data.phone_number);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchAddresses = async () => {
    try {
      const res = await axios.get(
        `https://customer-management-app-reactjs-qwipo.onrender.com/customers/${id}/addresses`
      );
      setAddresses(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSave = async () => {
    try {
      await axios.put(`https://customer-management-app-reactjs-qwipo.onrender.com/customers/${id}`, {
        first_name: firstName,
        last_name: lastName,
        phone_number: phoneNumber,
      });
      alert("Customer updated!");
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteCustomer = async () => {
    try {
      await axios.delete(`https://customer-management-app-reactjs-qwipo.onrender.com/customers/${id}`);
      alert("Customer deleted!");
      navigate("/"); // back to list
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteAddress = async (addrId) => {
    try {
      await axios.delete(
        `https://customer-management-app-reactjs-qwipo.onrender.com/customers/${id}/addresses/${addrId}`
      );
      fetchAddresses();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="customer-profile">
      <div className="profile-header">
        <Link to="/" className="back-link"><FaArrowLeft size={25} color="white"/></Link>    
        <h1>Customer Profile</h1>
        <button
          className="delete-customer-btn"
          onClick={() => setShowDeleteConfirm(true)}
        >
          <FaTrash />
        </button>
      </div>

       {/* Delete Confirm Dialog */}
      {showDeleteConfirm && (
        <div className="confirm-dialog">
          <p>Are you sure you want to delete this customer?</p>
          <div className="confirm-btns">
            <button className="yes-btn" onClick={handleDeleteCustomer}>Yes</button>
            <button className="no-btn" onClick={() => setShowDeleteConfirm(false)}>No</button>
          </div>
        </div>
      )}

      <div className="input-field">
        <label>First Name</label>
        <input value={firstName} onChange={(e) => setFirstName(e.target.value)} />
      </div>

      <div className="input-field">
        <label>Last Name</label>
        <input value={lastName} onChange={(e) => setLastName(e.target.value)} />
      </div>

      <div className="input-field">
        <label>Phone Number</label>
        <input
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </div> 

      {/* Addresses Section */}
      <div className="addresses-header">
        <h2>Addresses</h2>
        <Link to={`/customers/${id}/add-address`} className="add-new-btn">
          <FaPlus /> Add New
        </Link>
      </div>

      <div className="addresses-list">
        {addresses.map((addr) => (
          <div key={addr.id} className="address-item">
            <div className="customer-address">
              <h3>{addr.address_details}</h3>
              <p>{addr.city}, {addr.state}, {addr.pin_code}</p>
            </div>

            <div className="address-actions">
              <button onClick={() => navigate(`/customers/${id}/addresses/${addr.id}`)}>
                <FaEllipsisV />
              </button>

              <button onClick={() => handleDeleteAddress(addr.id)}>
                <FaTrash />
              </button>
              
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Buttons */}
      <div className="profile-buttons">
        <button className="cancel-btn" onClick={() => navigate(-1)}>Cancel</button>
        <button className="save-btn" onClick={handleSave}>Save</button>
      </div>

     
    </div>
  );
}

export default CustomerProfile;
