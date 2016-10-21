import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';

import { GameService }              from './../services/game.service';

@Component({
    selector: 'game-screen',
    templateUrl: './app/templates/game-screen.components.html',
    styleUrls: ['./app/style/game.css']
})
export class GameComponent {
    constructor(
        private location: Location,
        private gameService: GameService
    ){}
    hasPickedCards: boolean = false;
    winningCardPicked: boolean = false;
    showTable: boolean = false;
    modalShown: boolean = false;
    game = gameService.getGame(); //from game service
    pickedCards: any = [];
}