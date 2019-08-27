import { Component } from "react";
import Layout from "../components/Layout";
import Controls from "../components/Controls";
import InputNumber from "../components/InputNumber";
import Button from "../components/Button";
import TwoDPlane from "../components/TwoDPlane";

export default class GameOfLIfe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      x: 25,
      y: 25,
      stage: 1,
      data: [{3: "alive"}],
      history: [[]],
      aliveColor: "#357a38",
      deadColor: "#b28704",
    };
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
          // TODO: add onPress functions
            <div style={rowStyle}>
              <Button name="Randomize" onPress={this.randomize} />
              <Button name="Reset" onPress={this.reset} />
              <Button name="Step Forward One Stage" onPress={this.stepForward} />
              <Button name="Evolve!" onPress={this.evolve} />
            </div>
            // TODO: add max value
            <InputNumber
              name={"Stage"}
              val={stage}
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

  }

  reset = () => {

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
