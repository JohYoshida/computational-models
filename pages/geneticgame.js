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

  /**
   * Translates a valid gene sequence into an Agent.
   * @param  {String} sequence Binary gene sequence.
   * @param  {Number} id       Sequence's index in gene pool.
   * @return {Object}          Finite state machine Agent.
   */
  makeAgent = (id) => {
    const { genePool } = this.state;
    const sequence = genePool[id];
    // Measure the binary digits required to designate each transition function
    const digits = (this.state.maxStates - 1).toString(2).length;
    // Transliate initial state from sequence
    const initial = parseInt(sequence.slice(0, digits), 2);
    const states = [];
    // Fill states
    for (var i = 0; i < this.state.maxStates; i++) {
      // Calculate starting index of state packet on sequence
      let index = digits + i * (1 + (2 * digits));
      // Translate state data from packet
      let state = {
        move: parseInt(sequence.slice(index, index + 1)),
        cooperative: parseInt(sequence.slice(index + 1, index + 5), 2),
        cooperative: parseInt(sequence.slice(index + 1, index + 1 + digits), 2),
        defective: parseInt(sequence.slice(index + 5, index + 1 + (2 * digits)), 2)
      };
      states.push(state);
    }
    // Return agent in form of finite state machine.
    return {
      id,
      context: {
        elapsed: 0,
        performanceScore: 0,
        current: initial
      },
      initial,
      states
    };
  };

}
