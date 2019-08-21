export default function InputNumber(props) {

  const range = (props.displayRange === false) ? null : (
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

  const number = (props.displayNumber === false) ? null : (
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

  const value = (props.displayValue === false) ? null : props.val;

  return (
    <div>
      <label>{props.name}</label>
      { range }
      { number }
      { value }
    </div>
  );
}

// Styles

const inputStyle = {
  width: 50
};
