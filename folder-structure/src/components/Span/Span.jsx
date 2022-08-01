import './Span.css';

export default function Span(props) {
    return (
        <span class="span1"><i className={props.className} onClick={() => props.clickFunction()}></i></span>
    )
}