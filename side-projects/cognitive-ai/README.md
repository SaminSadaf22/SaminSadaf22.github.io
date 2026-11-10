# Cognitive AI: a global-workspace hypothesis

**Status: hypothesis + prototype. Not a claim of consciousness or sentience.**

This project asks a narrow question: can a small, inspectable loop produce
behaviour that looks like human-like cognition — limited attention, prediction,
affect, memory and a coherent self-report — without pretending that the loop is
actually conscious?

## Hypothesis

Consciousness-like behaviour in an artificial system can be approximated by a
recurrent loop that:

1. predicts the next sensory input,
2. measures prediction error,
3. broadcasts the most salient signals through a small global workspace,
4. integrates the broadcast with decaying memory and affect,
5. selects an action, and
6. emits a first-person report of its current state.

If the same loop produces coherent, adaptive first-person descriptions across
varied inputs, it is a useful **functional** model of human-like cognition. It
is not evidence of phenomenal experience.

## What the prototype implements

The algorithm lives in [`src/lib/cognitive-loop.ts`](../../src/lib/cognitive-loop.ts).

- **Channels:** threat, reward, novelty, social presence, fatigue.
- **Predictive processing:** each channel keeps an expectation; the gap between
  expectation and observation becomes prediction error.
- **Global workspace:** only the two most salient channels are broadcast.
- **Affect:** valence (pleasant/unpleasant) and arousal (calm/activated) are
  updated from reward, threat, prediction error and social presence.
- **Memory:** a decaying trace that mixes error, arousal and valence stability.
- **Action selection:** approach, withdraw, explore or hold.
- **Self-report:** a deterministic sentence generated from the workspace,
  error, memory, feeling and action.

The report says “I feel…” because that is the interface being tested. It is a
generated description of internal variables, not a felt experience.

## Run the CLI demo

From the repository root (Node 22.18+ can execute the TypeScript module directly):

```bash
node side-projects/cognitive-ai/demo.mjs
```

The demo runs four scripted situations (quiet room, unexpected noise, friendly
signal, tired and overstimulated) and prints the workspace, affect, action and
self-report after each tick.

## Run the interactive version

```bash
npm install
npm run dev
```

Open `/projects/cognitive-ai` and move the five input sliders, then step the
loop. The page is a static Astro page; the loop runs in the browser.

## Falsifiable predictions

A useful hypothesis should be able to fail. These are the checks this prototype
is designed to make possible:

1. **Workspace ablation:** removing the two-channel bottleneck should make
   action selection less stable under conflicting inputs, not more stable.
2. **Affect ablation:** removing valence and arousal should reduce adaptive
   prioritisation of threat and reward.
3. **Report grounding:** the self-report should track the internal variables
   (workspace, error, affect) rather than simply repeat the input labels.
4. **Memory ablation:** removing the memory trace should make the reported
   state jump around more between similar inputs.

None of these tests would show that the system is conscious. They test whether
the architecture behaves coherently enough to be worth studying.

## Limitations

- The loop is deterministic and hand-designed; it does not learn.
- “Feeling” is a label derived from two scalar variables, not a subjective state.
- The workspace is a top-two sort, not a biological global neuronal workspace.
- There is no body, no continuous sensorimotor stream and no social learning.
- The prototype is a conceptual instrument, not a benchmark or a publication.

## Related work to read next

The design borrows the vocabulary of global workspace theory, predictive
processing and constructed emotion, but it is not an implementation of any of
them. Reading those literatures is the next step before making stronger claims.
