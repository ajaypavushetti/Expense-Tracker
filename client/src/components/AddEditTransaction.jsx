import React from "react";
import { Form, Input, message, Modal, Select } from "antd";
import { useState } from "react";
import axios from "axios";
import Spinner from "./Spinner";
const AddEditTransaction = ({setshowAddEditTransactionModal , showAddEditTransactionModal , getTransactions}) => {
     const [loading , setLoading] = useState(false);
     const onFinish=async (values)=>{
        try {
            const user = JSON.parse(localStorage.getItem("TrackMint-user"))
          setLoading(true);
            await axios.post('/api/transactions/add-transaction',{...values , userid : user._id});
            getTransactions();
                message.success('Transaction Added Successfully');
                setshowAddEditTransactionModal(false);
                setLoading(false);
        } catch (error) {
   console.error("Error adding transaction:", error);
            message.error('something went wrong');
            setLoading(false);
        }
    }
  return (
    <Modal
      title="Add Transaction"
      open={showAddEditTransactionModal}
      onCancel={() => setshowAddEditTransactionModal(false)}
      footer={false}
    >
         {loading && <Spinner/>}
      <Form layout="vertical" className="transaction-form" onFinish={onFinish}>
        <Form.Item label="Amount" name="amount">
          <Input type="number" />
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
