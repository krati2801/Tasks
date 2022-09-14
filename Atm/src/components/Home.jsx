import React, { useRef, useState, useEffect } from "react";
import { Typography } from "antd";
import { Card } from 'antd';
import {Button, Input} from 'antd';
import './Home.css'

export default function Home() {
    const inputRef = useRef(0);
    let [data, setData] = useState({});
    let [errors, setError] = useState({});
    let notes = [100, 50, 20, 10];
    let data1 = {
        '100': 0,
        '50' : 0,
        '20' : 0,
        '10' : 0
    }

    useEffect(() => {
        setData(data1)
    }, [])

    const handleValidation = (value) => {
        let formIsValid = true;
            if(!value){
              formIsValid = false;
              setError({
                "num": "This field is required!"
              })
            }

            if(value % 10 !== 0) {
              formIsValid = false;
              setError({
                "num": "You must enter a value multiple of 10!"
              })
            }

            if(formIsValid){
                setError({})
            }

        return formIsValid;
    }

    const onClick = () => {
        let num = inputRef.current.value;
        if(handleValidation(num)) {
            for(var i = 0; i < notes.length; i++) {
                if(num >= notes[i]) {
                    let a = num % notes[i]
                    let b = Math.floor(num / notes[i])
                    data1[notes[i]] = b
                    num = a;
                }
                else if(num % notes[i] === 0) {
                    break;
                }
                else{
                    continue;
                }
            }
            setData(data1);
        }
        else{
            return false;
        }
    }

    return (
        <>
            <Typography.Title className="main" level={3}>
                ATM
            </Typography.Title>
            <Input.Group compact>
                <div className="div1"><input ref={inputRef} type="number" name="num" />
                    <span className="span1">{errors["num"]}</span></div>
                <Button type="primary" onClick={onClick}>Submit</Button>
            </Input.Group>
            <br />
            <Card title="Notes Availability" bordered>
                {Object.keys(data).map(function (key) {
                    return (
                        <div class="row">
                            <div class="column">
                                <p>No of {key} Notes: {data[key]}</p>
                            </div>
                            <div class="column">
                                <p>{key} * {data[key]}</p>
                            </div>
                            <div class="column">
                                <p>{key * data[key]}</p>
                            </div>
                        </div>
                    )
                })}
                <hr />
                <div class="row">
                    <div className="column div2">
                        <p className="text">Total : {inputRef.current.value}</p>
                    </div>
                </div>
            </Card>
        </>
    );
}
