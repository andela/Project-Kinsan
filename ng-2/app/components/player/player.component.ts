import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'player',
    templateUrl: './app/templates/player.components.html',
    styleUrls: ['./app/style/game.css']
})
export class PlayerComponent {
    @Input() players: any;
    
    constructor(){};
}