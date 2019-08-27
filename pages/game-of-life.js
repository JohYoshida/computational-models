import { Component } from "react";
import Layout from "../components/Layout";
import Controls from "../components/Controls";
import InputNumber from "../components/InputNumber";
import Button from "../components/Button";

export default class GameOfLIfe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      x: 25,
      y: 25,
      stage: 0,
      data: [{}]
    };
  }

  render() {
    const { x, y, stage, data } = this.state;
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
              <Button name="Randomize" onPress={""} />
              <Button name="Reset" onPress={""} />
              <Button name="Step Forward One Stage" onPress={""} />
              <Button name="Evolve!" onPress={""} />
            </div>
            // TODO: add max value
            <InputNumber
              name={"Stage"}
              val={stage}
              updateVal={this.updateInputStage}
              displayNumber={false}
            />
            <div style={rowStyle}>
              <Button name="Cell" onPress={""} />
              <Button name="Diamond" onPress={""} />
              <Button name="Pulsar" onPress={""} />
            </div>
          </div>
        </Controls>
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
