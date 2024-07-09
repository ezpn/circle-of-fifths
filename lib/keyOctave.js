import { Key, KeyState } from "./key.js";

const { span } = van.tags;
const keys = [{
  note: 'C',
  color: 'white',
}, {
  note: 'C#',
  color: 'black',
}, {
  note: 'D',
  color: 'white',
}, {
  note: 'D#',
  color: 'black',
}, {
  note: 'E',
  color: 'white',
}, {
  note: 'F',
  color: 'white',
}, {
  note: 'F#',
  color: 'black',
}, {
  note: 'G',
  color: 'white',
}, {
  note: 'G#',
  color: 'black',
}, {
  note: 'A',
  color: 'white',
}, {
  note: 'A#',
  color: 'black',
}, {
  note: 'B',
  color: 'white',
}];

export class KeyOctaveState {
  constructor() {
    this.keys = keys.map((key) => new KeyState(...Object.values(key).map((val) => van.state(val)), van.state(false)));
  }

  highlightKeys(notes) {
    this.keys.forEach((key) => {
      if (notes.includes(key.getNote())) {
        key.highlight();
      }
    })
  }

  darkenKeys() {
    this.keys.forEach((key) => key.darken());
  }
}

export const KeyOctave = (keyOctaveState = new KeyOctaveState()) =>
  span(...keyOctaveState.keys.map((key) => Key(key)));