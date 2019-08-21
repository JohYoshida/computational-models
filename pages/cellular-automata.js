import { Component } from "react";
import Layout from "../components/Layout";
import TwoDPlane from "../components/2DPlane";
import Controls from "../components/Controls";
import InputNumber from "../components/InputNumber";
import RulePanel from "../components/RulePanel";

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
      ]
    };
  }

  render() {
    const { rule, x, y } = this.state;
    return (
      <Layout>
        <Controls>
          <InputNumber
            name={"Rule"}
            val={rule}
            updateVal={this.updateRule}
            max={255}
            min={0}
          />
          <InputNumber name={"X"} val={x} updateVal={this.updateInputX} />
          <RulePanel
            changeRule={this.changeRule}
            binaryRule={makeBinaryRule(rule)}
          />
        </Controls>
        <TwoDPlane x={x} y={y} data={this.state.data} />
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

  updateRule = evt => {
    const rule = Number(evt.target.value);
    this.setState({ rule });
  };

  changeRule = (index, value) => {
    let binaryRule = makeBinaryRule(this.state.rule);
    // flip value
    value ? (value = 0) : (value = 1);
    // construct and apply new rule
    let arr = binaryRule.split("");
    arr[index] = value;
    let newBinaryRule = arr.join("");
    const rule = parseInt(newBinaryRule, 2);
    this.setState({ rule });
  };
}

function makeBinaryRule(rule) {
  let binaryRule = rule.toString(2);
  while (binaryRule.length < 8) {
    binaryRule = "0" + binaryRule;
  }
  return binaryRule;
}
