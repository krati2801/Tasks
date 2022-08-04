import './Input.css'

export default function Input(props) {
    return (
        <input className="input" type="text" id={props.id} name={props.name} ref={props.textInput} placeholder={props.placeholder} />
    )
}