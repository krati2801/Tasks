import {useState} from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { Button, Upload, Modal, Form, Input, Col, Row, message, Checkbox } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

import { addProduct, editProduct } from '../../../redux/general/Actions';
import { MODAL_TYPES } from "../../../helper/helper";

export default function ModalStructure(props) {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [oldPhotos, setOldPhotos] = useState([]);
  const [check, setCheck] = useState(props.data.status)
  const { TextArea } = Input;

  const newProps = {
    onChange({ file }) {
        if (file.status === "removed") {
            setOldPhotos((oldPhotos) => [...oldPhotos, file.name]);
        }
    },
    defaultFileList: [
        {
            uid: "1",
            name: props.data.image ? props.data.image : "",
            status: "done",
            url: `${props.data.image}`,
        },
    ],
  };
  
  async function onChange(){
   setCheck(!check)
  }
  async function formSubmit(values){
    let dataValues = { ...values };
    let formData = new FormData();

    if(oldPhotos.length) {
      oldPhotos.forEach((photos) => {
          formData.append("oldPhotos[]", photos);
      });
    }
    Object.entries(dataValues).forEach(([key, value]) => {
      if(key === "image") {
        if((value && value.file && value.file.status) || !value) {
          formData.append(key, "");
        }else if (value.file) {
          formData.append(key, value.file);
          formData.append("oldImage", props.data.image);
        }else {
          formData.delete(key);
        }
      }else {
        if (value !== undefined) {
          formData.append(key, value);
        }
      }
    });

    try {
      let response;
      let data = formData
      if (props.type === MODAL_TYPES.ADD){
        response = await axios.post('http://localhost:5000/product/add', data);
        dispatch(addProduct(response.data.data))
      }
      else {
        await axios.put('http://localhost:5000/product/' + props.data.id, data);
        dispatch(editProduct(data))
      }
      await props.onSuccess(props.type, { ...props.data, ...dataValues });
      } 
      catch (error) {
        message.error(error.response?.data?.message || "Internal Server Error")
        console.log("TCL ~ file: Drawer.jsx ~ line 25 ~ formSubmit ~ error", error);
      }
    }
    
  return (
    <>
      <Modal onOk={() => { form.submit() }}{...props}>
       {props.type !== MODAL_TYPES.VIEW ?  
        <Form
          form={form}
          layout="vertical"
          name="form_in_modal"
          onFinish={formSubmit}
          initialValues={props.data}
        >
          <Form.Item
            name="productName"
            label="Name"
            rules={[
              {
                required: true,
                message: 'Please enter product name!!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="productDescription" label="Description">
            <TextArea rows={3} size="large" />
          </Form.Item>
          <Row gutter={24}>
            <Col span={8}>
              <Form.Item name="quantity" label="Quantity"
                rules={[
                  {
                    required: true,
                    message: 'Please enter product quantity!!',
                  }]}>
                <Input type="number" min="1" maxLength={4} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="price" label="Price"
                rules={[
                  {
                    required: true,
                    message: 'Please enter product price!!',
                  }]}>
                <Input type="number" min="1" maxLength={7} />
              </Form.Item>
            </Col>
            {props.type === MODAL_TYPES.EDIT ? 
              <Col span={8}>
              <Form.Item name="status" label="Availability" valuePropName="checked"
                rules={[
                  {
                    required: true,
                    message: 'Please enter product availability!!',
                  }]}>
                <Checkbox checked={check} onChange={onChange}>Available</Checkbox>
              </Form.Item>
            </Col> : <></>
            }
          
          </Row>
          <Form.Item
            name="image"
            label="Profile Image"
            labelCol={{ span: 24 }}
            valuePropName="list"
          >
              {props.data.image ? (
                        <Upload
                            {...newProps}
                            name="image"
                            beforeUpload={() => false}
                            listType="picture"
                            maxCount={1}
                        > <Button icon={<UploadOutlined />}>
                        Click to Upload
                      </Button></Upload>
                  ) : (
            <Upload 
              name="image"
              beforeUpload={() => false}
              listType="picture"
              maxCount={1}
            >
              <Button icon={<UploadOutlined />}>
                Click to Upload
              </Button>
            </Upload> )}

          </Form.Item>
        </Form> : 
        <>   
        <h3>{props.data.productName}</h3>
        {props.data.productDescription ? <p>{props.data.productDescription}</p> : <p>It is best...Try it once!!</p>}
        <h3>Rs. {props.data.price}</h3>
        {props.data.quantity < 5 ? <h3>Only {props.data.quantity} stocks are left..Hurry up!!</h3>: <p></p>}
        </>
     
}
      </Modal>
    </>
  )
}
