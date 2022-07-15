import React, { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import { Button, Typography,Layout} from "antd";
import {MenuFoldOutlined, MenuUnfoldOutlined, PlusOutlined} from '@ant-design/icons';
import axios from 'axios';

import CardStructure from '../components/UI/Card/CardStructure';
import ModalStructure from '../components/UI/Modal/ModalStructure';
import { MODAL_TYPES } from "../helper/helper";
import Menu from './UI/Menu/Menu'
import { listOfProduct, deleteProduct } from '../redux/general/Actions';

import './Product.css'

const { Header, Sider, Content } = Layout;

function Product(props) {
    const dispatch = useDispatch();
    let [Products, setProducts] = useState([]),
        [search, setSearch] = useState([]),
        [loading, setLoading] = useState(false),
        [check, setCheck] = useState(false),
        [collapsed, setCollapsed] = useState(false),
        [drawer, setDrawer] = useState({
            open: false,
            type: MODAL_TYPES.VIEW,
            data: {},
        });
    
  
    useEffect(() => {
        getProducts();
        // eslint-disable-next-line
    }, [search]);
    
    //let search =[]
    async function getProducts() {
        try {
            setLoading(true);
            let response = await axios.post('http://localhost:5000/product/list', {
                  "search" : search 
                
            });
            dispatch(listOfProduct(response.data.data.rows))
            setLoading(false);
        } catch (error) {
            console.log("error:", error);
            setLoading(false);
        }
    }

 
    function onSuccess(type, data) {
        toggleDrawer();
        getProducts();
    }

    const handleOnChange = (event) => {
      setCheck(!check);
      if(event.target.checked){
        setSearch(oldArray => [...oldArray, {
          "field" : event.target.name,
          "value" : event.target.name === "status" ? event.target.value ? 1 : 0 : event.target.value
        }]);
      }
      else{
        setSearch(
          search.filter((item) =>
          item.field !== event.target.name && item.field !== event.target.value)
        )}
      };

    async function onDelete(id) {
        try {
            //setLoading(true);
            await axios.delete("http://localhost:5000/product/" + id);
            dispatch(deleteProduct(id))
            getProducts();
        } catch (error) {
            //setLoading(false);
        }
    }

    function toggleDrawer(type, data = {}) {
        setDrawer({
            ...drawer,
            type,
            data,
            open: !drawer.open,
        });
    }

    return (
        <>
          <Layout>
            <Sider trigger={null} collapsible collapsed={collapsed}>
              <div className="logo" />
                <Menu check={check} handleOnChange={handleOnChange}/>
            </Sider>

          <Layout className="site-layout">
            <Header className="site-layout-background" style={{padding: 0, display: "flex", justifyContent: "space-between", alignItems: "center"}}>
              {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                className: 'trigger',
                onClick: () => setCollapsed(!collapsed),
              })}

              <Typography.Title className="main" level={3}>
                Product Management System
              </Typography.Title>
                 
                <Button className="btn1" type="primary" icon={<PlusOutlined />} size={"large"}  
                    onClick={() => {toggleDrawer(MODAL_TYPES.ADD);}}>
                    Add Product
                </Button>
        
            </Header> 
            <Content className="site-layout-background">
              <CardStructure onDelete={onDelete} toggleDrawer={toggleDrawer}/> 
            </Content>
          </Layout>

            {drawer.open && (
              <ModalStructure
                  visible= {drawer.open}
                  type={drawer.type}
                  data={drawer.data}
                  title={MODAL_TYPES.ADD === drawer.type ? "Add Product" : MODAL_TYPES.EDIT === drawer.type ? "Edit Product" : "View Details"}
                  okText={MODAL_TYPES.ADD === drawer.type ? "Create" : "Update"}
                  cancelText="Cancel"
                  onCancel={toggleDrawer}
                  onSuccess={onSuccess}
                  cancelButtonProps={MODAL_TYPES.VIEW === drawer.type ? { style: { display: 'none' } } : ""}
                  okButtonProps={MODAL_TYPES.VIEW === drawer.type ? { style: { display: 'none' } } : ""}
              ></ModalStructure>
            )}
          </Layout>
        </>
      );
}

export default Product;
