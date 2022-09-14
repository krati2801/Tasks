import React, { useRef, useState, useEffect } from "react";
import { Typography } from "antd";
//import { Button } from 'antd';
import { Card } from 'antd';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Grid from './Grid';
import './Home.css'

export default function Home() {
    let[num, setnum] = useState([]);
    const [count, setCount] = useState(0);
    let[timer, setTimer] = useState();
    var rand;
    var count1 = 0;
    useEffect(() => {
       getGrid();
    }, [])

    const getGrid = () =>{
        let b = Array.from({length: 25}, () => Math.floor(Math.random() * 100));
        console.log("timer", timer)
        clearInterval(timer);
        document.getElementById("demo").innerHTML = "";
        changeCss();
        setnum(b)
    }

    const changeCss = () => {
        num.map((x, index) => {
            document.getElementsByClassName('item')[index].style.backgroundColor = "#e5e5e580";
        })
    }

    const changeState = () => {
        doSomething();
    }

    const finish = () => {
        document.getElementById("demo1").innerHTML = "You are winner!";
        clearTimeout(timer);
        document.getElementById("demo").innerHTML = "";
    }
    
    function doSomething() {
        setTimer(setInterval(function() {
                  rand = Math.floor(Math.random() * 100, 500);
                   document.getElementById("demo").innerHTML = rand;
                   num.map((element, index) => { 
                    if(element === rand){
                    count1 = count1 + 1;
                    console.log("cc", count1);
                    return document.getElementsByClassName('item')[index].style.backgroundColor = "green";
                    }
                    });
                //    if(index >= 0){
                //    document.getElementsByClassName('item')[index].style.backgroundColor = "green";
                  // setcount(count+1);
                  // }

                   if(count1 == num.length){
                    getGrid();
                   }
                //    var ele = document.getElementsByClassName('item');
                //    for (var i = 0; i < ele.length; i++ ) {
                //        ele[i].style.display = "block";
                //    }
           }, 1000));
       }

    return (
      
        <>
             {console.log("nn", num.length)}
            <Typography.Title className="main" level={3}>
                Bingo Board
            </Typography.Title>
            <h3 id="demo"></h3>
            <br />
            <Card bordered>
                    <div className="grid-5-by-5">
                   
                    {num.map(number => {
                        return <div className="item">{number}</div>
                       
                    })}
                        </div>
                        <div className="mt-3 d-flex justify-content-center">
                   <button className="mat-focus-indicator me-2 mat-raised-button mat-button-base mat-primary">
                    <span className="mat-button-wrapper" onClick={changeState}>Start</span>
                   </button>
                   <button className="mat-focus-indicator me-2 mat-raised-button mat-button-base mat-primary">
                    <span className="mat-button-wrapper" onClick={getGrid}>Refresh</span>
                   </button>
                   </div>
                   <div id="demo1"></div>
                
                {/* <Button type="primary" style={{backgroundColor : "#1976d2", color: "#fff",fontSize: "14px", marginLeft:"30px"}}
                onClick={changeState}>
     Start
    </Button>&nbsp;&nbsp;
    <Button type="primary" style={{backgroundColor : "#1976d2", color: "#fff",fontSize: "14px"}}>
      Refresh
    </Button> */}
            </Card>
        </>
    );
}
