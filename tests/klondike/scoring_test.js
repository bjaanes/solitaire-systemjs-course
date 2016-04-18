import { module, inject } from "angular-mocks";

import Card from "card";
import RemainderPile from "../../app/klondike/piles/remainderPile.js";
import TableauPile from "../../app/klondike/piles/tableauPile.js";
import FoundationPile from "../../app/klondike/piles/foundationPile.js";

describe("The score", function () {
  "use strict";

  var testScoring,
      testKlondikeGame;

  beforeEach(module("klondike"));
  beforeEach(inject(function (scoring, klondikeGame) {
    testScoring = scoring;
    testKlondikeGame = klondikeGame;

    testKlondikeGame.newGame();
  }));

  it("should start at zero", function () {
    expect(testScoring.score).toBe(0);
  });

  it("should reset score on a new game", function () {
    testScoring.score = 10;

    testKlondikeGame.newGame();

    expect(testScoring.score).toBe(0);
  });

  it("should add 5 when waste moved to tableau", function () {
    var king = new Card({rank: "King", suit: "Spades"});
    var remainderWithKingOnWaste = new RemainderPile([king], testScoring);
    remainderWithKingOnWaste.flipTopCardToWaste();
    var tableau = new TableauPile([], testScoring);

    tableau.moveCardsFrom(remainderWithKingOnWaste.waste);

    expect(testScoring.score).toBe(5);
  });

  it("should add 10 when waste moved to foundation", function () {
    var ace = new Card({rank: "Ace", suit: "Spades"});
    var remainderWithAceOnWaste = new RemainderPile([ace], testScoring);
    remainderWithAceOnWaste.flipTopCardToWaste();
    var foundation = new FoundationPile([], testScoring);

    foundation.moveCardsFrom(remainderWithAceOnWaste.waste);

    expect(testScoring.score).toBe(10);
  });

  it("should add 10 when tableau moved to foundation", inject(function (scoring) {
    var ace = new Card({rank: "Ace", suit: "Spades"});
    var tableauWithAce = new TableauPile([ace], testScoring);
    var foundation = new FoundationPile([], testScoring);

    foundation.moveCardsFrom(tableauWithAce);

    expect(testScoring.score).toBe(10);
  }));

  it("should subtract 15 when foundation moved to tableau", function () {
    var blackTwo = new Card({rank: "2", suit: "Spades"});
    var tableauWithBlackTwo = new TableauPile([blackTwo], testScoring);
    var redAce = new Card({rank: "Ace", suit: "Hearts"});
    var foundationWithRedAce = new FoundationPile([redAce], testScoring);

    tableauWithBlackTwo.moveCardsFrom(foundationWithRedAce);

    expect(testScoring.score).toBe(-15);
  });

  it("should add nothing when foundation moved to foundation", function () {
    var ace = new Card({rank: "Ace", suit: "Hearts"});
    var foundationWithAce = new FoundationPile([ace], testScoring);
    var emptyFoundation = new FoundationPile([], testScoring);

    emptyFoundation.moveCardsFrom(foundationWithAce);

    expect(testScoring.score).toBe(0);
  });

  it("should add nothing when tableau moved to tableau", function () {
    var king = new Card({rank: "King", suit: "Spades"});
    king.turnUp();
    var tableauWithKing = new TableauPile([king], testScoring);
    var emptyTableau = new TableauPile([], testScoring);

    emptyTableau.moveCardsFrom(tableauWithKing);

    expect(testScoring.score).toBe(0);
  });

  it("should add 5 when tableau card turned over because top was removed", function () {
    var randomCard = new Card({rank: "10", suit: "Spades"});
    var king = new Card({rank: "King", suit: "Spades"});
    king.turnUp();
    var tableauWithKing = new TableauPile([randomCard, king], testScoring);
    var emptyTableau = new TableauPile([], testScoring);

    emptyTableau.moveCardsFrom(tableauWithKing);

    expect(testScoring.score).toBe(5);
  });

  it("should not add 5 when tableau card already turned over", function () {
    var blackKingUp = new Card({rank: "King", suit: "Spades"});
    blackKingUp.turnUp();
    var redAceUp = new Card({rank: "Ace", suit: "Diamons"});
    redAceUp.turnUp();
    var tableau = new TableauPile([blackKingUp, redAceUp], testScoring);
    var emptyTableau = new TableauPile([], testScoring);

    emptyTableau.moveCardsFrom(tableau);

    expect(testScoring.score).toBe(0);
  });

  it("should subtract 100 when waste recycled", function () {
    var king = new Card({rank: "King", suit: "Spades"});
    var remainderWithOneCard = new RemainderPile([king], testScoring);
    remainderWithOneCard.flipTopCardToWaste();
    testScoring.score = 200;

    remainderWithOneCard.flipTopCardToWaste();

    expect(testScoring.score).toBe(100);
  });

  it("should not go negative when waste recycled", function () {
    var king = new Card({rank: "King", suit: "Spades"});
    var remainderWithOneCard = new RemainderPile([king], testScoring);
    remainderWithOneCard.flipTopCardToWaste();
    testScoring.score = 50;

    remainderWithOneCard.flipTopCardToWaste();

    expect(testScoring.score).toBe(0);
  });
});
