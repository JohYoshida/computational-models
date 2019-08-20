export default function Controls(props) {
  return (
    <div style={controlsStyle}>
      {props.children}
    </div>
  );
}

// Styles

const controlsStyle = {
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  marginBottom: 20,
};
