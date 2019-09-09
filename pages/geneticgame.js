import { Component } from "react";
import Layout from "../components/Layout";

export default class GeneticGame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      poolSize: 30,
      maxStates: 16,
      rounds: 150,
      mutationChance: 0.5,
      survivalChance: 80,
      genePool: [],
      fitnessPool: [],
      differencePool: [],
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
  makePlayers = id => {
    const { genePool } = this.state;
    const sequence = genePool[id];
    // Measure the binary digits required to designate each transition function
    const digits = (this.state.maxStates - 1).toString(2).length;
    // Translate initial state from sequence
    const initial = parseInt(sequence.slice(0, digits), 2);
    const states = [];
    // Fill states
    for (var i = 0; i < this.state.maxStates; i++) {
      // Calculate starting index of state packet on sequence
      let index = digits + i * (1 + 2 * digits);
      // Translate state data from packet
      let state = {
        move: parseInt(sequence.slice(index, index + 1)),
        cooperative: parseInt(sequence.slice(index + 1, index + 5), 2),
        cooperative: parseInt(sequence.slice(index + 1, index + 1 + digits), 2),
        defective: parseInt(
          sequence.slice(index + 5, index + 1 + 2 * digits),
          2
        )
      };
      states.push(state);
    }
    // Return agent in form of finite state machine.
    return {
      id,
      context: {
        round: 0,
        score: 0,
        current: initial
      },
      initial,
      states
    };
  };

  /**
   * Pits two players in a round of Prisoners' Dilemma
   * @param  {Array} players Two players
   * @return {Array}         Two players with payoffs for this round
   */
  performPrisonersDilemma = players => {
    // Define players
    const Player1 = players[0];
    const Player2 = players[1];
    // Define current states and moves
    let currentState1 = Player1.context.current;
    let currentState2 = Player2.context.current;
    let move1 = Player1.states[currentState1].move;
    let move2 = Player2.states[currentState2].move;
    // Award payoffs and advance states
    let payoff1 = 0,
      payoff2 = 0;
    if (move1 === 0) {
      // Player 1 cooperates
      if (move2 === 0) {
        // Player 2 cooperates
        payoff1 = 3;
        Player1.context.current = Player1.states[currentState1].cooperative;
        payoff2 = 3;
        Player2.context.current = Player2.states[currentState2].cooperative;
      } else if (move2 === 1) {
        // Player 2 defects
        payoff1 = 0;
        Player1.context.current = Player1.states[currentState1].defective;
        payoff2 = 5;
        Player2.context.current = Player2.states[currentState2].cooperative;
      }
    } else if (move1 === 1) {
      // Player 1 defects
      if (move2 === 0) {
        // Player 2 cooperates
        payoff1 = 5;
        Player1.context.current = Player1.states[currentState1].cooperative;
        payoff2 = 0;
        Player2.context.current = Player2.states[currentState2].defective;
      } else if (move2 === 1) {
        // Player 2 defects
        payoff1 = 1;
        Player1.context.current = Player1.states[currentState1].defective;
        payoff2 = 1;
        Player2.context.current = Player2.states[currentState2].defective;
      }
    }
    // Add payoffs to Player contexts
    if (Player1.id === Player2.id) {
      // When playing against self, payoff is averaged
      let payoff = (payoff1 + payoff2) / 2;
      Player1.context.score += payoff;
      Player2.context.score += payoff;
    }
    Player1.context.score += payoff1;
    Player2.context.score += payoff2;
    // Increment round count
    Player1.context.round += 1;
    Player2.context.round += 1;
    return players;
  };

  /**
   * Pits two players against each other for Repeated Prisoners's Dilemma
   * @param  {Number} one Index of player 1.
   * @param  {Number} two Index of player 2.
   * @return {Array}      Two players with performance scores for this game
   */
  playGame = (one, two) => {
    let players = [this.makePlayers(one), this.makePlayers(two)];
    // Play each round
    for (var i = 0; i < this.state.rounds; i++) {
      players = this.performPrisonersDilemma(players);
    }
    return players;
  };

  /**
   * Measure fitness of each gene sequence.
   * Every pair of sequences is translated into finite state machines, which are
   * pitted against each other in Repeated Prisoners' Dilemma. Accumulated score
   * is added to measure of sequence fitness.
   * @return {Promise} No action on resolve
   */
  measureFitness() {
    const { genePool } = this.state;
    const fitnessPool = [];
    // Prepare fitness pool
    for (var i = 0; i < genePool.length; i++) {
      fitnessPool.push(0);
    }
    // Play Repeated Prisoners' Dilemma with every pair of sequences
    for (var i = 0; i < genePool.length; i++) {
      for (var j = 0; j < genePool.length; j++) {
        let players = this.playGame(i, j);
        // Add scores to fitness pool
        fitnessPool[i] += players[0].context.score;
        if (i !== j) {
          fitnessPool[j] += players[1].context.score;
        }
      }
    }
    this.setState({ fitnessPool });
    return new Promise((resolve, reject) => resolve());
  }

  /**
   * Orders gene and fitness pools by associated fitness
   * @return {Object} genePool: Ordered Array of gene sequences
   *                  fitnessPool: Ordered array of fitness scores
   */
  orderGenePool() {
    const { genePool, fitnessPool, poolSize } = this.state;
    const sortedGenePool = [],
      sortedFitnessPool = [],
      differencePool = [];
    // Sort pools by highest fitness
    let count = 0;
    while (sortedGenePool.length < poolSize) {
      // Initialize highest fitness and its index
      let highest = fitnessPool[0];
      let index = 0;
      // Check each sequence for higher fitness
      for (var i = 1; i < genePool.length; i++) {
        if (fitnessPool[i] > highest) {
          // Record fitness and index
          highest = fitnessPool[i];
          index = i;
        }
      }
      // Splice highest performing sequence and move to sorted pool
      let next = genePool.splice(index, 1);
      sortedGenePool.push(next[0]);
      // Do the same for the fitness score
      next = fitnessPool.splice(index, 1);
      sortedFitnessPool.push(next[0]);
      // Calculate difference in fitness rank
      differencePool.push(index - differencePool.length + count);
      count++
    }
    return { genePool: sortedGenePool, fitnessPool: sortedFitnessPool, differencePool };
  }

  /**
   * Reproduces gene sequence, taking parents from existing pool
   * Two parent sequences are mated via crossover and mutation.
   * TODO: bias parent choice by performance
   * @param  {Array} genePool Array of gene sequences
   * @return {String}         Gene sequence
   */
  reproduce = genePool => {
    // Count sequences in pool
    const poolSize = genePool.length;
    // Measure length of gene sequence
    const sequenceLength = genePool[0].length;
    // Generate parent indexes and crossover point
    const one = Math.floor(Math.random() * poolSize);
    const two = Math.floor(Math.random() * poolSize);
    const c = Math.floor(Math.random() * sequenceLength);
    // Crossover two parent sequences
    let sequence =
      genePool[one].slice(0, c) + genePool[two].slice(c, sequenceLength);
    // Mutate child sequence
    const { mutationChance } = this.state;
    // Calculate maximum number for mutation roll
    const max = 100 / mutationChance;
    for (var i = 0; i < sequenceLength; i++) {
      // Roll for mutation
      let num = Math.floor(Math.random() * max) + 1;
      // Critical roll
      if (num === max) {
        // Slice around bit to be mutated
        let front = sequence.slice(0, i);
        let back = sequence.slice(i + 1);
        // Mutate bit
        let mutation = sequence[i] === "1" ? "0" : "1";
        // Stitch gene sequence back together
        sequence = front + mutation + back;
      }
    }
    return sequence;
  };

  /**
   * Applies selective pressures to genePool.
   * Culls lowest performance genes and reproduces highest performance genes,
   * with crossover and mutation.
   * @return { genePool } Alters state
   */
  applySelectivePressures() {
    const { survivalChance, poolSize } = this.state;
    const { genePool, fitnessPool, differencePool } = this.orderGenePool();
    let count = 0;
    // Cull low performance gene sequences
    for (var i = 0; i < genePool.length; i++) {
      // Roll for survival
      let random = Math.floor(Math.random() * 100);
      if (random > survivalChance) {
        // Remove from gene pool
        genePool.pop();
        count++;
      }
    }
    // Reproduce high performance genes to fill pool
    for (var i = 0; i < count; i++) {
      let sequence = this.reproduce(genePool);
      genePool.push(sequence);
    }
    this.setState({ genePool, fitnessPool, differencePool });
  }

}
