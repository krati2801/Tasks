import './Button.css';

export default function ButtonStructure(props) {
    return (
        <>
            <button name={props.displayname} type="button" className={props.buttonStyle} onClick={(event) => { props.changeButtonState(event) }}>{props.displayname}</button>
        </>
    )
}