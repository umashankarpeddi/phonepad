/// <reference lib="webworker" />

import {Combinations} from "./webworker/combinations";

addEventListener('message', ({data}) => {
  const response = Combinations.calculatePossibleCombinations(data);
  postMessage(response);
});


