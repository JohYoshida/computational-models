import { Component } from "react";
import Layout from "../components/Layout";
import TwoDPlane from "../components/2DPlane";
import Controls from "../components/Controls";
import InputNumber from "../components/InputNumber"

export default class CellularAutomata extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rule: 22,
      x: 5,
      y: 5,
      data: [
        [1, 2, 3, 4, 5],
        [4, 5, null, null, 6],
        [7, 8, 9],
        null,
        [10, 11, 12]
      ],
    };
  }

  render() {
    const { rule, x, y } = this.state;
    return (
      <Layout>
        <Controls>
          <InputNumber name={"Rule"} val={rule} updateVal={this.updateRule} max={255} min={0} />
          <InputNumber name={"X"} val={x} updateVal={this.updateInputX} />
          <InputNumber name={"Y"} val={y} updateVal={this.updateInputY} />
        </Controls>
        <TwoDPlane x={x} y={y} data={this.state.data}/>
      </Layout>
    )
  }

  updateRule = evt => {
    const rule = Number(evt.target.value);
    this.setState({ rule });
  }

  updateInputX = evt => {
    const x = Number(evt.target.value);
    this.setState({ x });
  }

  updateInputY = evt => {
    const y = Number(evt.target.value);
    this.setState({ y });
  }
}
