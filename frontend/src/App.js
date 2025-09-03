import { Component } from "react";
import { Routes, Route } from "react-router-dom";
import CustomersPage from "./components/CustomersPage";
import CustomerProfilePage from "./components/CustomerProfilePage"; 
import AddAddressPage from "./components/AddAddressPage";
import AddCustomerPage from "./components/AddCustomerPage";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Routes>
          <Route path="/" element={<CustomersPage />} />
          <Route path="/customers/:id" element={<CustomerProfilePage />} />
          <Route path="/customers/new" element={<AddCustomerPage/>} />
          <Route path="/customers/:id/add-address" element={<AddAddressPage/>}/>
          <Route path="/customers/:id/addresses/:addressId" element={<AddAddressPage />} /> 
        </Routes>
      </div>
    );
  }
}

export default App;
