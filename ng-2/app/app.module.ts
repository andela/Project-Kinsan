import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { GameComponent } from './components/game.component';

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
  declarations: [ GameComponent ],

})
export class AppModule 
{ 

}
