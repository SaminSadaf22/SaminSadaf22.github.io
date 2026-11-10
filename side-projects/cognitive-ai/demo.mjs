import {
  DEFAULT_INPUT,
  createState,
  step,
} from "../../src/lib/cognitive-loop.ts";

/**
 * A small scripted run of the loop. Node 24 can execute the TypeScript module
 * directly through its built-in type stripping.
 *
 * Run from the repository root:
 *   node side-projects/cognitive-ai/demo.mjs
 */
const scenarios = [
  {
    label: "quiet room",
    input: { ...DEFAULT_INPUT, threat: 0.05, reward: 0.5, novelty: 0.1, social: 0.35, fatigue: 0.7 },
  },
  {
    label: "unexpected noise",
    input: { ...DEFAULT_INPUT, threat: 0.75, reward: 0.2, novelty: 0.8, social: 0.2, fatigue: 0.2 },
  },
  {
    label: "friendly signal",
    input: { ...DEFAULT_INPUT, threat: 0.1, reward: 0.8, novelty: 0.2, social: 0.9, fatigue: 0.15 },
  },
  {
    label: "tired and overstimulated",
    input: { ...DEFAULT_INPUT, threat: 0.45, reward: 0.3, novelty: 0.7, social: 0.6, fatigue: 0.9 },
  },
];

let state = createState();

for (const scenario of scenarios) {
  state = step(state, scenario.input);

  console.log(`\n[${scenario.label}] tick ${state.tick}`);
  console.log(`workspace : ${state.workspace.join(" + ")}`);
  console.log(
    `valence   : ${state.valence.toFixed(2)}   arousal: ${state.arousal.toFixed(
      2,
    )}   memory: ${state.memory.toFixed(2)}`,
  );
  console.log(`feeling   : ${state.feeling}`);
  console.log(`action    : ${state.action}`);
  console.log(`self-report: ${state.narrative}`);
}
