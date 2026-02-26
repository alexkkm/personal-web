import React, { useState } from 'react';
import Table from '../components/Table';
import NewsMarquee from './NewsMarquee';

const TestingPage = () => {

  const shortText = "这是一个向左滚动的示例文字，它会无限循环。为了实现无缝滚动，内容被复制了一份。";
  
  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
      <NewsMarquee />
    </div>
    );
};

export default TestingPage;
