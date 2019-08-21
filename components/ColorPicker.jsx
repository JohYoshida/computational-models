import Cell from "./Cell";

export default function ColorPicker(props) {
  const colors = [
    "#aa2e25",
    "#a31545",
    "#6d1b7b",
    "#482880",
    "#2c387e",
    "#1769aa",
    "#0276aa",
    "#008394",
    "#00695f",
    "#357a38",
    "#618833",
    "#8f9a27",
    "#b2a429",
    "#b28704",
    "#b26a00",
    "#b23c17",
  ];
  const { id, updateColor } = props;
  return (
    <div style={colorPickerStyle}>
      <label>Color {id}</label>
      <div style={row}>
        <div onClick={updateColor.bind(this, id, colors[0])} >
          <Cell size={10} color={colors[0]} />
        </div>
        <div onClick={updateColor.bind(this, id, colors[1])} >
          <Cell size={10} color={colors[1]} />
        </div>
        <div onClick={updateColor.bind(this, id, colors[2])} >
          <Cell size={10} color={colors[2]} />
        </div>
        <div onClick={updateColor.bind(this, id, colors[3])} >
          <Cell size={10} color={colors[3]} />
        </div>
        <div onClick={updateColor.bind(this, id, colors[4])} >
          <Cell size={10} color={colors[4]} />
        </div>
        <div onClick={updateColor.bind(this, id, colors[5])} >
          <Cell size={10} color={colors[5]} />
        </div>
        <div onClick={updateColor.bind(this, id, colors[6])} >
          <Cell size={10} color={colors[6]} />
        </div>
        <div onClick={updateColor.bind(this, id, colors[7])} >
          <Cell size={10} color={colors[7]} />
        </div>
      </div>
      <div style={row}>
        <div onClick={updateColor.bind(this, id, colors[8])} >
          <Cell size={10} color={colors[8]} />
        </div>
        <div onClick={updateColor.bind(this, id, colors[9])} >
          <Cell size={10} color={colors[9]} />
        </div>
        <div onClick={updateColor.bind(this, id, colors[10])} >
          <Cell size={10} color={colors[10]} />
        </div>
        <div onClick={updateColor.bind(this, id, colors[11])} >
          <Cell size={10} color={colors[11]} />
        </div>
        <div onClick={updateColor.bind(this, id, colors[12])} >
          <Cell size={10} color={colors[12]} />
        </div>
        <div onClick={updateColor.bind(this, id, colors[13])} >
          <Cell size={10} color={colors[13]} />
        </div>
        <div onClick={updateColor.bind(this, id, colors[14])} >
          <Cell size={10} color={colors[14]} />
        </div>
        <div onClick={updateColor.bind(this, id, colors[15])} >
          <Cell size={10} color={colors[15]} />
        </div>
      </div>
    </div>
  );
}

const colorPickerStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center"
};

const row = {
  display: "flex",
  flexDirection: "row"
};
