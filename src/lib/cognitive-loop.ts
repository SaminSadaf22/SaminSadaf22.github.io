/**
 * A small, deterministic "global workspace / affect" loop.
 *
 * This is a functional model, not a claim of consciousness. The loop keeps a
 * prediction of its input, measures prediction error, broadcasts the most
 * salient signals through a tiny workspace, integrates them with decaying
 * memory and affect, then selects an action and emits a first-person
 * self-report. The "I feel" sentence is generated from valence and arousal;
 * it is not evidence of sentience.
 */

export const CHANNELS = ["threat", "reward", "novelty", "social", "fatigue"] as const;

export type Channel = (typeof CHANNELS)[number];
export type CognitiveInput = Record<Channel, number>;
export type CognitiveAction = "approach" | "withdraw" | "explore" | "hold";

export type CognitiveState = {
  tick: number;
  prediction: CognitiveInput;
  error: CognitiveInput;
  salience: CognitiveInput;
  workspace: Channel[];
  valence: number;
  arousal: number;
  memory: number;
  action: CognitiveAction;
  feeling: string;
  narrative: string;
};

export const DEFAULT_INPUT: CognitiveInput = {
  threat: 0.2,
  reward: 0.45,
  novelty: 0.35,
  social: 0.5,
  fatigue: 0.1,
};

export const CHANNEL_LABELS: Record<Channel, string> = {
  threat: "Threat",
  reward: "Reward",
  novelty: "Novelty",
  social: "Social presence",
  fatigue: "Fatigue",
};

const CHANNEL_PHRASES: Record<Channel, string> = {
  threat: "a possible threat",
  reward: "something rewarding",
  novelty: "something unfamiliar",
  social: "another presence",
  fatigue: "my own fatigue",
};

const ACTION_PHRASES: Record<CognitiveAction, string> = {
  approach: "move toward it",
  withdraw: "pull back",
  explore: "explore it",
  hold: "hold and keep watching",
};

const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value));

const average = (values: number[]) =>
  values.reduce((total, value) => total + value, 0) / values.length;

const zeroInput = (): CognitiveInput => ({
  threat: 0,
  reward: 0,
  novelty: 0,
  social: 0,
  fatigue: 0,
});

export function createState(): CognitiveState {
  return {
    tick: 0,
    // A mild prior, deliberately offset from DEFAULT_INPUT so the first tick
    // has a small, visible prediction error rather than a flat start.
    prediction: {
      threat: 0.25,
      reward: 0.4,
      novelty: 0.3,
      social: 0.55,
      fatigue: 0.15,
    },
    error: zeroInput(),
    salience: zeroInput(),
    workspace: [],
    valence: 0,
    arousal: 0.3,
    memory: 0.5,
    action: "hold",
    feeling: "calm",
    narrative: "The loop has not run yet.",
  };
}

export function describeFeeling(
  valence: number,
  arousal: number,
  fatigue = 0,
): string {
  if (arousal > 0.7 && valence < -0.2) return "alarmed";
  if (fatigue >= 0.7 && arousal < 0.75) return "weary";
  if (arousal > 0.65 && valence > 0.2) return "excited";
  if (valence < -0.25 || (valence < -0.1 && arousal > 0.45)) return "uneasy";
  if (valence > 0.3) return "content";
  if (arousal > 0.55) return "curious";
  return "calm";
}

function buildNarrative(
  workspace: Channel[],
  meanError: number,
  memory: number,
  feeling: string,
  action: CognitiveAction,
): string {
  const focus = workspace[0] ?? "novelty";
  const second = workspace[1];

  const focusLine = `I notice ${CHANNEL_PHRASES[focus]} most`;
  const secondLine = second ? `, with ${CHANNEL_PHRASES[second]} close behind` : "";

  return `${focusLine}${secondLine}. Prediction error is ${meanError.toFixed(
    2,
  )} and memory strength is ${memory.toFixed(2)}. I feel ${feeling}. I will ${
    ACTION_PHRASES[action]
  }.`;
}

/**
 * Advance the loop one tick. Pure function: the same state and input always
 * produce the same next state, which makes the hypothesis easy to test.
 */
export function step(state: CognitiveState, input: CognitiveInput): CognitiveState {
  const prediction = zeroInput();
  const error = zeroInput();
  const salience = zeroInput();

  for (const channel of CHANNELS) {
    const observed = clamp(input[channel]);
    const expected = clamp(state.prediction[channel]);

    error[channel] = Math.abs(observed - expected);
    prediction[channel] = clamp(0.8 * expected + 0.2 * observed);

    // Prediction error dominates, but a strong signal and global novelty can
    // also win access to the workspace.
    salience[channel] = clamp(
      0.55 * error[channel] + 0.3 * observed + 0.15 * clamp(input.novelty),
    );
  }

  const workspace = [...CHANNELS]
    .sort(
      (a, b) =>
        salience[b] - salience[a] || CHANNELS.indexOf(a) - CHANNELS.indexOf(b),
    )
    .slice(0, 2);

  const meanError = average(CHANNELS.map((channel) => error[channel]));

  const valence = clamp(
    state.valence * 0.85 +
      0.25 * (input.reward - input.threat) -
      0.15 * meanError +
      0.05 * (input.social - 0.5),
    -1,
    1,
  );

  const arousal = clamp(
    state.arousal * 0.85 +
      0.2 * (input.threat + input.novelty + meanError) -
      0.15 * input.fatigue,
  );

  const memory = clamp(
    state.memory * 0.92 +
      0.08 *
        (0.5 * meanError + 0.3 * arousal + 0.2 * (1 - Math.abs(valence))),
  );

  let action: CognitiveAction = "hold";
  if (input.threat > 0.6 && valence < -0.1) action = "withdraw";
  else if (input.fatigue > 0.65) action = "hold";
  else if (input.reward > 0.55 && valence > 0) action = "approach";
  else if (meanError > 0.35 || input.novelty > 0.6) action = "explore";

  const feeling = describeFeeling(valence, arousal, input.fatigue);
  const narrative = buildNarrative(workspace, meanError, memory, feeling, action);

  return {
    tick: state.tick + 1,
    prediction,
    error,
    salience,
    workspace,
    valence,
    arousal,
    memory,
    action,
    feeling,
    narrative,
  };
}
