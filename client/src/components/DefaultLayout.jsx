//this is header

import React from "react";
import "../resources/default-layout.css";
import { Button, Dropdown, Space } from 'antd';
import { useNavigate } from "react-router-dom";

const DefaultLayout = (props) => {
  const user = JSON.parse(localStorage.getItem("TrackMint-user"));
const navigate = useNavigate()
const items = [
  {
    label : (
      <li onClick={()=>{
        localStorage.removeItem('TrackMint-user')
        navigate("/login");
      }}
      
      >Logout</li>
    )
  }
];


  return (
    <div className="layout">
      <div className="header d-flex justify-content-between align-items-center">
        <div>
          <h1 className="logo">Track Mint</h1>
        </div>
        <div>
          <Dropdown menu={{ items }} placement="bottomLeft">
<Button className="bg-custom-gray">{user.name}</Button>


      </Dropdown>
          
        </div>
      </div>
      <div className="content">{props.children}</div>
    </div>
  );
};

export default DefaultLayout;
  