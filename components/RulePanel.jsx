import Cell from "./Cell";

export default function RulePanel(props) {
  return (
    <div style={rulePanel}>
      <Rule
        num={0}
        rule={["dead", "dead", "dead"]}
        changeRule={props.changeRule}
        binaryRule={props.binaryRule}
      />
      <Rule
        num={1}
        rule={["dead", "dead", "alive"]}
        changeRule={props.changeRule}
        binaryRule={props.binaryRule}
      />
      <Rule
        num={2}
        rule={["dead", "alive", "dead"]}
        changeRule={props.changeRule}
        binaryRule={props.binaryRule}
      />
      <Rule
        num={3}
        rule={["dead", "alive", "alive"]}
        changeRule={props.changeRule}
        binaryRule={props.binaryRule}
      />
      <Rule
        num={4}
        rule={["alive", "dead", "dead"]}
        changeRule={props.changeRule}
        binaryRule={props.binaryRule}
      />
      <Rule
        num={5}
        rule={["alive", "dead", "alive"]}
        changeRule={props.changeRule}
        binaryRule={props.binaryRule}
      />
      <Rule
        num={6}
        rule={["alive", "alive", "dead"]}
        changeRule={props.changeRule}
        binaryRule={props.binaryRule}
      />
      <Rule
        num={7}
        rule={["alive", "alive", "alive"]}
        changeRule={props.changeRule}
        binaryRule={props.binaryRule}
      />
    </div>
  );
}

// Components

const Rule = props => {
  const { num, rule, binaryRule } = props;
  const index = 7 - num;
  const value = Number(binaryRule[index]);
  return (
    <div style={ruleStyle}>
      <label>{num}</label>
      <Cell status={rule[0]} size={10} />
      <Cell status={rule[1]} size={10} />
      <Cell status={rule[2]} size={10} />
      <label>=</label>
      <span onClick={props.changeRule.bind(this, index, value)}>
        <Cell status={value ? "alive" : "dead"} size={10} />
      </span>
    </div>
  );
};

// Styles

const ruleStyle = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center"
};

const rulePanel = {};
