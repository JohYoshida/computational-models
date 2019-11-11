import { Component } from "react";
import Layout from "../components/Layout";
import Controls from "../components/Controls";
import Button from "../components/Button";
import InputNumber from "../components/InputNumber";
import GeneSequence from "../components/GeneSequence";
import GenePool from "../components/GenePool";
import Explainer from "../components/Explainer";
import { generateSequence, makePlayer } from "../scripts/finiteautomata";

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
      rankPool: [],
      timesCooperated: [],
      generation: 0,
      explainerSequence: ""
    };
  }

  componentDidMount() {
    this.generateGenePool();
    const explainerSequence = generateSequence(16);
    this.setState({ explainerSequence });
  }

  render() {
    const {
      genePool,
      fitnessPool,
      rankPool,
      timesCooperated,
      maxStates,
      rounds
    } = this.state;
    return (
      <Layout>
        <Controls>
          <Button
            name="Generate Gene Pool"
            onPress={this.generateGenePool.bind(this)}
          />
          <Button
            name="Measure Fitness of Population"
            onPress={this.measureFitness.bind(this)}
          />
          <Button
            name="Apply Selective Pressures"
            onPress={this.applySelectivePressures.bind(this)}
          />
          <Button
            name="Next Generation"
            onPress={this.nextGeneration.bind(this)}
          />
          <Button name="Next 50 Generations" onPress={this.evolve.bind(this)} />
        </Controls>
        Generation {this.state.generation}
        <div style={row} >
          <GenePool
            genePool={genePool}
            fitnessPool={fitnessPool}
            rankPool={rankPool}
            timesCooperated={timesCooperated}
            maxStates={maxStates}
            rounds={rounds}
          />
        <Explainer sequence={this.state.explainerSequence}/>
        </div>
      </Layout>
    );
  }

  /**
   * Generates an array of gene sequences and saves it to the state.
   * @return {genePool} Alters state.
   */
  generateGenePool() {
    const { poolSize, maxStates } = this.state;
    const genePool = [];
    // Fill gene pool
    for (var i = 0; i < poolSize; i++) {
      let sequence = generateSequence(maxStates);
      genePool.push(sequence);
    }
    this.setState({
      genePool,
      fitnessPool: [],
      rankPool: [],
      timesCooperated: [],
      generation: 0
    });
  }

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
      Player1.context.timesCooperated++;
      if (move2 === 0) {
        // Player 2 cooperates
        Player2.context.timesCooperated++;
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
        Player2.context.timesCooperated++;
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
    const { genePool, maxStates } = this.state;
    const sequenceOne = genePool[one];
    const sequenceTwo = genePool[two];
    let players = [makePlayer(sequenceOne, maxStates, one), makePlayer(sequenceTwo, maxStates, two)];
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
    const timesCooperated = [];
    // Prepare pools
    for (var i = 0; i < genePool.length; i++) {
      fitnessPool.push(0);
      timesCooperated.push(0);
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
        // Add cooperation counts to list
        timesCooperated[i] += players[0].context.timesCooperated;
        timesCooperated[j] += players[1].context.timesCooperated;
      }
    }
    this.setState({ fitnessPool, timesCooperated });
    return new Promise((resolve, reject) => resolve());
  }

  /**
   * Orders gene and fitness pools by associated fitness
   * @return {Object} genePool: Ordered Array of gene sequences
   *                  fitnessPool: Ordered array of fitness scores
   */
  orderGenePool() {
    const { genePool, fitnessPool, timesCooperated, poolSize } = this.state;
    const sortedGenePool = [],
      sortedFitnessPool = [],
      sortedTimesCooperated = [],
      rankPool = [];
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
      // Again for cooperation pool
      next = timesCooperated.splice(index, 1);
      sortedTimesCooperated.push(next[0]);
      sortedTimesCooperated.push(next[0]);
      // Calculate difference in fitness rank
      rankPool.push(index - rankPool.length + count);
      count++;
    }
    return {
      genePool: sortedGenePool,
      fitnessPool: sortedFitnessPool,
      timesCooperated: sortedTimesCooperated,
      rankPool
    };
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
    const {
      genePool,
      fitnessPool,
      rankPool,
      timesCooperated
    } = this.orderGenePool();
    let count = 0;
    // Cull low performance gene sequences
    // for (var i = 0; i < genePool.length; i++) {
    //   // Roll for survival
    //   let random = Math.floor((Math.random() * 10) * (Math.random() * 10) * (Math.random() * 10));
    //   if (random * (i / genePool.length)  > survivalChance) {
    //     console.log("Removing", i, "from gene pool", random * (i / poolSize), random, i / poolSize);
    //     // Remove from gene pool
    //     genePool.pop();
    //     count++;
    //   }
    // }
    for (var i = 20; i < poolSize; i++) {
      genePool.pop();
      count++;
    }
    // Reproduce high performance genes to fill pool
    for (var i = 0; i < count; i++) {
      let sequence = this.reproduce(genePool);
      genePool.push(sequence);
    }
    this.setState({ genePool, fitnessPool, rankPool, timesCooperated });
  }

  /**
   * Measures fitness then applies selective pressures
   * @return {null} Alteres state
   */
  nextGeneration() {
    this.measureFitness().then(() => {
      this.applySelectivePressures();
      let { generation } = this.state;
      generation++;
      this.setState({ generation });
    });
  }

  /**
   * Evolve 50 generations
   * TODO: Make number of generations accessible to user input
   * @return {null} Alters state
   */
  evolve = () => {
    for (var i = 0; i < 50; i++) {
      setTimeout(() => {
        this.nextGeneration();
      }, 100);
    }
  };
} // end of class

// Styles

const row = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between"
};

const column = {
  display: "flex",
  flexDirection: "column",
};
