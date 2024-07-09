import { CircleOfFifths } from "./lib/circleOfFifth.js";

const { div, h2 } = van.tags;

const App = () => div(
  { class: 'container' },
  div({ class: 'row'}, 
    div({ class: 'twelve column text-center'}, 
      h2('Circle of fifths'),
    ),
  ),
  div({ class: 'row'}, 
    div({ class: 'twelve column text-center'}, 
      CircleOfFifths(),
    )
  ),
);

van.add(document.body, App());