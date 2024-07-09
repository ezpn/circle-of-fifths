const { span } = van.tags;

export class KeyState {
  constructor(note, color, highlighted = false) {
    this.note = note;
    this.color = color;
    this.highlighted = highlighted;
  }

  getNote() {
    return this.note.val;
  }

  highlight() {
    this.highlighted.val = true;
  }

  darken() {
    this.highlighted.val = false;
  }
}

export const Key = (keyState = new KeyState()) => {
  return span({ class: () => `${keyState.color.val}-key ${keyState.highlighted.val ? 'highlighted' : ''}` });
}
