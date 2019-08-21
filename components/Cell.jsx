export default function Cell(props) {
  let { status, size } = props;
  if (!size) {
    size = 5;
  }

  const aliveCellStyle = {
    backgroundColor: "#357a38",
    height: size,
    width: size
  };

  const deadCellStyle = {
    backgroundColor: "#b28704",
    height: size,
    width: size
  };

  if (status === "alive") {
    return <div style={aliveCellStyle} />;
  }
  if (status === "dead") {
    return <div style={deadCellStyle} />;
  }
}

// Styles
