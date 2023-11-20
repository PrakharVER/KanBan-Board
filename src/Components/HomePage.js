import React, {useEffect,useState } from 'react';
import "./HomePage.css";
import Cards from './Cards.js';

export default function HomePage({grp,ord}) {
    const API = `https://api.quicksell.co/v1/internal/frontend-assignment`;
    const shead = ['Backlog','Todo','In progress','Done','Canceled'];
    const phead = ['No Priority','Urgent','High','Medium','Low'];
    const [groupnames,setgroupnames] = useState([]);
    const [users,setusers] = useState([]);

    useEffect(()=>{
      const ApiFetch = async() =>{
        try {
            const res = await fetch(API);
            const data = await res.json();
            groupnames.length=0;
            users.length=0;
            for(let item of data.tickets){
              groupnames.push(item);
              setgroupnames(groupnames);
            }
            for(let item of data.users){
              users.push(item.name);
              setusers(users);
            }
        } catch (error) {
            console.log(error);
        }
      };
      ApiFetch();
    },[]);

    
    const heading = (idx)=>{
      if(grp==="status"){
        return shead[idx];
      } else if(grp==="priority"){
        return phead[idx];
      } else{
        return users[idx];
      }
    };
    const mygrp = ()=>{
      return grp; 
    };
    const myhead = (idx)=>{
      return heading(idx); 
    };
    const myord = ()=>{
      return ord; 
    };

  return (
    <div id='body'>
      <hr />
      <div id='maindiv'>
        <div className='cards'>
            <Cards name={myhead(0)} group={mygrp} order={myord} numb={0}/>
        </div>
        <div className='cards'>
          <Cards name={myhead(1)} group={mygrp} order={myord} numb={1} />
        </div>
        <div className='cards'>
          <Cards name={myhead(2)} group={mygrp} order={myord} numb={2} />
        </div>
        <div className='cards'>
          <Cards name={myhead(3)} group={mygrp} order={myord} numb={3} />
        </div>
        <div className='cards'>
          <Cards name={myhead(4)} group={mygrp} order={myord} numb={4} /> 
        </div>
      </div>
      <footer></footer>
    </div>
  )
}