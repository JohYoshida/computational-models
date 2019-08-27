export default function Controls(props) {
  return <div style={controlsStyle}>{props.children}</div>;
}

// Styles

const controlsStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "row",
  boxShadow: "0px 6px 20px rgba(0, 0, 0, 0.06)",
  margin: 20
};
