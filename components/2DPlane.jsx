export default function TwoDPlane(props) {
  const { x, y, data } = props;
  const Plane = [];
  let row = [];
  // Make rows
  for (var i = 1; i <= y; i++) {
    // Make columns
    for (var j = 1; j <= x; j++) {
      // Check position against data and set status
      let status = "dead";
      if (data[i - 1]) {
        if (data[i- 1][j - 1]) {
          status = "alive";
        }
      }
      row.push(<Cell key={`${i}, ${j}`} status={status} x={j} y={i}/>);
    }
    Plane.push(<Row key={i} >{row}</Row>)
    row = [];
  }
  return (
    <div style={planeStyle}>{Plane}</div>
  );
}

// Components

const Row = props => {
  return (
    <div style={rowStyle}>{props.children}</div>
  );
};

const Cell = props => {
  const { status, x, y } = props;
  if (status === "alive") {
    return (
      <div style={aliveCellStyle}></div>
    );
  }
  if (status === "dead") {
    return (
      <div style={deadCellStyle}></div>
    );
  }
};

// Styles

const planeStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const rowStyle = {
  display: "flex",
  flexDirection: "row",
};

const aliveCellStyle = {
  backgroundColor: "#357a38",
  height: 5,
  width: 5
};

const deadCellStyle = {
  backgroundColor: "#b28704",
  height: 5,
  width: 5
};
