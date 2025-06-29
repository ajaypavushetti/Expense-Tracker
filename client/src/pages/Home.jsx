import React, { useState } from "react";
import DefaultLayout from "../components/DefaultLayout";
import "../resources/transactions.css";
import AddEditTransaction from "../components/AddEditTransaction";
import { useEffect } from "react";
import Spinner from "../components/Spinner";
import { DatePicker, message, Select } from "antd";
import axios from "axios";
import { Table } from "antd";
import moment from "moment";
const {RangePicker} = DatePicker;

const Home = () => {
  const [showAddEditTransactionModal, setshowAddEditTransactionModal] =
    useState(false);
  const [loading, setLoading] = useState(false);
  const [transactionsData, setTransactionsData] = useState([]);
  const [frequency , setFrequency]=useState("7");
  const [selectedRange , setSelectedRange]=useState([])

  const getTransactions = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("TrackMint-user"));
      setLoading(true);
      const response = await axios.post("/api/transactions/get-all-transactions", {
  userid: user._id,
  frequency,
  selectedRange: frequency === "custom" ? selectedRange : [],
});


      setTransactionsData(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      message.error("something went wrong");
    }
  };

  useEffect(() => {
    getTransactions();
  }, [frequency, selectedRange]);

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      render : (text)=><span>{moment(text).format('YYYY-MM-DD')}</span>
    },
    {
      title: "Amount",
      dataIndex: "amount",
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Reference",
      dataIndex: "reference",
    },
  ];

  return (
    <DefaultLayout>
      {loading && <Spinner />}
      <div className="filter d-flex justify-content-between align-items-center">
        <div>
          <div className="d-flex flex-column">
            <h6>Select Frequency</h6>
            <Select value={frequency} onChange={(value) => setFrequency(value)}>

              <Select.Option value='7'>Last 1 Week</Select.Option>
              <Select.Option value='30'>Last 1 Month</Select.Option>
              <Select.Option value='365'>Last 1 Year</Select.Option>
              <Select.Option value='custom'>Custom</Select.Option>
            </Select>

            {frequency=== "custom" && (
              <div className="mt-2">
              <RangePicker value={selectedRange} onChange={(values)=>setSelectedRange(values)} />
              </div>
            ) }
          </div>
        </div>
        <div>
          <button
            className="primary"
            onClick={() => setshowAddEditTransactionModal(true)}
          >
            ADD NEW
          </button>
        </div>
      </div>
      <div className="table-analytics">
        <div>
          <Table columns={columns} dataSource={transactionsData} />
        </div>
      </div>

      {showAddEditTransactionModal && (
        <AddEditTransaction
          showAddEditTransactionModal={showAddEditTransactionModal}
          setshowAddEditTransactionModal={setshowAddEditTransactionModal}
          getTransactions={getTransactions}
        />
      )}
    </DefaultLayout>
  );
};

export default Home;
