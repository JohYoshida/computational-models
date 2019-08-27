import { Component } from "react";
import Layout from "../components/Layout";
import Controls from "../components/Controls";
import InputNumber from "../components/InputNumber";
import Button from "../components/Button";
import TwoDPlane from "../components/TwoDPlane";

export default class GameOfLife extends Component {
  constructor(props) {
    super(props);
    this.state = {
      x: 25,
      y: 25,
      step: 1,
      data: [{}],
      history: [[]],
      aliveColor: "#357a38",
      deadColor: "#b28704",
    };
  }

  componentDidMount() {
    this.randomize();
  }

  render() {
    const { x, y, step, data, history, aliveColor, deadColor } = this.state;
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
            <div style={rowStyle}>
              <Button name="Randomize" onPress={this.randomize} />
              <Button name="Reset" onPress={this.reset} />
              <Button name="Step Forward" onPress={this.stepForward} />
              <Button name="Evolve!" onPress={this.evolve} />
            </div>
            <InputNumber
              name={"Step"}
              val={step}
              max={history.length}
              updateVal={this.updateInputStep}
              displayNumber={false}
            />
            <div style={rowStyle}>
              <Button name="Cell" onPress={this.setStamp.bind(this, "Cell")} />
              <Button name="Diamond" onPress={this.setStamp.bind(this, "Diamond")} />
              <Button name="Pulsar" onPress={this.setStamp.bind(this, "Pulsar")} />
            </div>
          </div>
        </Controls>
        <TwoDPlane
          x={x}
          y={y}
          data={data}
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
  }

  updateInputY = evt => {
    const y = Number(evt.target.value);
    this.setState({ y });
  }

  updateInputStep = evt => {
    const step = Number(evt.target.value);
    this.setState({ step });
  }

  randomize = () => {
    const { x, y } = this.state;
    const data = [];
    const history = [];
    for (var i = 1; i <= y; i++) {
      let row = {};
      for (var j = 1; j <= x; j++) {
        let random = Math.floor(Math.random() * 100) + 1;
        if (random < 50) {
          row[j] = "alive";
        }
      }
      data.push(row);
    }
    history.push(data);
    this.setState({ step: 1, data, history });
  }

  reset = () => {
    const { y } = this.state;
    const data = [];
    for (var i = 0; i < y; i++) {
      data.push({});
    }
    const history = [data];
    this.setState({ step: 1, data, history });
  }

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
  }

  evolve = () => {

  }

  setStamp = type => {
    console.log(type);
  }
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
  const above = (i - 1 >= 0) ? i - 1 : y - 1;
  const below = (i + 1 < y) ? i + 1 : 0;
  const left = (j - 1 >= 1) ? j - 1 : y;
  const right = (j + 1 <= y) ? j + 1 : 1
  // check above left
  if (data[above][left] === "alive") aliveCount++;
  // check above
  if (data[above][j] === "alive") aliveCount++;
  // check above right
  if (data[above][right] === "alive") aliveCount++;
  // check left
  if (data[i][left] === "alive") aliveCount++;
  // check right
  if (data[i][right] === "alive") aliveCount++;
  // check below left
  if (data[below][left] === "alive") aliveCount++;
  // check below
  if (data[below][j] === "alive") aliveCount++;
  // check below right
  if (data[below][right] === "alive") aliveCount++;
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
  return willLive
}
