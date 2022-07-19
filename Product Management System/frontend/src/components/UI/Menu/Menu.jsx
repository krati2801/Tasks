import {useState} from 'react';
import { Menu, Checkbox } from 'antd';

import './Menu.css'
import { SliderValueLabel } from '@mui/material';
import { NoBackpackSharp } from '@mui/icons-material';

const { SubMenu } = Menu;


export default function Sidebar(props){
  const checkbox = (name, value ) =>{
    if(name === "status")
{
  value = value === false ? 1 : 0 
}    console.log(value)
    return(
      <>
      <Checkbox name={name} isChecked={props.check} value={value} onChange={props.handleOnChange}/>
      </>
    )
  }
  const items = [
    {
      label: 'Availability',
      key: '1',
      children: [{ label: 'Exclude Out of stock', key: '10', icon: checkbox('status', props.check)}]
    },
    {
      label: 'Name',
      key: '2',
      children: [{ label: 'Laptop', key: '20', icon: checkbox('productName','Laptop')},
                 { label: 'Mobile', key: '21', icon: checkbox('productName','Mobile')},
                 { label: 'Camera', key: '22', icon: checkbox('productName','Camera')},
                 { label: 'Watch',  key: '23', icon: checkbox('productName','Watch')}]
    },
    {
      label: 'Price',
      key: '3',
      children: [{ label: 'Rs.500 -  Rs.1500',    key: '30', icon: checkbox('price',[500, 1500]), style:{display : 'flex'}},
                 { label: 'Rs.1500 - Rs.5000',    key: '31', icon: checkbox('price',[1500, 5000])},
                 { label: 'Rs.5000 - Rs.10000',   key: '32', icon: checkbox('price',[5000, 10000])},
                 { label: 'Rs.10000 - Rs.25000',  key: '33', icon: checkbox('price',[10000, 25000])},
                 { label: 'Rs.25000 - Rs.50000',  key: '34', icon: checkbox('price',[25000, 50000])},
                 { label: 'Rs.50000 - Rs.100000', key: '35', icon: checkbox('price',[50000, 100000])}]
    },
  ];
  return(
    <>
     <Menu
          theme="dark"
           mode="inline"
           items={items}
      >

     </Menu>
    </>
  )
}
