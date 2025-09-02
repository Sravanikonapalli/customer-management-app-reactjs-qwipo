const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const {open} = require('sqlite');
const Path = require('path');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

let db=null;

const dbPath=Path.join(__dirname,'database.db');
// Initialize SQLite database
const initializeDbAndServer=async()=>{
    try{
        db=await open({
            filename:dbPath,
            driver:sqlite3.Database
        });
        await db.run(`
            CREATE TABLE IF NOT EXISTS customers (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                first_name TEXT NOT NULL,
                last_name TEXT NOT NULL,
                phone_number TEXT NOT NULL UNIQUE
            )
        `);

        await db.run(`
            CREATE TABLE IF NOT EXISTS addresses (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                customer_id INTEGER NOT NULL,
                address_details TEXT NOT NULL,
                city TEXT NOT NULL,
                state TEXT NOT NULL,
                pin_code TEXT NOT NULL,
                FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE
            )
        `);
        app.listen(3000,()=>{
            console.log("Server running at http://localhost:3000/");
        });
    }catch(e){
        console.log(`DB Error:${e.message}`);
        process.exit(1);
    }   

};

initializeDbAndServer();

// ------------------- Customer APIs ------------------

// Get all customers
app.get('/customers', async (req, res) => {
    try {
        const { search } = req.query; 
        let customersQuery = `SELECT * FROM customers`;
        const params = [];

        if (search) {
            customersQuery += `
                WHERE first_name LIKE ? 
                OR last_name LIKE ? 
                OR phone_number LIKE ?
            `;
            const searchPattern = `%${search}%`;
            params.push(searchPattern, searchPattern, searchPattern);
        }

        const customers = await db.all(customersQuery, params);
        res.json({ message: "Success", data: customers });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

// Get customer by ID
app.get('/customers/:id',async(req,res)=>{
    const {id}=req.params;
    try{
        const customerQuery=`SELECT * FROM customers WHERE id=?`;
        const customer=await db.get(customerQuery,[id]);
        if(customer){
            res.json({message:"Success",data:customer});
        }else{
            res.status(404).json({error:"Customer not found"});
        }       
    }catch(e){
        res.status(500).json({error:e.message});
    }
});

// Create a new customer
app.post('/customers',async(req,res)=>{
    const {first_name,last_name,phone_number}=req.body;
    try{
        const insertCustomerQuery=`
            INSERT INTO customers (first_name, last_name, phone_number)
            VALUES (?, ?, ?)
        `;
        const result=await db.run(insertCustomerQuery,[first_name,last_name,phone_number]);
        res.status(201).json({message:"Customer created",customerId:result.lastID});
    }catch(e){
        res.status(500).json({error:e.message});        
    }
}); 

// Update customer details
app.put('/customers/:id',async(req,res)=>{
    const {id}=req.params;
    const {first_name,last_name,phone_number}=req.body;
    try{
        const updateCustomerQuery=`
            UPDATE customers
            SET first_name=?, last_name=?, phone_number=?
            WHERE id=?  
        `;
        const result=await db.run(updateCustomerQuery,[first_name,last_name,phone_number,id]);
        if(result.changes===0){
            res.status(404).json({error:"Customer not found"});
        }else{
            res.json({message:"Customer updated"});
        }   
    }catch(e){
        res.status(500).json({error:e.message});        
    }   
});

// Delete a customer
app.delete('/customers/:id',async(req,res)=>{
    const {id}=req.params;  
    try{
        const deleteCustomerQuery=`DELETE FROM customers WHERE id=?`;
        const result=await db.run(deleteCustomerQuery,[id]);
        if(result.changes===0){
            res.status(404).json({error:"Customer not found"});
        }else{
            res.json({message:"Customer deleted"});
        }   
    }catch(e){
        res.status(500).json({error:e.message});        
    }
});

// ------------------- Address APIs ------------------

// Get all addresses for a customer
app.get('/customers/:id/addresses',async(req,res)=>{
    const {id}=req.params;
    try{
        const addressesQuery=`SELECT * FROM addresses WHERE customer_id=?`;     
        const addresses=await db.all(addressesQuery,[id]);
        res.json({message:"Success",data:addresses});
    }catch(e){
        res.status(500).json({error:e.message});
    }   
});

// Get a single address by ID
app.get('/addresses/:addressId', async (req, res) => {
  const { addressId } = req.params;
  try {
    const address = await db.get(`SELECT * FROM addresses WHERE id = ?`, [addressId]);
    if (!address) {
      return res.status(404).json({ error: "Address not found" });
    }
    res.json({ message: "Success", data: address });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a new address for a customer
app.post('/customers/:id/addresses',async(req,res)=>{
    const {id}=req.params;  
    const {address_details,city,state,pin_code}=req.body;
    try{
        const insertAddressQuery=`  
            INSERT INTO addresses (customer_id, address_details, city, state, pin_code)
            VALUES (?, ?, ?, ?, ?)
        `;
        const result=await db.run(insertAddressQuery,[id,address_details,city,state,pin_code]);
        res.status(201).json({message:"Address added",addressId:result.lastID});
    }
    catch(e){
        res.status(500).json({error:e.message});        
    }       
});

// Update an address
app.put('/addresses/:addressId',async(req,res)=>{
    const {addressId}=req.params;
    const {address_details,city,state,pin_code}=req.body;   
    try{
        const updateAddressQuery=`
            UPDATE addresses
            SET address_details=?, city=?, state=?, pin_code=?
            WHERE id=?
        `;
        const result=await db.run(updateAddressQuery,[address_details,city,state,pin_code,addressId]);
        if(result.changes===0){
            res.status(404).json({error:"Address not found"});
        }else{
            res.json({message:"Address updated"});
        }   
    }catch(e){
        res.status(500).json({error:e.message});        
    }
});
 
// Delete an address
app.delete('/addresses/:addressId',async(req,res)=>{
    const {addressId}=req.params;
    try{
        const deleteAddressQuery=`DELETE FROM addresses WHERE id=?`;
        const result=await db.run(deleteAddressQuery,[addressId]);
        if(result.changes===0){
            res.status(404).json({error:"Address not found"});
        }else{
            res.json({message:"Address deleted"});
        }
    }catch(e){
        res.status(500).json({error:e.message});        
    }
}); 


module.exports=app;