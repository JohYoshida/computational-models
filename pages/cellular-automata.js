import { Component } from "react";
import Layout from "../components/Layout";
import TwoDPlane from "../components/TwoDPlane";
import Controls from "../components/Controls";
import InputNumber from "../components/InputNumber";
import RulePanel from "../components/RulePanel";
import Button from "../components/Button";
import ColorPicker from "../components/ColorPicker";

export default class CellularAutomata extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rule: 22,
      x: 20,
      y: 1,
      spawnChance: 50,
      aliveColor: "#357a38",
      deadColor: "#b28704",
      data: [{}]
    };
  }

  componentDidMount() {
    this.randomizeStart();
  }

  render() {
    const { rule, x, y, spawnChance, aliveColor, deadColor } = this.state;
    return (
      <Layout>
        <Controls>
          <div style={columnStyle}>
            <InputNumber
              name="Rule"
              val={rule}
              updateVal={this.updateRule}
              min={0}
              max={255}
              displayValue={false}
            />
            <InputNumber
              name="X"
              val={x}
              updateVal={this.updateInputX}
              displayValue={false}
            />
            <InputNumber
              name="Spawn Chance"
              val={spawnChance}
              updateVal={this.updateSpawnChance}
              min={1}
              max={99}
              displayNumber={false}
            />
            <div style={rowStyle}>
              <Button name="Randomize Start" onPress={this.randomizeStart} />
              <Button name="Reset" onPress={this.resetStart} />
            </div>
            <div style={rowStyle}>
              <Button name="Advance State" onPress={this.advanceState} />
              <Button
                name="Rapid Advance State"
                onPress={this.rapidAdvanceState}
              />
            </div>
          </div>
          <div style={columnStyle}>
            <RulePanel
              changeRule={this.changeRule}
              binaryRule={makeBinaryRule(rule)}
              aliveColor={aliveColor}
              deadColor={deadColor}
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
          firstColor={deadColor}
          secondColor={aliveColor}
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

  updateSpawnChance = evt => {
    const spawnChance = Number(evt.target.value);
    this.setState({ spawnChance });
  };

  updateColor = (target, color) => {
    if (target === 1) {
      this.setState({ deadColor: color });
    }
    if (target === 2) {
      this.setState({ aliveColor: color });
    }
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
    this.setState({ y: data.length, data });
  };

  rapidAdvanceState = () => {
    for (var i = 0; i < this.state.x; i++) {
      this.advanceState();
    }
  };

  resetStart = () => {
    this.setState({ y: 1, data: [{}] });
  };

  randomizeStart = () => {
    const { x, spawnChance } = this.state;
    const data = [{}];
    for (var i = 1; i <= x; i++) {
      let random = Math.floor(Math.random() * 100) + 1;
      if (random < spawnChance) {
        data[0][i] = "alive";
      }
    }
    this.setState({ y: 1, data });
  };
}

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
