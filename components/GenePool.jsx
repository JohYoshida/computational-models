import GeneSequence from "./GeneSequence";

export default function GenePool(props) {
  const {
    genePool,
    fitnessPool,
    rankPool,
    timesCooperated,
    maxStates,
    rounds
  } = props;

  // Initialize columns
  const KeyColumn = [
    <div key={"Sequence"} style={text}>
      Sequence
    </div>
  ];
  const GenePoolColumn = [
    <GeneSequence key="key" sequence={"key"} maxStates={maxStates} />
  ];
  const ScoresColumn = [
    <div key={"Fitness"} style={text}>
      Fitness
    </div>
  ];
  const DifferenceColumn = [
    <div key={"Rank"} style={text}>
      Rank
    </div>
  ];
  const CooperationColumn = [
    <div key={"Rank"} style={text}>
      Cooperation
    </div>
  ];

  // Fill columns
  genePool.forEach((sequence, index) => {
    KeyColumn.push(
      <div key={index} style={text}>
        {index + 1}
      </div>
    );
    GenePoolColumn.push(
      <GeneSequence key={index} sequence={sequence} maxStates={maxStates} />
    );
    // Make sure rank numbers are preceded by their sign
    let diff = rankPool[index] >= 0 ? `+${rankPool[index]}` : rankPool[index];
    DifferenceColumn.push(
      <div key={index} style={text}>
        {diff}
      </div>
    );
    ScoresColumn.push(
      <div key={index} style={text}>
        {fitnessPool[index]}
      </div>
    );
    CooperationColumn.push(
      <div key={index} style={text}>
        {timesCooperated[index]
          ? `${Math.round(
              Number(timesCooperated[index]) *
                100 /
                (rounds * maxStates * maxStates) *
                100
            ) / 100}%`
          : ""}
      </div>
    );
    // {timesCooperated[index]}
  });

  return (
    <div style={GenePoolStyle}>
      <div style={column}>{KeyColumn}</div>
      <div style={column}>{GenePoolColumn}</div>
      <div style={column}>{ScoresColumn}</div>
      <div style={column}>{DifferenceColumn}</div>
      <div style={column}>{CooperationColumn}</div>
    </div>
  );
}

// Styles
const GenePoolStyle = {
  display: "Flex",
  flexDirection: "row",
  textAlign: "right"
};

const row = {
  display: "flex",
  flexDirection: "row"
};

const column = {
  display: "flex",
  flexDirection: "column",
  marginRight: 5
};

const text = {
  fontSize: 13,
  fontFamily: "sans-serif"
};
