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
      figure: [1],
      ground: [2, 4],
      groundSize: 2,
      current: 0,
    };
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
  };

  updateInputY = evt => {
    const y = Number(evt.target.value);
    this.setState({ y });
  };

  updateColor = (target, color) => {
    if (target === 1) {
      this.setState({ firstColor: color });
    }
    if (target === 2) {
      this.setState({ secondColor: color });
    }
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
