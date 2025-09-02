# Customer Management App

A simple Customer Management web application built with **React** (frontend) and **Node.js + SQLite** (backend). It allows you to add, view, edit, and delete customers and their addresses.

## Deployment and Live urls

- frontend - vercel
- backend - render

- [frontend]()
- [backend](https://customer-management-app-reactjs-qwipo.onrender.com)

## Features

- View all customers with search functionality
- Add a new customer
- Delete a specific customer
- Add, Edit and delete customer address details
- View customer profile with detailed addresses
- Confirm deletion before removing a customer
- Responsive and user-friendly interface

## Tech Stack

- **Frontend:** React, React Router, Axios, React Icons
- **Backend:** Node.js, Express, SQLite, CORS
- **Styling:** CSS

## Project Structure

```
/backend
    server.js
    database.db
    app.http     // to view the apis
/frontend
    /components
        AddAddressPage.js
        AddCustomerPage.js
        CustomerProfilePage.js
        CustomersPage.js
        
    /styles
        CustomersPage.css
        CustomerProfilePage.css
        AddCustomerPage.css
    App.js

```

## Setup Instructions

### 1. git repository

```bash
git clone https://github.com/Sravanikonapalli/customer-management-app-reactjs-qwipo.git
cd qwipo-reactjs-assignment
```

### 2. Backend Setup

```bash
cd backend
npm install express sqlite3 sqlite cors
node server.js
```
Server runs at [http://localhost:3000/](http://localhost:3000/)

### 3. Frontend Setup

```bash
cd frontend
npm install react react-dom react-router-dom axios react-icons
npm start
```
App runs at [http://localhost:3001/](http://localhost:3001/) (or your default React port)

## API Endpoints (All the API urls are in **app.http** folder)

### Customers

- `GET /customers` — Get all customers (optional search query: `?search=`)
- `GET /customers/:id` — Get customer by ID
- `POST /customers` — Add a new customer
- `PUT /customers/:id` — Update customer details
- `DELETE /customers/:id` — Delete a customer

### Addresses

- `GET /customers/:id/addresses` — Get all addresses for a customer
- `POST /customers/:id/addresses` — Add a new address
- `PUT /addresses/:addressId` — Update address
- `DELETE /addresses/:addressId` — Delete address

## Usage

- Open the app in the browser
- Add new customers using the **+** button at the bottom right of the Customers Page
- Click a customer to view their profile
- Add, edit, or delete addresses for a customer
- Edit customer details and save changes
- Delete a customer using the trash icon which is at top of the customer profile page(confirmation required)

## Notes

- **Edit Address:** The same form is used for adding and editing addresses. Fields are prefilled in edit mode.
- **Database:** SQLite is used for simplicity; data is stored in `database.db`.
