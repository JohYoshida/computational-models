export default function Cell(props) {
  let { status, size, color, click, mouseEnter, mouseLeave, text } = props;

  // Set size
  !size ? (size = 5) : (size = size);
  // Set click function
  !click ? (click = null) : (click = click);
  // Set mouse enter function
  !mouseEnter ? (mouseEnter = null) : (mouseEnter = mouseEnter);
  // Set mouse leave function
  !mouseLeave ? (mouseLeave = null) : (mouseLeave = mouseLeave);

  // Configure styles
  let style = {};
  // Binary color styles
  if (status === "alive") {
    style = {
      backgroundColor: color ? color : "#357a38",
      height: size,
      width: size
    };
  } else if (status === "dead") {
    style = {
      backgroundColor: color ? color : "#b28704",
      height: size,
      width: size
    };
  } else if (status === "hover" || status === "alive hover") {
    let rgb = color ? hexToRgb(color) : hexToRgb("#BDBDBD");
    style = {
      backgroundColor: `rgba(${rgb["r"]}, ${rgb["g"]}, ${rgb["b"]}, 0.5)`,
      height: size,
      width: size
    };
  }
  // Genetics styles
  if (status === "gene") {
    style = {
      backgroundColor: color,
      height: size * 3,
      width: size
    };
  } else if (status === "geneKey") {
    style = {
      backgroundColor: color,
      height: size * 3,
      width: size * 3,
      fontSize: size * 2,
      textAlign: "center"
    };
  }
  // Misc styles
  if (!status && color) {
    style = {
      backgroundColor: color,
      height: size,
      width: size
    };
  }

  return (
    <div
      style={style}
      onClick={click}
      onMouseEnter={mouseEnter}
      onMouseLeave={mouseLeave}
    >
      {text}
    </div>
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
