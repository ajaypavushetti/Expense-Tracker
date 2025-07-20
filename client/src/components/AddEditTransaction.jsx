import React from "react";
import { Form, Input, message, Modal, Select } from "antd";
import { useState } from "react";
import axios from "axios";
import Spinner from "./Spinner";

const AddEditTransaction = ({
  setshowAddEditTransactionModal,
  showAddEditTransactionModal,
  selectedItemForEdit,
  setSelectedItemForEdit,
  getTransactions,
}) => {
  const [loading, setLoading] = useState(false);

  
  const handleWheel = (e) => {
    e.target.blur(); 
    
  };

  const onFinish = async (values) => {
    try {
      const user = JSON.parse(localStorage.getItem("TrackMint-user"));
      setLoading(true);

     
      const transactionPayload = {
        ...values,
        amount: Number(values.amount), 
        userid: user._id,
      };

      if (selectedItemForEdit) {
        
        await axios.post(`${import.meta.env.VITE_API_URL}/api/transactions/edit-transaction`, { //
          payload: transactionPayload, // Use the prepared payload
          transactionId: selectedItemForEdit._id,
        });
        getTransactions();
        message.success("Transaction Updated Successfully");
      } else {
        
        await axios.post(`${import.meta.env.VITE_API_URL}/api/transactions/add-transaction`, transactionPayload); //
        getTransactions();
        message.success("Transaction Added Successfully");
      }
      setshowAddEditTransactionModal(false);
      setSelectedItemForEdit(null);
      setLoading(false);
    } catch (error) {
      console.error("Error adding transaction:", error);
      message.error("something went wrong");
      setLoading(false);
    }
  };

  return (
    <Modal
      title={selectedItemForEdit ? "Edit Transaction" : "Add Transaction"}
      open={showAddEditTransactionModal}
      onCancel={() => setshowAddEditTransactionModal(false)}
      footer={false}
    >
      {loading && <Spinner />}
      <Form
        layout="vertical"
        className="transaction-form"
        onFinish={onFinish}
        initialValues={selectedItemForEdit}
      >
        <Form.Item label="Amount" name="amount">
        
          <Input type="number" onWheel={handleWheel} />
        </Form.Item>

        <Form.Item label="Type" name="type">
          <Select>
            <Select.Option value="income">Income</Select.Option>
            <Select.Option value="expense">Expense</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label="Category" name="category">
          <Select>
            <Select.Option value="salary">Salary</Select.Option>
            <Select.Option value="freelance">Freelance</Select.Option>
            <Select.Option value="food">Food</Select.Option>
            <Select.Option value="entertainment">Entertainment</Select.Option>
            <Select.Option value="investment">Investment</Select.Option>
            <Select.Option value="travel">Travel</Select.Option>
            <Select.Option value="education">Education</Select.Option>
            <Select.Option value="Medical">Medical</Select.Option>
            <Select.Option value="tax">Tax</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label="Date" name="date">
          <Input type="date" />
        </Form.Item>

        <Form.Item label="Reference" name="reference">
          <Input type="text" />
        </Form.Item>

        <Form.Item label="Description" name="description">
          <Input type="text" />
        </Form.Item>
        <div className="d-flex justify-content-end">
          <button className="primary" type="submit">
            SAVE
          </button>
        </div>
      </Form>
    </Modal>
  );
};

export default AddEditTransaction;