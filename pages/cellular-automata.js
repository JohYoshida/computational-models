import { Component } from "react";
import Layout from "../components/Layout";
import TwoDPlane from "../components/2DPlane";
import Controls from "../components/Controls";
import InputNumber from "../components/InputNumber";
import RulePanel from "../components/RulePanel";
import Button from "../components/Button";

export default class CellularAutomata extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rule: 22,
      x: 20,
      y: 1,
      data: [{}]
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
          <Button name="Reset" onPress={this.resetStart} />
          <Button name="Randomize Start" onPress={this.randomizeStart} />
          <Button name="Advance State" onPress={this.advanceState} />
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

  advanceState = () => {
    const { data, rule, x, y } = this.state;
    const state = {};
    // Get binary representation of rule #
    const binaryRule = makeBinaryRule(rule);
    for (var i = 1; i <= x; i++) {
      // Check against rule
      let num = checkRule(binaryRule, data[data.length - 1], i, x);
      if (num) {
        state[i] = "alive";
      }
    }
    data.push(state);
    this.setState({ y: y + 1, data });
  };

  resetStart = () => {
    this.setState({ y: 1, data: [{}] });
  };

  randomizeStart = () => {
    const { x } = this.state;
    const data = [{}];
    for (var i = 1; i <= x; i++) {
      let random = Math.floor(Math.random() * 2);
      if (random > 0) {
        data[0][i] = "alive";
      }
    }
    this.setState({ y: 1, data: data });
  };
}

function makeBinaryRule(rule) {
  let binaryRule = rule.toString(2);
  while (binaryRule.length < 8) {
    binaryRule = "0" + binaryRule;
  }
  return binaryRule;
}

function checkRule(binaryRule, data, i, length) {
  let num;
  let left = i === 1 ? length : i - 1;
  let right = i === length ? 1 : i + 1;
  // Check left neighbour
  if (!data[left]) {
    // Check self
    if (!data[i]) {
      // Check right neighbour
      if (!data[right]) {
        num = binaryRule[7];
      } else if (data[right]) {
        num = binaryRule[6];
      }
    } else if (data[i]) {
      // Check right neighbour
      if (!data[right]) {
        num = binaryRule[5];
      } else if (data[right]) {
        num = binaryRule[4];
      }
    }
  } else if (data[left]) {
    // Check self
    if (!data[i]) {
      // Check right neighbour
      if (!data[right]) {
        num = binaryRule[3];
      } else if (data[right]) {
        num = binaryRule[2];
      }
    } else if (data[i]) {
      // Check right neighbour
      if (!data[right]) {
        num = binaryRule[1];
      } else if (data[right]) {
        num = binaryRule[0];
      }
    }
  } else {
    console.log("Error in App.js function checkRule()");
  }
  return Number(num);
}
