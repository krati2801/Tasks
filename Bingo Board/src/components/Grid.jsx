import React, { useRef, useState, useEffect } from "react";
import { Typography } from "antd";
import { Card } from 'antd';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './Home.css'

export default function Grid(props) {
    let [data, setData] = useState([]);
    let rows = 5;
    let col = 5;
  
    return((() => {
    const options = [];
    for(var i=0; i<rows; i++){
        options.push(
            <>
         <Row xs="auto">
              {(() => {
                 const optionss = [];
                 for(var j=0; j<col; j++){
                    let a = Math.floor(Math.random() * 100)
                    optionss.push( <Col>{a}</Col>);
                    data.push(a)
                
                 }
                 return optionss;
                })()}
        </Row>
        {/* <br></br> */}
        </>)
    }
    console.log("dd", data)
    return options;
})())
}
