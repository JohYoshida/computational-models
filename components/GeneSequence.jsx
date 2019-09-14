import Cell from "./Cell";

export default function GeneSequence(props) {
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

  const { sequence, maxStates } = props;
  const cells = [];
  const cellSize = 5;
  // Make sequence key
  if (sequence === "key") {
    // Add spacers
    cells.push(
      <Cell key={"initial"} status={"gene"} size={cellSize} color={spacer} />
    );
    cells.push(
      <Cell
        key={"spacer-initial"}
        status={"gene"}
        size={cellSize / 4}
        color={spacer}
      />
    );
    // Add key and spacer for each state
    for (var i = 0; i < maxStates; i++) {
      cells.push(
        <Cell
          key={i}
          status={"geneKey"}
          size={cellSize}
          color={colors[i]}
          text={i}
        />
      );
      cells.push(
        <Cell
          key={`spacer-${i}`}
          status={"gene"}
          size={cellSize / 4}
          color={spacer}
        />
      );
    }
    return <div style={row}>{cells}</div>;
  } else if (sequence) {
    // Measure the binary digits required to designate each transition function
    const digits = (maxStates - 1).toString(2).length;
    // Translate initial state from sequence
    const initial = parseInt(sequence.slice(0, digits), 2);
    // Add initial state and spacer
    cells.push(
      <Cell
        key={"initial"}
        status={"gene"}
        size={cellSize}
        color={colors[initial]}
      />
    );
    cells.push(
      <Cell key={"spacer"} status={"gene"} size={cellSize / 4} color={spacer} />
    );
    // Fill states
    for (var i = 0; i < maxStates; i++) {
      // Calculate starting index of state packet on sequence
      let index = digits + i * (1 + 2 * digits);
      // Translate data from packet and add to corresponding array
      let move = parseInt(sequence.slice(index, index + 1));
      let coopTransition = parseInt(sequence.slice(index + 1, index + 5), 2);
      let defectTransition = parseInt(
        sequence.slice(index + 5, index + 1 + 2 * digits),
        2
      );
      // Add cells for move, cooperative and defective transitions
      cells.push(
        <Cell
          key={`move-${i}`}
          status={"gene"}
          size={cellSize}
          color={moves[move]}
        />
      );
      cells.push(
        <Cell
          key={`coop-${i}`}
          status={"gene"}
          size={cellSize}
          color={colors[coopTransition]}
        />
      );
      cells.push(
        <Cell
          key={`defect-${i}`}
          status={"gene"}
          size={cellSize}
          color={colors[defectTransition]}
        />
      );
      cells.push(
        <Cell
          key={`spacer-${i}`}
          status={"gene"}
          size={cellSize / 4}
          color={spacer}
        />
      );
    }
    return <div style={row}>{cells}</div>;
  } else return <div />;
}

// Styles

const row = {
  display: "flex",
  flexDirection: "row",
  marginBottom: 2
};
