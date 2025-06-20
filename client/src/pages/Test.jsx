import React from 'react';
import { Button, message } from 'antd';
                              
const test = () => {
  const showSuccess = () => {
    message.success('🎉 Toast is working!');
  };

  return (
    <div style={{ padding: '100px', textAlign: 'center' }}>
      <Button type="primary" onClick={showSuccess}>
        Click Me to Show Toast
      </Button>
    </div>
  );
};

export default test;
