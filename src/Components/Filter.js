import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import "./Filter.css"; 

export default function Filter({Grouping,Ordering}) {
  const [current, setCurrent] = useState('none');
  const [selectedgrp, setgrp] = useState('status');
  const [selectedord, setord] = useState('priority');
  const [curric, setcric] = useState('gridicons:dropdown');
  const myFun = ()=> {
    if(curric==='gridicons:dropdown') setcric('mdi:menu-up');
    else setcric('gridicons:dropdown');
    const cur = current==='none'?'block':'none';
    setCurrent(cur);
    if(cur==='none'){
      Grouping(selectedgrp);
      Ordering(selectedord);
    }
  };
  const checkgroup = (val)=>{
    setgrp(val.target.value);
  };
  const checkorder = (val)=>{
    setord(val.target.value);
  };

  return (
    <div>
      {/* Button */}
      <div onClick={myFun} className='btn'>
        <div><Icon icon="ri:equalizer-line" /></div>
        <div>Display</div>
        <div><Icon icon={curric} /></div>
      </div>
      
      {/* Dropdown */}
      <div id='menu' style={{display : current}}>
        <form className='dropdown'>
        <label className='d1'>Grouping</label>
        <select className='d2' onChange={checkgroup}>
          <option value="status">Status</option>
          <option value="user">User</option>
          <option value="priority">Priority</option>
        </select>
        </form>
        <form className='dropdown'>
          <label className='d1'>Ordering</label>
          <select className='d2' onChange={checkorder}>
            <option value="priority">Priority</option>
            <option value="title">Title</option>
          </select>
        </form>  
      </div>

    </div>
  );
}

