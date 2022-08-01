import React, { useEffect, useState } from "react";
import { Typography } from "antd";
import uuid from 'react-uuid'

import ApiHandler from "../Helper/ApiHandler";
import ButtonStructure from '../components/Button/Button'
import Input from "../components/Input/Input";
import Span from "../components/Span/Span"
import List from "./List/List";

import './Folder.css'

export default function Folder() {
    const [visible, setVisibility] = useState(false)
    const [show, setShow] = useState({
        id: "",
        button: false,
        input: false,
        type: false
    })
    const [data, setData] = useState([])

    useEffect(() => {
        getData();
    }, [])

    let textInput = React.createRef();

    async function getData() {
        try {
            let response = await new ApiHandler().get();
            setData(response.data)
        } catch (error) {
            console.log("error:", error);
        }
    }

    async function changeState() {
        setVisibility(true)
    }

    async function displayButton(id) {
        setShow({
            ...show,
            id: id,
            button: true,
            input: false
        });
    }

    async function changeButtonState(event) {
        setShow({
            ...show,
            button: false,
            input: true,
            type: event.target.name
        });
    }

    async function deleteFolder(id) {
        try {
            let filterdata = data.filter(x => x.id === id)

            if (filterdata.length > 0) {
                await new ApiHandler().delete(`/${filterdata[0].id}`)
            }
            else {
                let filteredData = filterID(data, id)
                await new ApiHandler().put(`/${filteredData[0].id}`, filteredData[0]);
            }
            getData();

        } catch (error) {
            console.log("error:", error);
        }

    }

    function filterID(data, id) {
        return data.reduce((arr, item) => {
            if (item.id != id) {
                if (item.children) item.children = filterID(item.children, id)
                arr.push(item)
            }
            return arr
        }, [])
    }

    function resetInput() {
        textInput.current.value = ""
    }

    async function addFolder() {
        try {
            let data1 = {
                "id": uuid(),
                "type": "Folder",
                "name": textInput.current.value,
                "children": []
            }
            await new ApiHandler().post("", data1);
            setVisibility(false);
            getData();
        } catch (error) {
            console.log("error:", error);
        }
    }

    async function findParent(data1, type, value) {
        let result = recursion(data, data1.id)
        data1.children.push({
            "id": uuid(),
            "name": value.current.value,
            "type": type,
            "children": []
        })

        await new ApiHandler().put(`/${result.id}`, result);
        setShow({
            ...show,
            input: false
        })
        getData();
    }

    const recursion = (arr, id) => {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].id === id) {
                return arr[i];
            } else if (arr[i].children && arr[i].children.length) {
                let t = recursion(arr[i].children, id);
                if (t !== false) {
                    t = arr[i]
                    return t;
                }
            }
        }

        return false;
    };

    return (
        <>
            <Typography.Title className="main" level={3}>
                Folder Structure
            </Typography.Title>
            <div className="div1">
                <ButtonStructure changeButtonState={changeState} buttonStyle="btn1" displayname="Add Folder to Root" /><br /><br />

                {
                    data.length > 0 ?
                        <List data={data} show={show} displayButton={displayButton} changeButtonState={changeButtonState} findParent={findParent}
                            deleteFolder={deleteFolder} />

                        : ""
                }

                {visible ?
                    <div className="div2">
                        <Input id="fname" name="fname" placeholder="Enter Folder Name" textInput={textInput} />
                        <Span className="fa fa-plus circle fa_custom" clickFunction={addFolder} />
                        <Span className="fa fa-trash-o" clickFunction={resetInput} />
                    </div> : ""}
            </div>

        </>
    );
}
