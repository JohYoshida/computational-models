/**
 * Generates a sequence of binary digits that designates the behaviour
 * of a finite state automaton.
 * Length depends on maxStates.
 * @param  {Number} maxStates Number of states the finite automaton will have.
 * @return {String}           Sequence.
 */
const generateSequence = maxStates => {
  let sequence = "";
  // Measure the binary digits required to designate each state
  const digits = (maxStates - 1).toString(2).length;
  // Measure the desired length of the sequence
  const length = digits + maxStates * (1 + 2 * digits);
  // Make sequence
  for (var i = 0; i < length; i++) {
    let gene = Math.floor(Math.random() * 2);
    sequence += gene;
  }
  return sequence;
};

/**
 * Translates a valid gene sequence into a Player .
 * @param  {String} sequence  Binary gene sequence.
 * @param  {Number} maxStates Number of states the finite automaton will have.
 * @param  {Number} id        Sequence's index in gene pool.
 * @return {Object}           Designates behaviour of a finite state automaton.
 */
const makePlayer = (sequence, maxStates, id) => {
  // Measure the binary digits required to designate each transition function
  const digits = (maxStates - 1).toString(2).length;
  // Translate initial state from sequence
  const initial = parseInt(sequence.slice(0, digits), 2);
  const states = [];
  // Fill states
  for (var i = 0; i < maxStates; i++) {
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
  // Return player in form of finite state machine.
  return {
    id,
    context: {
      round: 0,
      score: 0,
      current: initial,
      timesCooperated: 0
    },
    initial,
    states
  };
};

export { generateSequence, makePlayer };
