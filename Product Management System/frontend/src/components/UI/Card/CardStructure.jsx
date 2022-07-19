import { useSelector} from 'react-redux'
import { Card, Col, Row, Popconfirm, message } from 'antd';
import {EditOutlined, DeleteOutlined, EyeOutlined} from '@ant-design/icons';

import { MODAL_TYPES } from "../../../helper/helper";

import 'antd/dist/antd.css';
import './Card.css';

const { Meta } = Card;

export default function CardStructure(props){
  const productState = useSelector((state) => state.products); 
  return (
    <>
      <div className="site-card-wrapper">
        <Row gutter={[16, 24]}>
         {productState.data.map((item, index) => (
          
              <Col key={item.id} span={8} xs={24} xl={8}>
                <Card className='card-inside'
                      cover={<img alt={item.productName} src={item.image} style={{height : "150px", paddingTop:"10px"}}/>}
                      actions={[
                          <EyeOutlined onClick={() => {
                            props.toggleDrawer(MODAL_TYPES.VIEW, item);
                        }}/>,
                          <EditOutlined onClick={() => {
                            props.toggleDrawer(MODAL_TYPES.EDIT, item);
                        }}/>,
                          <Popconfirm
                          title="Are you sure to delete this Product?"
                          onConfirm={() => props.onDelete(item.id)}
                          okText="Yes"
                          cancelText="No"
                        >
                          <DeleteOutlined /></Popconfirm>
                      ]}
                >
                <Meta className='meta-style' style={{backgroundColor : item.status === false ? "grey" : item.quantity < 5 ? "#ff4d4d" : ""}}
                      title={item.productName}
                      description={item.productDescription ? item.productDescription.length <50 
                        ? <>{item.productDescription}<br />Rs. {item.price}</>
                        : <>{item.productDescription.substring(0, 50).concat("...")}<br />Rs. {item.price}</>
                        : `Rs. ${item.price}`}
                />
                </Card>
              </Col>
            
          ))}

        </Row>
      
      </div>
    </>
  )
};
