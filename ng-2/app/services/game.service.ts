import { Injectable }    from '@angular/core';

@Injectable()
export class GameService {
    contructor(){

    }

    getGame() {
        return{
            state: 'awaiting players',
            players: [
                {
                    avatar: 'random',
                    username: 'random1',
                    points: '1'
                },
                {
                    avatar: 'random2',
                    username: 'random12',
                    points: '12'
                },
                {
                    avatar: 'random',
                    username: 'random',
                    points: '1'
                }
            ]
        };
    }
}