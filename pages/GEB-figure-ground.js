import { Component } from "react";
import Layout from "../components/Layout";
import TwoDPlane from "../components/TwoDPlane";
import Controls from "../components/Controls";
import InputNumber from "../components/InputNumber";
import RulePanel from "../components/RulePanel";
import Button from "../components/Button";
import ColorPicker from "../components/ColorPicker";

export default class GEBFigureGround extends Component {
  constructor(props) {
    super(props);
    this.state = {
      x: 20,
      y: 20,
      data: [{}],
      firstColor: "#b28704",
      secondColor: "#357a38",
      lvl1: [0],
      lvl2: [2],
      lvl3: [1],
      index: 0,
    };
  }

  componentDidMount() {
    this.extend();
  }

  render() {
    const { data, x, y, firstColor, secondColor } = this.state;
    return (
      <Layout>
        <Controls>
          <div style={columnStyle}>
            <InputNumber
              name="X"
              val={x}
              updateVal={this.updateInputX}
              min={1}
              max={256}
              displayValue={false}
            />
            <InputNumber
              name="Y"
              val={y}
              updateVal={this.updateInputY}
              min={1}
              max={256}
              displayValue={false}
            />
          </div>
          <div style={columnStyle}>
            <ColorPicker id={1} updateColor={this.updateColor} />
            <ColorPicker id={2} updateColor={this.updateColor} />
          </div>
        </Controls>
        <TwoDPlane
          x={x}
          y={y}
          data={this.state.data}
          firstColor={firstColor}
          secondColor={secondColor}
          defaultStatus="dead"
        />
      </Layout>
    );
  }

  updateInputX = evt => {
    const x = Number(evt.target.value);
    this.setState({ x });
    this.extend();
  };

  updateInputY = evt => {
    const y = Number(evt.target.value);
    this.setState({ y });
    this.extend();
  };

  updateColor = (target, color) => {
    if (target === 1) {
      this.setState({ firstColor: color });
    }
    if (target === 2) {
      this.setState({ secondColor: color });
    }
  };

  extend = () => {
    const { lvl1, lvl2, lvl3, x, y } = this.state;
    const max = x * y;
    
    for (var index = this.state.index; lvl1[index] <= max; index++) {
      let next2, next3;
      lvl1.push(lvl2[lvl2.length - 1] - 1);
      for (var count = 1; count <= lvl3[index]; count++) {
        let last3 = lvl3.length - 1;
        next3 = (count === lvl3[index]) ? (lvl3[last3] + 2) : (lvl3[last3] + 1);
        lvl3.push(next3);
        next2 = (count === lvl3[index]) ? lvl2[last3] + 2 : lvl2[last3] + 1;
        lvl2.push(next2);
      }
    }
    this.setState({ lvl1, lvl2, lvl3, index });
  };
}

// Styles
const rowStyle = {
  display: "flex",
  flexDirection: "row"
};

const columnStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  margin: 10
};
