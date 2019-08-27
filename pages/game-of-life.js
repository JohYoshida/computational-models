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
      stage: 1,
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
    const { x, y, stage, data, history, aliveColor, deadColor } = this.state;
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
              <Button name="Step Forward One Stage" onPress={this.stepForward} />
              <Button name="Evolve!" onPress={this.evolve} />
            </div>
            <InputNumber
              name={"Stage"}
              val={stage}
              max={history.length}
              updateVal={this.updateInputStage}
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

  updateInputStage = evt => {
    const stage = Number(evt.target.value);
    this.setState({ stage });
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
    this.setState({ stage: 1, data, history });
  }

  reset = () => {
    const history = [[{}]];
    const data = history[0];
    this.setState({ stage: 1, data, history });
  }

  stepForward = () => {

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
