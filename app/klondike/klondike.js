import angular from "angular";

import { Scoring } from "./scoring.js"
import "./game.js"
import "./board.js"

angular.module("klondike.scoring", [])
    .service("scoring", [Scoring]);

angular.module("klondike", [
  "klondike.game",
  "klondike.board",
  "klondike.scoring"
]);
