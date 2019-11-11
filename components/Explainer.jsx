import Link from "next/link";
import Cell from "./Cell";
import GeneSequence from "./GeneSequence";
import GenePool from "./GenePool";
import { generateSequence } from "../scripts/finiteautomata";

export default function Explainer(props) {
  // Define colors
  const spacer = "#ffffff";
  const moves = ["#00f00f", "#f00f00"];
  // Distinct color space generated with I Want Hue https://medialab.github.io/iwanthue/
  const colors = [
    "#ff4281",
    "#b77445",
    "#ce6810",
    "#ffb705",
    "#9d9d00",
    "#acd700",
    "#cbd9a0",
    "#c7ffa2",
    "#01b736",
    "#429369",
    "#01f1b0",
    "#01c0a4",
    "#f1adff",
    "#c94edc",
    "#fd00c7",
    "#ff5baf"
  ];

  const sequence =
    props.sequence.length > 0 ? props.sequence : generateSequence(16);

  const initial = parseInt(sequence.slice(0, 4), 2);
  let a = initial * 9 + 4,
    b = initial * 9 + 5;
  const move = parseInt(sequence.slice(a, b), 2);
  (a = b), (b = b + 4);
  const cooperate = parseInt(sequence.slice(a, b), 2);
  (a = b), (b = b + 4);
  const defect = parseInt(sequence.slice(a, b), 2);
  let c = cooperate * 9 + 4;
  let d = defect * 9 + 4;
  const move2 =
    move === 0
      ? parseInt(sequence.slice(c, c + 1), 2)
      : parseInt(sequence.slice(d, d + 1), 2);
  const cellSize = 5;
  return (
    <div style={block}>
      <h4>What am I looking at?</h4>
      <div style={block}>
        <span>
          This is a simulation meant to model the coevolution of strategies in
          the repeated Prisoner's Dilemma game using finite state machines or
          finite automata as players, based on{" "}
          <Link href="https://www.santafe.edu/research/results/working-papers/the-coevolution-of-automata-in-the-repeated-prison">
            <a target="blank">John Miller's 1989 paper</a>
          </Link>
          . First, a population of automata with random strategies is generated.
          Every generation, each automaton is tested against every other
          automaton in 150 rounds of Prisoner's Dilemma and rewarded points
          based on their joint decision. The automata's accumulated score
          represents its fitness. The most fit automata survive to the next
          generation, and reproduce through a process similar to genetic
          crossover and mutation.
        </span>
      </div>
      <h4>The Repeated Prisoner's Dilemma</h4>
      <div style={block}>
        <span>
          The Prisoner’s Dilemma is a well-studied game in economics and game
          theory. In the game, two players must simultaneously and independently
          choose whether to cooperate{" "}
          <span style={inline}>
            <Cell status={"gene"} size={cellSize} color={moves[0]} />
          </span>{" "}
          with each other, or defect{" "}
          <span style={inline}>
            <Cell status={"gene"} size={cellSize} color={moves[1]} />
          </span>
          . If both players cooperate, they are each given a medium payout. If
          one player defects, they are given a large payout, while the
          cooperator recieves nothing. If both players defect, they recieve a
          small payout. Below are the payouts used in this model.
        </span>
        <div style={block}>
          <div style={flex}>
            <div style={border}>
              <Cell status={"geneKey"} size={cellSize + 1.5} color={spacer} />
            </div>
            <div style={border}>
              <Cell
                status={"geneKey"}
                size={cellSize + 1.5}
                color={moves[0]}
                text="P2"
              />
            </div>
            <div style={border}>
              <Cell
                status={"geneKey"}
                size={cellSize + 1.5}
                color={moves[1]}
                text="P2"
              />
            </div>
          </div>
          <div style={flex}>
            <div style={border}>
              <Cell
                status={"geneKey"}
                size={cellSize + 1.5}
                color={moves[0]}
                text="P1"
              />
            </div>
            <div style={border}>
              <Cell
                status={"geneKey"}
                size={cellSize + 1.5}
                color={spacer}
                text="3,3"
              />
            </div>
            <div style={border}>
              <Cell
                status={"geneKey"}
                size={cellSize + 1.5}
                color={spacer}
                text="0,5"
              />
            </div>
          </div>
          <div style={flex}>
            <div style={border}>
              <Cell
                status={"geneKey"}
                size={cellSize + 1.5}
                color={moves[1]}
                text="P1"
              />
            </div>
            <div style={border}>
              <Cell
                status={"geneKey"}
                size={cellSize + 1.5}
                color={spacer}
                text="5,0"
              />
            </div>
            <div style={border}>
              <Cell
                status={"geneKey"}
                size={cellSize + 1.5}
                color={spacer}
                text="1,1"
              />
            </div>
          </div>
          <div style={flex}>
            <i style={italics}>(payouts are ordered P1, P2)</i>
          </div>
        </div>
        <span>
          Famously, in single-round versions of the game, players acting in
          their own self-interest don’t recieve the optimal outcome. However,
          when the game is repeated a finite but unknown (to the players) number
          of times, cooperative strategies can emerge. In this model, the game
          is repeated 150 times by each pairing of automata. Each round, the
          payout is added to the automata's fitness score. Fitness scores will
          be used to model the effects of selective pressures on the population.
        </span>
      </div>
      <h4>Genome of a Finite Automaton</h4>
      <div style={block}>
        <span>
          In our model, an automaton is represented by a color-coded sequence
          that describes all its states, the action to play in the game at each
          state, and transitions between states. This is like a genome for an
          automaton.
          <div style={flex}>
            <GeneSequence sequence={sequence} maxStates={16} />
          </div>
        </span>
        <span>
          The first codon tells us which state the automaton starts the game in,
          and is followed by 16 three-codon genes that represent each of the
          automaton's states.
          <div style={flex}>
            <GeneSequence sequence={"key"} maxStates={16} />
          </div>
          <div style={flex}>
            <GeneSequence sequence={sequence} maxStates={16} />
          </div>
        </span>
        <div>
          In this case, the player starts in state{" "}
          <Cell
            status={"geneKey"}
            size={cellSize}
            color={colors[initial] ? colors[initial] : spacer}
            text={initial ? initial : ""}
          />
          . The corresponding gene contains these codons:{" "}
          <span style={inline}>
            <Cell status={"gene"} size={cellSize} color={moves[move]} />
            <Cell status={"gene"} size={cellSize} color={colors[cooperate]} />
            <Cell status={"gene"} size={cellSize} color={colors[defect]} />
          </span>
        </div>
        <div>
          The first codon in a gene tells us the move the automoton will play.
          In this case, the player will {move === 0 ? "cooperate" : "defect"}:{" "}
          <span style={inline}>
            <Cell status={"gene"} size={cellSize} color={moves[move]} />
          </span>
        </div>
        <div>
          The next codon tells us which state to transition to for the next
          round if the opponent cooperated:{" "}
          <Cell
            status={"geneKey"}
            size={cellSize}
            color={colors[cooperate] ? colors[cooperate] : spacer}
            text={cooperate ? cooperate : ""}
          />
        </div>
        <div>
          The last codon tells us which state to move to if the opponent
          defected:{" "}
          <Cell
            status={"geneKey"}
            size={cellSize}
            color={colors[defect] ? colors[defect] : spacer}
            text={defect ? defect : ""}
          />
        </div>
        <div>
          So if this automata was faced against its twin, in round 1 both
          automata would {move === 0 ? "cooperate" : "defect"}, then move to
          state{" "}
          <Cell
            status={"geneKey"}
            size={cellSize}
            color={move === 0 ? colors[cooperate] : colors[defect]}
            text={move === 0 ? cooperate : defect}
          />. They would then {move2 === 0 ? "cooperate" : "defect"} in round 2.
          Both players would be awarded {move === 0 ? "3 points" : "1 point"} in
          round 1 and {move2 === 0 ? "3 points" : "1 point"} in round 2.
        </div>
      </div>
      <h4>Evolution</h4>
      <div style={block}>
        <span>
          The fitness of each automaton is measured by its performance in the
          Repeated Prisoners Dilemma against each other automata in the
          population. The population of automata are ranked by their fitness in
          descening order.{" "}
        </span>
        <span>
          Each generation, the 10 lowest-performance automata are removed from
          the gene pool. The surviving automata are crossbred to refill the gene
          pool. Two parents are randomly selected from the pool. A random
          crossover index is selected along the automaton's gene sequence, and a
          new child sequence is constructed from the first half of one parent
          sequence and the second half of the other parent sequence. Then, each
          codon is subjected to a chance of mutation.{" "}
        </span>
        <span>
          Crossover allows for successful patterns to be propagated through the
          population by natural selection, while mutation adds enough variety to
          push the population out of local maxima.{" "}
        </span>
        <span>
          The result of this process is seen in the striated vertical patterns
          that begin to appear in the gene pool. Successful patterns start to
          emerge within just a few generations, and by generation 20 the pool is
          typically dominated by a single "family" of strategies. This family
          may be overthrown by a successful mutation, which jumps up the
          rankings and quickly propagates.
        </span>
      </div>
    </div>
  );
}

// Styles

const block = {
  fontFamily: "sans-serif"
};

const flex = {
  display: "flex",
  justifyContent: "center"
};

const border = {
  display: "flex",
  justifyContent: "center",
  padding: 1
};

const inline = {
  display: "inline-flex"
};

const italics = {
  fontSize: 10
};
