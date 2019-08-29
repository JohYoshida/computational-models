import { Component } from "react";
import KeyHandler from "react-key-handler";
import Layout from "../components/Layout";
import Controls from "../components/Controls";
import InputNumber from "../components/InputNumber";
import Button from "../components/Button";
import TwoDPlane from "../components/TwoDPlane";
import ColorPicker from "../components/ColorPicker";

export default class GameOfLife extends Component {
  constructor(props) {
    super(props);
    this.state = {
      x: 25,
      y: 25,
      spawnChance: 50,
      step: 1,
      evolveSteps: 10,
      data: [{}],
      history: [[]],
      aliveColor: "#357a38",
      deadColor: "#b28704",
      stamp: "Cell"
    };
  }

  componentDidMount() {
    this.randomize();
  }

  render() {
    const {
      x,
      y,
      spawnChance,
      step,
      evolveSteps,
      data,
      history,
      aliveColor,
      deadColor
    } = this.state;
    return (
      <Layout>
        <Controls>
          <div style={columnStyle}>
            <InputNumber
              name={"X"}
              val={x}
              updateVal={this.updateInputX}
              displayValue={false}
            />
            <InputNumber
              name={"Y"}
              val={y}
              updateVal={this.updateInputY}
              displayValue={false}
            />
            <InputNumber
              name={"Random Spawn Chance"}
              val={spawnChance}
              max={100}
              updateVal={this.updateInputSpawnChance}
              displayValue={false}
            />
            <div style={rowStyle}>
              <Button name="Randomize" onPress={this.randomize} />
              <Button name="Reset" onPress={this.reset} />
              <Button name="Step Forward" onPress={this.stepForward} />
              <Button name={`Evolve ${evolveSteps} Steps`} onPress={this.evolve} />
              <InputNumber
                name={""}
                val={evolveSteps}
                updateVal={this.updateInputEvolveSteps}
                displayRange={false}
                displayValue={false}
              />
            </div>
            <InputNumber
              name={"Step"}
              val={step}
              max={history.length}
              updateVal={this.updateInputStep}
              displayNumber={false}
            />
            <div style={rowStyle}>
              <Button
                name="Cell"
                onPress={this.changeStamp.bind(this, "Cell")}
              />
              <Button
                name="Diamond"
                onPress={this.changeStamp.bind(this, "Diamond")}
              />
              <Button
                name="Pulsar"
                onPress={this.changeStamp.bind(this, "Pulsar")}
              />
            </div>
          </div>
          <div style={columnStyle}>
            <ColorPicker id={1} updateColor={this.updateColor} />
            <ColorPicker id={2} updateColor={this.updateColor} />
          </div>
        </Controls>
        <TwoDPlane
          x={x}
          y={y}
          data={data}
          firstColor={deadColor}
          secondColor={aliveColor}
          defaultStatus="dead"
          click={this.handleClick}
          mouseEnter={this.handleMouseEnter}
          mouseLeave={this.handleMouseLeave}
        />
        <KeyHandler keyValue="a" onKeyHandle={this.handleKeyPress} />
        <KeyHandler keyValue="d" onKeyHandle={this.handleKeyPress} />
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

  updateInputSpawnChance = evt => {
    const spawnChance = Number(evt.target.value);
    this.setState({ spawnChance });
  };

  updateInputStep = evt => {
    const { history } = this.state;
    const step = Number(evt.target.value);
    this.setState({ step, data: history[step - 1] });
  };

  updateInputEvolveSteps = evt => {
    const evolveSteps = Number(evt.target.value);
    this.setState({ evolveSteps });
  };

  handleKeyPress = evt => {
    const { history, data, step } = this.state;
    if (evt.key === "a") {
      if (history.length > 1 && step > 1) {
        this.setState({
          data: history[step - 2],
          step: step - 1
        });
      }
    }
    if (evt.key === "d") {
      if (history.length === step) {
        // Most recent state
        this.stepForward();
      } else {
        // Intermediate state
        this.setState({
          data: history[step],
          step: step + 1
        });
      }
    }
  };

  handleClick = (i, j) => {
    const { data, history, step, stamp, x, y } = this.state;
    let pattern = makePatternCoords(stamp, i, j, x, y);
    pattern.forEach(pos => {
      if (data[pos[0]][pos[1]] === "hover" || !data[pos[0]][pos[1]]) {
        data[pos[0]][pos[1]] = "alive";
      } else {
        delete data[pos[0]][pos[1]];
      }
    });
    history[step - 1] = data;
    this.setState({ data, history });
  };

  handleMouseEnter = (i, j) => {
    const { data, stamp, x, y } = this.state;
    let pattern = makePatternCoords(stamp, i, j, x, y);
    pattern.forEach(pos => {
      data[pos[0]][pos[1]]
        ? (data[pos[0]][pos[1]] += " hover")
        : (data[pos[0]][pos[1]] = "hover");
    });
    this.setState({ data });
  };

  handleMouseLeave = (i, j) => {
    const { data, stamp, x, y } = this.state;
    let pattern = makePatternCoords(stamp, i, j, x, y);
    pattern.forEach(pos => {
      if (data[pos[0]][pos[1]]) {
        data[pos[0]][pos[1]] === "hover"
          ? delete data[pos[0]][pos[1]]
          : (data[pos[0]][pos[1]] = data[pos[0]][pos[1]].replace(" hover", ""));
      }
    });
    this.setState({ data });
  };

  updateColor = (target, color) => {
    if (target === 1) {
      this.setState({ deadColor: color });
    }
    if (target === 2) {
      this.setState({ aliveColor: color });
    }
  };

  randomize = () => {
    const { x, y, spawnChance } = this.state;
    const data = [];
    const history = [];
    for (var i = 1; i <= y; i++) {
      let row = {};
      for (var j = 1; j <= x; j++) {
        let random = Math.floor(Math.random() * 100) + 1;
        if (random <= spawnChance) {
          row[j] = "alive";
        }
      }
      data.push(row);
    }
    history.push(data);
    this.setState({ step: 1, data, history });
  };

  reset = () => {
    const { y } = this.state;
    const data = [];
    for (var i = 0; i < y; i++) {
      data.push({});
    }
    const history = [data];
    this.setState({ step: 1, data, history });
  };

  stepForward = () => {
    const { x, y, data, history } = this.state;
    const newData = [];
    for (var i = 0; i < y; i++) {
      let row = {};
      for (var j = 1; j <= x; j++) {
        let isAlive = data[i][j] ? true : false;
        // check neighbors
        let neighbourCount = countNeighbours(data, i, j, x, y);
        // decide fate
        let willLive = decideFate(isAlive, neighbourCount);
        if (willLive) row[j] = "alive";
      }
      newData.push(row);
    }
    history.push(newData);
    this.setState({ data: newData, history, step: history.length });
  };

  evolve = () => {
    const { evolveSteps } = this.state;
    for (var i = 0; i < evolveSteps; i++) {
      setTimeout(() => {
        this.stepForward();
      }, 100);
    }
  };

  changeStamp = type => {
    this.setState({ stamp: type });
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

function countNeighbours(data, i, j, x, y) {
  let aliveCount = 0;
  const above = i - 1 >= 0 ? i - 1 : y - 1;
  const below = i + 1 < y ? i + 1 : 0;
  const left = j - 1 >= 1 ? j - 1 : y;
  const right = j + 1 <= y ? j + 1 : 1;
  if (!data[above]) {
    data[above] = {};
  } else {
    // check above left
    if (data[above][left] === "alive") aliveCount++;
    // check above
    if (data[above][j] === "alive") aliveCount++;
    // check above right
    if (data[above][right] === "alive") aliveCount++;
  }
  // check left
  if (data[i][left] === "alive") aliveCount++;
  // check right
  if (data[i][right] === "alive") aliveCount++;
  if (!data[below]) {
    data[below] = {};
  } else {
    // check below left
    if (data[below][left] === "alive") aliveCount++;
    // check below
    if (data[below][j] === "alive") aliveCount++;
    // check below right
    if (data[below][right] === "alive") aliveCount++;
  }
  return aliveCount;
}

function decideFate(isAlive, aliveCount) {
  let willLive;
  if (isAlive) {
    switch (aliveCount) {
      case 0: // underpopulation
      case 1: // underpopulation
        willLive = false;
        break;
      case 2: // survival
      case 3: // survival
        willLive = true;
        break;
      case 4: // overpopulation
      case 5: // overpopulation
      case 6: // overpopulation
      case 7: // overpopulation
      case 8: // overpopulation
        willLive = false;
        break;
      default:
        console.log(
          "Something went wrong in decideFate function.",
          id,
          aliveCount,
          isAlive
        );
    }
  } else {
    if (aliveCount === 3) {
      // reproduction
      willLive = true;
    } else willLive = false;
  }
  return willLive;
}

function makePatternCoords(stamp, i, j, x, y) {
  let pattern = [];
  if (stamp === "Cell") {
    pattern.push([i, j]);
  } else if (stamp === "Diamond") {
    pattern = makeDiamond(i, j, x, y);
  } else if (stamp === "Pulsar") {
    pattern = makePulsar(i, j, x, y);
  }
  return pattern;
}

function makeDiamond(i, j, x, y) {
  const pattern = [];
  const above_1 = i - 1 >= 0 ? i - 1 : y - 1;
  const above_2 = i - 2 >= 0 ? i - 2 : y - Math.abs(i - 2);
  const below_1 = i + 1 < y ? i + 1 : 0;
  const below_2 = i + 2 < y ? i + 2 : Math.abs(i + 2 - y);
  const left_1 = j - 1 >= 1 ? j - 1 : y;
  const left_2 = j - 2 >= 1 ? j - 2 : y - Math.abs(j - 2);
  const right_1 = j + 1 <= y ? j + 1 : 1;
  const right_2 = j + 2 <= y ? j + 2 : Math.abs(j + 2 - y);

  pattern.push([above_2, j]);
  pattern.push([above_1, left_1]);
  pattern.push([i, left_2]);
  pattern.push([below_1, left_1]);
  pattern.push([below_2, j]);
  pattern.push([below_1, right_1]);
  pattern.push([i, right_2]);
  pattern.push([above_1, right_1]);

  return pattern;
}

function makePulsar(i, j, x, y) {
  const pattern = [];
  const above = {};
  for (var a = 1; a <= 6; a++) {
    above[a] = i - a >= 0 ? i - a : y - Math.abs(i - a);
  }
  const below = {};
  for (var a = 1; a <= 6; a++) {
    below[a] = i + a < y ? i + a : Math.abs(i + a - y);
  }
  const left = {};
  for (var a = 1; a <= 6; a++) {
    left[a] = j - a >= 1 ? j - a : y - Math.abs(j - a);
  }
  const right = {};
  for (var a = 1; a <= 6; a++) {
    right[a] = j + a <= y ? j + a : Math.abs(j + a - y);
  }

  pattern.push([above[6], left[4]]);
  pattern.push([above[6], left[3]]);
  pattern.push([above[6], left[2]]);
  pattern.push([above[6], right[2]]);
  pattern.push([above[6], right[3]]);
  pattern.push([above[6], right[4]]);

  pattern.push([above[4], right[6]]);
  pattern.push([above[3], right[6]]);
  pattern.push([above[2], right[6]]);
  pattern.push([below[2], right[6]]);
  pattern.push([below[3], right[6]]);
  pattern.push([below[4], right[6]]);

  pattern.push([below[6], left[4]]);
  pattern.push([below[6], left[3]]);
  pattern.push([below[6], left[2]]);
  pattern.push([below[6], right[2]]);
  pattern.push([below[6], right[3]]);
  pattern.push([below[6], right[4]]);

  pattern.push([above[4], left[6]]);
  pattern.push([above[3], left[6]]);
  pattern.push([above[2], left[6]]);
  pattern.push([below[2], left[6]]);
  pattern.push([below[3], left[6]]);
  pattern.push([below[4], left[6]]);

  pattern.push([above[4], left[1]]);
  pattern.push([above[3], left[1]]);
  pattern.push([above[2], left[1]]);
  pattern.push([below[2], left[1]]);
  pattern.push([below[3], left[1]]);
  pattern.push([below[4], left[1]]);

  pattern.push([above[4], right[1]]);
  pattern.push([above[3], right[1]]);
  pattern.push([above[2], right[1]]);
  pattern.push([below[2], right[1]]);
  pattern.push([below[3], right[1]]);
  pattern.push([below[4], right[1]]);

  pattern.push([above[1], left[4]]);
  pattern.push([above[1], left[3]]);
  pattern.push([above[1], left[2]]);
  pattern.push([above[1], right[2]]);
  pattern.push([above[1], right[3]]);
  pattern.push([above[1], right[4]]);

  pattern.push([below[1], left[4]]);
  pattern.push([below[1], left[3]]);
  pattern.push([below[1], left[2]]);
  pattern.push([below[1], right[2]]);
  pattern.push([below[1], right[3]]);
  pattern.push([below[1], right[4]]);

  return pattern;
}
