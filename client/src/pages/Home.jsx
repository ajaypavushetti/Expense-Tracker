import React, { useState } from "react";
import DefaultLayout from "../components/DefaultLayout";
import '../resources/transactions.css'

import AddEditTransaction from "../components/AddEditTransaction";
import { useEffect } from "react";
import Spinner from "../components/Spinner";
import { message } from "antd";
import axios from "axios";
import { Table } from "antd";


const Home = () => {
  const [showAddEditTransactionModal , setshowAddEditTransactionModal] = useState(false);
     const [loading , setLoading] = useState(false);
     const [transactionsData,setTransactionsData] = useState([]);
const getTransactions=async ()=>{
try {
  const user= JSON.parse(localStorage.getItem("TrackMint-user"))
      setLoading(true);
      const response = await axios.post("/api/transactions/get-all-transactions", {userid: user._id});
      console.log(response.data);
      setTransactionsData(response.data);
      setLoading(false); 
    } catch (error) {
      console.error("Error fetching transactions:", error); 
      setLoading(false);
      message.error("something went wrong");
    }
}

useEffect(()=>{
  getTransactions()
},[]);

const columns = [
  {
    title : "Date",
    dataIndex : "date"
  },
  {
    title : "Amount",
    dataIndex : "amount"
  },
  {
    title : "Category",
    dataIndex : "category"
  },
  {
    title : "Reference",
    dataIndex : "reference"
  }
]

  return (
    <DefaultLayout>
      {loading && <Spinner/>}
      <div className="filter d-flex justify-content-between align-items-center">
        <div>

        </div>
        <div>
          <button className="primary" onClick={()=> setshowAddEditTransactionModal(true)}>ADD NEW</button>
        </div>
      </div>
      <div className="table-analytics">
          <div>
            <Table columns ={columns} dataSource ={transactionsData} />
          </div>
      </div>

{showAddEditTransactionModal && (<AddEditTransaction 
showAddEditTransactionModal = {showAddEditTransactionModal}
setshowAddEditTransactionModal = {setshowAddEditTransactionModal}
getTransactions={getTransactions}
/>)}
    
    </DefaultLayout>
  );
};

export default Home;
