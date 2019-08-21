export default function Button(props) {
  return (
    <button type="button" onClick={props.onPress}>
      {props.name ? props.name : "Button"}
    </button>
  );
}

const buttonStyle = {};
