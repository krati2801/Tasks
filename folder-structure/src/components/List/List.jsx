import React from 'react';

import ButtonStructure from '../Button/Button'
import Span from '../Span/Span'
import Input from '../Input/Input'
import './List.css'

export default function List(props) {
  let textValue = React.createRef();

  function resetInput() {
    textValue.current.value = ""
  }

  return (
    props.data.map(x => {
      return (
        <div style={{ marginLeft: props.isChildren ? "30px" : "0px" }}>
          <ul className="ul-list">
            {x.type === "Folder" ?
              <li><i className="fa fa-folder icon"></i></li> :
              <li><i className="fa fa-file"></i></li>}
            <li className="li-list name">{x.name} </li>

            <li className="li-list hh">
              {x.type === "Folder" ?
                <Span className="fa fa-plus circle fa_custom" clickFunction={() => { props.displayButton(x.id) }} />
                : ""}
              <Span className="fa fa-trash-o" clickFunction={() => { props.deleteFolder(x.id) }} />
            </li>
          </ul>

          {props.show.id === x.id && props.show.button ?
            <div className="div2" style={{ marginLeft: props.isChildren ? "50px" : "30px" }}>
              <ButtonStructure buttonStyle="btn2" changeButtonState={props.changeButtonState} displayname="File" />
              <ButtonStructure buttonStyle="btn2" changeButtonState={props.changeButtonState} displayname="Folder" />
            </div>
            : ""}

          {
            props.show.id === x.id && props.show.input ?
              <div className="div2" style={{ marginLeft: props.isChildren ? "50px" : "30px" }}>
                {props.show.type === "Folder" ? <Span className="fa fa-folder" /> : <Span className="fa fa-file" />}
                <Input id="fname" name="fname" placeholder={`Enter ${props.show.type} Name`} textInput={textValue} />
                <Span className="fa fa-check circle fa_custom i-color" clickFunction={() => props.findParent(x, props.show.type, textValue)} />
                <Span className="fa fa-close circle fa_custom icon-color" clickFunction={resetInput} />
              </div> : ""
          }

          {x.children && x.children.length ?
            <List data={x.children} isChildren="true" show={props.show} displayButton={props.displayButton}
              changeButtonState={props.changeButtonState} findParent={props.findParent} deleteFolder={props.deleteFolder} /> : ""}
        </div>
      )
    }))
}