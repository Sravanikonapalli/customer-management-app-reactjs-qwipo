import { Component } from 'react';
import '../styles/CustomersPage.css';
import { CiSearch } from "react-icons/ci";
import { Link } from 'react-router-dom';
import { FaPlus, FaChevronRight } from "react-icons/fa";
import axios from 'axios';
import { CgProfile } from "react-icons/cg";

class CustomersPage extends Component {
    state = {
        customers: [],
        search: ""
    };

    componentDidMount() {
        this.fetchCustomers();
    }

    fetchCustomers = async () => {
        try {
            const response = await axios.get(`https://customer-management-app-reactjs-qwipo.onrender.com/customers?search=${this.state.search}`);
            this.setState({ customers: response.data.data });
        } catch (error) {
            console.error(error);
        }
    }

    handleSearchChange = (e) => {
        this.setState({ search: e.target.value }, this.fetchCustomers);
    }

    render() {
        const { customers, search } = this.state;

        return (
            <div className='customers-page'>
                <h1>Customers</h1>

                <div className='search-bar'>
                    <CiSearch className='search-icon' />
                    <input
                        type="text"
                        placeholder='Search customers...'
                        value={search}
                        onChange={this.handleSearchChange}
                    />
                </div>

                <div className='customers-list'>
                    {customers.map(customer => (
                        <div key={customer.id}>
                            <Link to={`/customers/${customer.id}`} className='customer-link'>
                                <div className='customer-info'>
                                    <CgProfile size={50} className='profile-icon'/>
                                    <div className='customer-name'>
                                    <h1>{customer.first_name} {customer.last_name}</h1>
                                    <p>{customer.phone_number}</p>
                                    </div>
                                </div>
                                <FaChevronRight className='chevron-icon' />
                            </Link>
                            <hr className='hr-line'/>
                        </div>
                    ))}
                </div>

                <Link to="/customers/new" className='add-customer-btn'>
                    <FaPlus />
                </Link>
            </div>
        );
    }
}

export default CustomersPage;
