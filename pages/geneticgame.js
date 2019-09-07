import { Component } from "react";
import Layout from "../components/Layout";

export default class GeneticGame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      poolSize: 30,
      maxStates: 16,
      genePool: [],
    };
  }

  render() {
    return (
      <Layout>
        
      </Layout>
    );
  }

  /**
   * Generates a gene sequence of zeroes and ones. Length depends on maxStates.
   * @return {String} Gene sequence.
   */
  generateGeneSequence() {
    let sequence = "";
    // Measure the binary digits required to designate each state transition;
    const digits = (this.state.maxStates - 1).toString(2).length;
    // Measure the length of the gene sequence
    const length = digits + this.state.maxStates * (1 + 2 * digits);
    console.log(length);
    for (var i = 0; i < length; i++) {
      let gene = Math.floor(Math.random() * 2);
      sequence += gene;
    }
    return sequence;
  }

  /**
   * Generates an array of gene sequences and saves it to the state.
   * @return {genePool} Alters state.
   */
  generateGenePool() {
    const { poolSize } = this.state;
    const genePool = [];
    // Fill gene pool
    for (var i = 0; i < poolSize; i++) {
      let sequence = this.generateGeneSequence();
      genePool.push(sequence);
    }
    this.setState({ genePool });
  }
}
