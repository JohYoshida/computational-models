export default function Cell(props) {
  let { status, size, color, click, mouseEnter, mouseLeave } = props;

  // Set size
  !size ? (size = 5) : (size = size);
  // Set click function
  !click ? (click = null) : (click = click);
  // Set mouse enter function
  !mouseEnter ? (mouseEnter = null) : (mouseEnter = mouseEnter);
  // Set mouse leave function
  !mouseLeave ? (mouseLeave = null) : (mouseLeave = mouseLeave);

  // Configure styles
  let rgb = color ? hexToRgb(color) : hexToRgb("#BDBDBD");
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
  const hoverCellStyle = {
    backgroundColor: `rgba(${rgb["r"]}, ${rgb["g"]}, ${rgb["b"]}, 0.5)`,
    height: size,
    width: size
  };
  const customCellStyle = {
    backgroundColor: color,
    height: size,
    width: size
  };

  // Select style
  let style = {};
  if (status === "alive") {
    style = aliveCellStyle;
  } else if (status === "dead") {
    style = deadCellStyle;
  } else if (status === "hover" || status === "alive hover") {
    style = hoverCellStyle;
  }
  if (!status && color) {
    style = customCellStyle;
  }

  return (
    <div
      style={style}
      onClick={click}
      onMouseEnter={mouseEnter}
      onMouseLeave={mouseLeave}
    />
  );
}

function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      }
    : null;
}
