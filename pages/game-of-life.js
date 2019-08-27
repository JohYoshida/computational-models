import { Component } from "react";
import Layout from "../components/Layout";
import Controls from "../components/Controls";
import InputNumber from "../components/InputNumber";
import Button from "../components/Button";

export default class GameOfLIfe extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <Layout>
        <Controls>
        </Controls>
      </Layout>
    );
  }
}
