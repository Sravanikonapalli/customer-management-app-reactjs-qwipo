import { useParams, useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import '../styles/AddCustomerPage.css';
import { FaArrowLeft } from "react-icons/fa";

function AddressFormPage() {
  const { id, addressId } = useParams(); 
  const navigate = useNavigate();
  const isEdit = !!addressId;

  const [addressDetails, setAddressDetails] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pinCode, setPinCode] = useState("");

  // Fetch existing address data if editing
  useEffect(() => {
    if (isEdit) {
      const fetchAddress = async () => {
        try {
          const res = await axios.get(`https://customer-management-app-reactjs-qwipo.onrender.com/addresses/${addressId}`);
          setAddressDetails(res.data.data.address_details);
          setCity(res.data.data.city);
          setState(res.data.data.state);
          setPinCode(res.data.data.pin_code);
        } catch (err) {
          console.error(err);
        }
      };
      fetchAddress();
    }
  }, [addressId, isEdit]);

  const handleSave = async () => {
    try {
      if (isEdit) {
        // Edit existing address
        await axios.put(`https://customer-management-app-reactjs-qwipo.onrender.com/addresses/${addressId}`, {
          address_details: addressDetails,
          city,
          state,
          pin_code: pinCode,
        });
        alert("Address updated!");
      } else {
        // Add new address
        await axios.post(`https://customer-management-app-reactjs-qwipo.onrender.com/customers/${id}/addresses`, {
          address_details: addressDetails,
          city,
          state,
          pin_code: pinCode,
        });
        alert("Address added!");
      }
      navigate(`/customers/${id}`); // Go back to profile page
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="add-customer-page">
      <div className='add-customer-header'>
        <Link to={`/customers/${id}`}><FaArrowLeft color='white'/></Link>
        <h2>{isEdit ? "Edit Address" : "Add Address"}</h2>
      </div>

      <hr />

      <div className="input-field">
        <label>Address Details</label>
        <input
          value={addressDetails}
          onChange={(e) => setAddressDetails(e.target.value)}
        />
      </div> 

      <div className="input-field">
        <label>City</label>
        <input
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
      </div>

      <div className="input-field">
        <label>State</label>
        <input
          value={state}
          onChange={(e) => setState(e.target.value)}
        />
      </div>

      <div className="input-field">
        <label>Pin Code</label>
        <input
          value={pinCode}
          onChange={(e) => setPinCode(e.target.value)}
        />
      </div>

      <div className="form-buttons">
        <button className="cancel-btn" onClick={() => navigate(-1)}>Cancel</button>
        <button className="save-btn" onClick={handleSave}>{isEdit ? "Update" : "Save"}</button>
      </div>
    </div>
  );
}

export default AddressFormPage;
