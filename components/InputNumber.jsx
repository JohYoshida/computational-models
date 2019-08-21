export default function InputNumber(props) {

  const range = (props.range === false) ? null : (
    <input
      type="range"
      name="X"
      min={typeof props.min !== "undefined" ? props.min : "1"}
      max={typeof props.max !== "undefined" ? props.max : "256"}
      step="1"
      value={props.val}
      onChange={evt => props.updateVal(evt)}
    />
  );

  const number = (props.number === false) ? null : (
    <input
      style={inputStyle}
      type="number"
      min={typeof props.min !== "undefined" ? props.min : "1"}
      max={typeof props.max !== "undefined" ? props.max : "256"}
      step="1"
      value={props.val}
      onChange={evt => props.updateVal(evt)}
    />
  );

  return (
    <div>
      <label>{props.name}</label>
      { range }
      { number }
    </div>
  );
}

const inputStyle = {
  width: 50
};
