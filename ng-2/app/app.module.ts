import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule }  from '@angular/router';
import { FormsModule }   from '@angular/forms';
import { NgbModule }     from '@ng-bootstrap/ng-bootstrap';

import { GameComponent } from './components/game.component';

import { QuestionComponent }        from './components/question/question.component';
import { AnswerComponent }          from './components/answer/answer.component';
import { TimerComponent }           from './components/timer/timer.component';
import { PlayerComponent }          from './components/player/player.component';
import { InfoModalComponent }       from './components/info-modal/info-modal.component';
import { ChatComponent }            from './components/chat/chat.component';

import { GameService }              from './services/game.service.js';
import { SocketService }              from './services/socket.service.js';

@NgModule({
  imports:      [ 
      BrowserModule,
      FormsModule,
      NgbModule.forRoot(),
      RouterModule.forRoot([
      {
        path: 'heroes',
        component: GameComponent
      }
    ])
  ],
  declarations: [ 
      GameComponent,
      QuestionComponent,
      AnswerComponent,
      TimerComponent,
      PlayerComponent,
      InfoModalComponent,
      ChatComponent
  ],
  bootstrap: [ GameComponent ],
  providers: [
    GameService,
    SocketService
  ]
})
export class AppModule 
{ 

}
