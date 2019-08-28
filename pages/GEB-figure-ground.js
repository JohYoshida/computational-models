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
    };
  }

  render() {
    const { data, x, y } = this.state;
    return (
      <Layout>
        <Controls>
        </Controls>
        <TwoDPlane
          x={x}
          y={y}
          data={this.state.data}
          defaultStatus="dead"
        />
      </Layout>
    );
  }
}
