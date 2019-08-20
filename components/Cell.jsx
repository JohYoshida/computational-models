export default function Cell(props) {
  const { status } = props;
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
