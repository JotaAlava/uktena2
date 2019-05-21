import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { TimerService } from '../services/timer.service';
import { LocalTomatoService } from '../services/local.tomato.service';
import { State } from '../services/state';
import { Duration } from '../services/duration';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  tomatoes = [];

  constructor(
    public auth: AuthService,
    public timer: TimerService,
    public tomato: LocalTomatoService) {
      this.tomato.tomatoes.subscribe((x) => {
        this.tomatoes = x;
      });
  }
}
