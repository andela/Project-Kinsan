import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { GameComponent } from './components/game.component';

import { QuestionComponent }        from './components/question/question.component';
import { AnswerComponent }          from './components/answer/answer.component';
import { TimerComponent }           from './components/timer/timer.component';
import { PlayerComponent }          from './components/player/player.component';
import { InfoModalComponent }       from './components/info-modal/info-modal.component';
import { ChatComponent }            from './components/chat/chat.component';

@NgModule({
  imports:      [ 
      BrowserModule,
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
  bootstrap: [ GameComponent ]
})
export class AppModule 
{ 

}
