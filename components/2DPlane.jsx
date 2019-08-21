import Cell from "./Cell";

export default function TwoDPlane(props) {
  const { x, y, data } = props;
  const Plane = [];
  let row = [];
  // Make rows
  for (var i = 1; i <= y; i++) {
    // Make columns
    for (var j = 1; j <= x; j++) {
      // Check position against data and set status
      let index = i - 1;
      let status;
      if (data[index]) {
        status = data[index][j] ? data[index][j] : "dead";
      } else status = "dead";
      row.push(<Cell key={`${i}, ${j}`} status={status} />);
    }
    Plane.push(<Row key={i}>{row}</Row>);
    row = [];
  }
  return <div style={planeStyle}>{Plane}</div>;
}

// Components

const Row = props => {
  return <div style={rowStyle}>{props.children}</div>;
};

// Styles

const planeStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center"
};

const rowStyle = {
  display: "flex",
  flexDirection: "row"
};
