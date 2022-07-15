import {useState} from 'react';
import { Menu, Checkbox } from 'antd';

import './Menu.css'

const { SubMenu } = Menu;

export default function Sidebar(props){
  return(
    <>
     <Menu
          theme="dark"
           mode="inline"
      >
        <SubMenu key="1" title="Availability">
          <Menu.Item key="10" className='menu-item'><Checkbox name="status" isChecked={props.check} value={props.check} onChange={props.handleOnChange}/>&nbsp;Exclude Out of stock</Menu.Item>
        </SubMenu>
        <SubMenu key="2" title="Name">
          <Menu.Item key="20" className='menu-item'><Checkbox name="productName" isChecked={props.check} value="Laptop" onChange={props.handleOnChange}/>&nbsp;Laptop</Menu.Item>
          <Menu.Item key="21" className='menu-item'><Checkbox name="productName" isChecked={props.check} value="Mobile" onChange={props.handleOnChange}/>&nbsp;Mobile</Menu.Item>
          <Menu.Item key="22" className='menu-item'><Checkbox name="productName" isChecked={props.check} value="Camera" onChange={props.handleOnChange}/>&nbsp;Camera</Menu.Item>
          <Menu.Item key="23" className='menu-item'><Checkbox name="productName" isChecked={props.check} value="Watch" onChange={props.handleOnChange}/>&nbsp;Watch</Menu.Item>
        </SubMenu>
        <SubMenu key="3" title="Price">
          <Menu.Item key="30" className='menu-item'><Checkbox name="price" isChecked={props.check} value={[500, 1500]} onChange={props.handleOnChange}/>&nbsp;Rs.500 -  Rs.1500</Menu.Item>
          <Menu.Item key="31" className='menu-item'><Checkbox name="price" isChecked={props.check} value={[1500, 5000]} onChange={props.handleOnChange}/>&nbsp;Rs.1500 - Rs.5000</Menu.Item>
          <Menu.Item key="32" className='menu-item'><Checkbox name="price" isChecked={props.check} value={[5000, 10000]} onChange={props.handleOnChange}/>&nbsp;Rs.5000 - Rs.10000</Menu.Item>
          <Menu.Item key="33" className='menu-item'><Checkbox name="price" isChecked={props.check} value={[10000, 25000]} onChange={props.handleOnChange}/>&nbsp;Rs.10000 - Rs.25000</Menu.Item>
          <Menu.Item key="34" className='menu-item'><Checkbox name="price" isChecked={props.check} value={[25000, 50000]} onChange={props.handleOnChange}/>&nbsp;Rs.25000 - Rs.50000</Menu.Item>
          <Menu.Item key="35" className='menu-item'><Checkbox name="price" isChecked={props.check} value={[50000, 100000]} onChange={props.handleOnChange}/>&nbsp;Rs.50000 - Rs.100000</Menu.Item>
        </SubMenu>
     </Menu>
    </>
  )
}
