/**
 * This circle of fifths comes from a tutorial by LogRocket, available here:
 * https://blog.logrocket.com/interactive-svg-circle-of-fifths/
 * 
 * It was created by Mads Stoumann: https://blog.logrocket.com/author/madsstoumann/
 * He was initially inspired by this poster: https://detkuloerteudvalg.dk/vare/det-kuloerte-udvalg-kvintcirklen-plakat/
 */

import { Keyboard, KeyboardState } from "./keyboard.js";

const { div } = van.tags;
const { svg, path, g, defs, symbol, use, text, tspan } = van.tags("http://www.w3.org/2000/svg")
const data = [{
    keys: ['A', 'B', 'C#', 'D', 'E', 'F#', 'G#'],
    outer: {
      amount: 3,
      use: 'sharp'
    },
    middle: {
      label: 'A'
    },
    inner: {
      label: ['F', tspan({ 'baseline-shift': 'super' }, '#'), 'm']
    }
  }, {
    keys: ['E', 'F#', 'G#', 'A', 'B', 'C#', 'D#'],
    outer: {
      amount: 4,
      use: 'sharp'
    },
    middle: {
      label: 'E'
    },
    inner: {
      label: ['C', tspan({ 'baseline-shift': 'super' }, '#'), 'm']
    }
  }, {
    keys: ['B', 'C#', 'D#', 'E', 'F#', 'G#', 'A#'],
    outer: {
      amount: 5,
      use: 'sharp'
    },
    middle: {
      label: 'B'
    },
    inner: {
      label: ['G', tspan({ 'baseline-shift': 'super' }, '#'), 'm']
    }
  }, {
    keys: ['F#', 'G#', 'A#', 'B', 'C#', 'D#', 'F'],
    outer: {
      amount: 6,
      use: 'sharp'
    },
    middle: {
      label: ['F', tspan({ 'baseline-shift': 'super' }, '#')]
    },
    inner: {
      label: ['D', tspan({ 'baseline-shift': 'super' }, '#'), 'm']
    }
  }, {
    keys: ['C#', 'D#', 'F', 'F#', 'G#', 'A#', 'C'],
    outer: {
      amount: 5,
      use: 'flat'
    },
    middle: {
      label: ['D', tspan({ 'baseline-shift': 'super' }, 'b')]
    },
    inner: {
      label: ['B', tspan({ 'baseline-shift': 'super' }, 'b'), 'm']
    }
  }, {
    keys: ['G#', 'A#', 'C', 'C#', 'D#', 'F', 'G'],
    outer: {
      amount: 4,
      use: 'flat'
    },
    middle: {
      label: ['A', tspan({ 'baseline-shift': 'super' }, 'b')]
    },
    inner: {
      label: 'Fm'
    }
  }, {
    keys: ['D#', 'F', 'G', 'G#', 'A#', 'C', 'D'],
    outer: {
      amount: 3,
      use: 'flat'
    },
    middle: {
      label: ['E', tspan({ 'baseline-shift': 'super' }, 'b')]
    },
    inner: {
      label: 'Cm'
    }
  }, {
    keys: ['A#', 'C', 'D', 'D#', 'F', 'G', 'A'],
    outer: {
      amount: 2,
      use: 'flat'
    },
    middle: {
      label: ['B', tspan({ 'baseline-shift': 'super' }, 'b')]
    },
    inner: {
      label: 'Gm'
    }
  }, {
    keys: ['F', 'G', 'A', 'A#', 'C', 'D', 'E'],
    outer: {
      amount: 1,
      use: 'flat'
    },
    middle: {
      label: 'F'
    },
    inner: {
      label: 'Dm'
    }
  }, {
    keys: ['C', 'D', 'E', 'F', 'G', 'A', 'B'],
    outer: {
      amount: 0,
      use: ''
    },
    middle: {
      label: 'C'
    },
    inner: {
      label: 'Am'
    }
  }, {
    keys: ['G', 'A', 'B', 'C', 'D', 'E', 'F#'],
    outer: {
      amount: 1,
      use: 'sharp'
    },
    middle: {
      label: 'G'
    },
    inner: {
      label: 'Em'
    }
  }, {
    keys: ['D', 'E', 'F#', 'G', 'A', 'B', 'C#'],
    outer: {
      amount: 2,
      use: 'sharp'
    },
    middle: {
      label: 'D'
    },
    inner: {
      label: 'Bm'
    }
  }, 
];

const polarToCartesian = (x, y, r, degrees) => {
  const radians = degrees * Math.PI / 180.0;
  
  return [x + (r * Math.cos(radians)), y + (r * Math.sin(radians))]
}

const segmentPath = (x, y, r0, r1, d0, d1) => {
  const arc = Math.abs(d0 - d1) > 180 ? 1 : 0
  const point = (radius, degree) =>
    polarToCartesian(x, y, radius, degree)
      .map(n => n.toPrecision(5))
      .join(',')

  return [
    `M${point(r0, d0)}`,
    `A${r0},${r0},0,${arc},1,${point(r0, d1)}`,
    `L${point(r1, d1)}`,
    `A${r1},${r1},0,${arc},0,${point(r1, d0)}`,
    'Z',
  ].join('')
} 

const segment = (index, segments, size, radius, width) => {
  const center = size / 2;
  const degrees = 360 / segments;
  const start = degrees * index;
  const end = (degrees * (index + 1) + 1);
  const d = segmentPath(center, center, radius, radius-width, start, end);
  
  return path({ d });
}

const posXY = (center, radius, angle) => [
  center + radius * Math.cos(angle * Math.PI / 180.0), 
  center + radius * Math.sin(angle * Math.PI / 180.0)
];

const generateContent = (data, onHover, onOut) => {
  const size = 500;
  const radius = size / 2;
  
  return data.map(generateSegment(size, radius, onHover, onOut));
};

const generateSegment = (size, radius, onHover, onOut) => (obj, index) => {
  const angle = index * (360 / data.length);    
  const [x0, y0] = posXY(radius, 210, angle);
  const [x1, y1] = posXY(radius, 135, angle);
  const [x2, y2] = posXY(radius, 76, angle);

  return [
    g({ class: 'cf-arcs', onmouseover: () => onHover(obj.keys), onmouseout: () => onOut() },
      segment(index, data.length, size, radius, 80, 50),
      segment(index, data.length, size, 170, 70, 30),
      segment(index, data.length, size, 100, 50),
    ),
    g({ transform: `translate(${x0-25}, ${y0-radius})` },
      use({ width: 60, href: '#staff' }),
      ...generateOuterContent(obj)
    ),
    text({ x: x1 - 7, y: y1 + 7, class: 'cf-text-middle' }, obj.middle.label),
    text({ x: x2 - 12, y: y2 + 7, class: 'cf-text-inner' }, obj.inner.label),
    generateSymbols(),
  ];
}

const generateOuterContent = (obj) => Array
  .from(Array(obj.outer.amount).keys())
  .map(i => use({ width: 4, href: `#${obj.outer.use}`, class: `cf-symbol cf-${obj.outer.use}-${i+1}` }));

const generateSymbols = () => defs(
  symbol({ id: 'staff', viewBox: '0 0 203.18 132.08' },
    path({ style: 'stroke:var(--dark);stroke-width:1pt;fill:none', d: 'm89.253 345.53 177.07.72m-175.63 21.24 177.07.72m-176.35 21.05 177.07.72m-178.87 21.5 177.07.72m-176.35 21.06 177.07.72', transform: 'matrix(1.1144 0 0 1 -96.674 -331.49)' }),
    path({ fill: 'var(--dark)', transform: 'matrix(.907 0 0 .91953 -8.112 -4.363)', d:'M39.542 140.49c.022 8.47 18.816 7.39 18.753-6.57.025-13.61-17.954-89.748-18.155-104.31-.211-11.556 6.122-24.509 11.548-24.368 4.299.141 8.338 9.873 8.316 21.986.326 39.173-33.981 36.641-33.981 63.409 0 17.303 14.363 21.873 21.545 21.873 24.32-.16 20.239-29.381 4.734-29.381-9.141-.328-17.139 12.076-5.06 22.359-20.403-8.977-9.467-30.685 6.692-30.848 21.545.163 25.299 39.658-6.366 39.828-18.933.16-26.931-16.488-26.768-29.546 0-25.135 37.051-39.662 36.561-60.881 0-13.384-13.873-7.345-14.2 14.201.327 13.384 17.628 84.056 17.465 94.996 0 22.52-28.89 15.18-28.89 3.75.163-16.32 16.975-4.73 11.752-4.24-4.081 7.18-3.946 7.74-3.946 7.74z' }),
    path({ fill: 'var(--dark)', transform: 'matrix(.907 0 0 .91953 -8.112 -4.363)', d: 'M47.37 133.39c0 3.79-3.161 6.87-7.054 6.87s-7.053-3.08-7.053-6.87 3.16-6.86 7.053-6.86 7.054 3.07 7.054 6.86z' }),
  ),
  symbol({ id: 'sharp', viewBox: '0 0 6 19'},
    path({ fill: 'var(--dark)', d: 'M1.906 12.154V7.45l2-.552v4.68l-2 .576zm3.938-1.138-1.375.394V6.73l1.375-.384V4.402l-1.375.384V.004h-.563v4.927l-2 .575V.856h-.531v4.827L0 6.068v1.948l1.375-.384v4.671L0 12.686v1.94l1.375-.384v4.755h.531v-4.925l2-.55v4.626h.563v-4.8l1.375-.385v-1.947z' }),
  ),
  symbol({ id: 'flat', viewBox: '0 0 .908 2.512 '},
    path({ fill: 'var(--dark)', d:'m.216 1.696-.004.264v.044c0 .088.004.176.016.264.18-.152.372-.32.372-.556 0-.132-.056-.268-.172-.268-.124 0-.208.12-.212.252zm-.168.716L0 .032A.212.212 0 0 1 .108 0c.036 0 .076.012.108.032l-.028 1.38a.577.577 0 0 1 .364-.136c.208 0 .356.192.356.408 0 .32-.344.468-.588.676-.06.052-.096.152-.18.152-.052 0-.092-.044-.092-.1z' }),
  ),
);

export class CircleOfFifthsState {
  constructor(data) {
    this.keyboardState = new KeyboardState();
    this.data = data;
  }
}

export const CircleOfFifths = (circleOfFifthState = new CircleOfFifthsState()) => {
  const onHover = (keys) => circleOfFifthState.keyboardState.highlightKeys(keys);

  const onOut = () => circleOfFifthState.keyboardState.darkenKeys();

  return div(
    svg({ width: 500, height: 500, viewbox: '0 0 500 500', xmlns: 'http://www.w3.org/2000/svg' },
      generateContent(data, onHover, onOut),
    ),
    Keyboard(circleOfFifthState.keyboardState)
  )
};