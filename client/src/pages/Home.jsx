import React, { useState } from "react";
import DefaultLayout from "../components/DefaultLayout";
import '../resources/transactions.css'
import { Form, Input, Modal, Select } from "antd";

const Home = () => {
  const [showAddEditTransactionModal , setshowAddEditTransactionModal] = useState(false);
  const onFinish=(values)=>{
    console.log(values);
  }
  return (
    <DefaultLayout>
      <div className="filter d-flex justify-content-between align-items-center">
        <div>

        </div>
        <div>
          <button className="primary" onClick={()=> setshowAddEditTransactionModal(true)}>ADD NEW</button>
        </div>
      </div>
      <div className="table-analytics">

      </div>

      <Modal title='Add Transaction'      
      open={showAddEditTransactionModal} 
      onCancel={()=>setshowAddEditTransactionModal(false)}
      footer={false}
      >
          <Form layout="vertical" className="transaction-form" onFinish={onFinish}>
            <Form.Item label="Amount" name="Amount">
              <Input type='text' />
            </Form.Item>

            <Form.Item label="Type" name="type">
              <Select>
              <Select.Option value='income'>Income</Select.Option>
              <Select.Option value='expense'>Expense</Select.Option>
              </Select>
            </Form.Item>
            
            <Form.Item label="Category" name="category">
              <Select>
              <Select.Option value='salary'>Salary</Select.Option>
              <Select.Option value='freelance'>Freelance</Select.Option>
              <Select.Option value='food'>Food</Select.Option>
              <Select.Option value='entertainment'>Entertainment</Select.Option>
              <Select.Option value='education'>Education</Select.Option>
              <Select.Option value='Medical'>Medical</Select.Option>
               <Select.Option value='food'>Food</Select.Option>
              <Select.Option value='tax'>Tax</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item label="Date" name="date">
              <Input type="date" />
            </Form.Item>

            <Form.Item label="Reference" name="reference">
              <Input type="text" />
            </Form.Item>

            <Form.Item label="Description" name="Description">
              <Input type="text" />
            </Form.Item>
            <div className="d-flex justify-content-end">
                <button className="primary" type="submit">
                  SAVE
                </button>
            </div>
          </Form>
      </Modal>
    </DefaultLayout>
  );
};

export default Home;
