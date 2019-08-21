export default function Cell(props) {
  let { status, size, color } = props;
  if (!size) {
    size = 5;
  }

  const aliveCellStyle = {
    backgroundColor: color ? color : "#357a38",
    height: size,
    width: size
  };

  const deadCellStyle = {
    backgroundColor: color ? color : "#b28704",
    height: size,
    width: size
  };

  const customCellStyle = {
    backgroundColor: color,
    height: size,
    width: size
  };

  if (status === "alive") {
    return <div style={aliveCellStyle} />;
  }
  if (status === "dead") {
    return <div style={deadCellStyle} />;
  }
  if (!status && color) {
    return <div style={customCellStyle} />;
  }
  return null;
}

// Styles
