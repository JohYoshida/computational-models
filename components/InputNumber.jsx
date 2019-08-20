export default function InputNumber(props) {
  return(
    <div>
      <label>{props.name}</label>
      <input
        type="range"
        name="X"
        min={typeof(props.min) !== "undefined" ? props.min : "1"}
        max={typeof(props.max) !== "undefined" ? props.max : "256"}
        step="1"
        value={props.val}
        onChange={evt => props.updateVal(evt)}
        />
      <input
        style={inputStyle}
        type="number"
        min={typeof(props.min) !== "undefined" ? props.min : "1"}
        max={typeof(props.max) !== "undefined" ? props.max : "256"}
        step="1"
        value={props.val}
        onChange={evt => props.updateVal(evt)}
        />
    </div>
  );
}

const inputStyle = {
  width: 50,
}
