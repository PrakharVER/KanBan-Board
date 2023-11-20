import React, { useEffect, useState } from 'react';
import './Cards.css';
import { Icon } from '@iconify/react';

export default function Cards({ name, group, order, numb }) {
  const API = `https://api.quicksell.co/v1/internal/frontend-assignment`;
  const myIcons = { 'Backlog': 'entypo:cycle', 'Todo': 'material-symbols:circle-outline', 'In progress': 'carbon:in-progress', 'Done': 'lets-icons:done-ring-round', 'Canceled': 'material-symbols:cancel-outline', '0': 'fe:elipsis-h', '1': 'healthicons:low-bars', '2': 'healthicons:medium-bars', '3': 'healthicons:high-bars', '4': 'zondicons:exclamation-outline' };
  const userIcon = 'mdi:user-circle-outline';
  const [nogrps, setnogrps] = useState('0');
  const [expanded, setExpanded] = useState(false);
  const [mydata, setdata] = useState([]);
  const toggleText = () => {
    setExpanded(!expanded);
  };

  const getIcon = () => {
    if (group() === 'status') {
      return myIcons[name];
    } else if (group() === 'priority') {
      return myIcons[numb];
    } else {
      return userIcon;
    }
  };

  useEffect(() => {
    const ApiFetch = async () => {
      try {
        const res = await fetch(API);
        const data = await res.json();
        let c = 0;
        mydata.length = 0;
        for (let item of data.tickets) {
          if (group() === 'user') {
            let str = "usr-" + (numb + 1);
            if (item["userId"] === str) {
              mydata.push(item);
              setdata(mydata, item);
              c++;
            }
          } else if (group() === "priority" && item[group()] === numb) {
            mydata.push(item);
            setdata(mydata, item);
            c++;
          } else if (group() === "status" && item[group()] === name) {
            mydata.push(item);
            setdata(mydata, item);
            c++;
          }
        }
        if (order() === "priority") {
          mydata.sort((a, b) => b.priority - a.priority);
        } else {
          mydata.sort((a, b) => a.title.localeCompare(b.title));
        }
        setdata(mydata);
        setnogrps(c);
      }
      catch (error) {
        console.log(error);
      }
    };
    ApiFetch();
  }, [name, group, order, numb]);


  return (
    <div id='divcard'>
      {/* Upper */}
      <div id='upperdiv'>
        <div id='ud1'>
          <div><Icon icon={getIcon()} id='icn' /></div>
          <div>{name}</div>
          <div>{nogrps}</div>
        </div>
        <div id='ud2'>
          <Icon icon="ic:sharp-plus" />{" "}<Icon icon="fe:elipsis-h" />
        </div>
      </div>
      {/* Lower */}
      <div id='lowerdiv'>
        {mydata.map((item, index) => (
          <div id='ld' key={index}>
            <div className='ld1'>
              <div>{item['id']}</div><div><Icon icon={userIcon} /></div>
            </div>
            <div className={`ld2 ${expanded ? 'expanded' : ''}`} onClick={toggleText}>{group()!=="status"?<div><Icon icon={myIcons[item['status']]} id="icn"/></div>:<></>}<div>{item['title']}</div></div>
            <div className='ld3'>
              <div><Icon icon={myIcons[item['priority']]} /></div><div><Icon icon="icon-park-outline:dot" />{item['tag']}</div></div>
          </div>
        ))}
        <div>
          {
            (mydata.length === 0) ? <div id='ldiv'>
              Nothing to Show!
            </div> : <p></p>
          }
        </div>
      </div>
    </div>
  )
}
