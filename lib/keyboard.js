import { KeyOctave, KeyOctaveState } from "./keyOctave.js";

const { div } = van.tags;

export class KeyboardState {
  constructor(octaves = 1) {
    this.keyOctaves = Array.from({ length: octaves }, () => new KeyOctaveState());
  }

  highlightKeys(notes) {
    this.keyOctaves.forEach((keyOctave) => keyOctave.highlightKeys(notes));
  }

  darkenKeys() {
    this.keyOctaves.forEach((keyOctave) => keyOctave.darkenKeys());
  }
}

export const Keyboard = (keyboardState = new KeyboardState()) => {
  const keyOctaveNodes = keyboardState.keyOctaves.map((keyOctaveState) => KeyOctave(keyOctaveState));
  
  return div({ class: 'keyboard' },
    ...keyOctaveNodes
  );
}