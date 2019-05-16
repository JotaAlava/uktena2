import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

enum Duration {
  //Work = 1500000,
  Work = 7000,
  //ShortBreak = 300000,
  ShortBreak = 2000,
  //LongBreak = 900000
  LongBreak = 20000
}

class State {
  static Work = 'Work';
  static ShortBreak = 'ShortBreak';
  static LongBreak = 'LongBreak';

  timeRemaining: number
  mode: string
}

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  providers: [AuthService]
})
export class Tab1Page {
  mode = Duration.Work;
  interval = undefined;
  stateHistory: State[] = [];

  private _state: State = {
    timeRemaining: 0,
    mode: undefined
  };

  get state(): State {
    return this._state;
  }

  set state(newState: State) {
    this.stateHistory.push(newState);
    this._state = newState;
  }

  constructor(public auth: AuthService) {
    this.state = this.buildWorkStateByDuration(Duration.Work);
  }

  public startTimer() {
    this.stopTimer();
    this.state = this.resolveNextState(this.stateHistory);
    this.interval = setInterval(() => {
      if (this.state.timeRemaining === 0) {
        // Beep or some shit...
        this.stopTimer();
      } else {
        this.state.timeRemaining = this.state.timeRemaining - 1000;
      }
    }, 1000)
  }

  public stopTimer() {
    clearInterval(this.interval);
  }

  public getPrettyTimeLeft(milliseconds) {
    milliseconds = milliseconds / 1000;

    var numminutes: any = Math.floor((((milliseconds % 31536000) % 86400) % 3600) / 60);
    var numseconds: any = (((milliseconds % 31536000) % 86400) % 3600) % 60;

    if (numseconds >= 0 && numseconds < 10) numseconds = '0' + numseconds;
    if (numminutes >= 0 && numminutes < 10) numminutes = '0' + numminutes;

    return numminutes + ":" + numseconds;
  };

  private updateState(newState) {
    this.state = newState;
  };

  private buildWorkStateByDuration(newState: Duration) {
    const states = {};

    states[Duration.Work] = {
      timeRemaining: Duration.Work,
      mode: State.Work
    };
    states[Duration.ShortBreak] = {
      timeRemaining: Duration.ShortBreak,
      mode: State.ShortBreak
    };
    states[Duration.LongBreak] = {
      timeRemaining: Duration.LongBreak,
      mode: State.LongBreak
    };

    return states[newState];
  }

  private resolveNextState(stateHistory: State[]): State {
    let mostRecent: State = this.stateHistory[this.stateHistory.length - 1];
    let next: State = this.workOrBreak(mostRecent);

    if (this.stateHistory.length >= 5) {
      if (this.hasEarnedLongBreak(this.stateHistory)) {
        next = this.buildWorkStateByDuration(Duration.LongBreak);
      } else {
        next = this.workOrBreak(mostRecent);
      }
    }

    return next;
  }

  private workOrBreak(mostRecent: State) {
    return mostRecent.mode === State.Work && mostRecent.timeRemaining === 0 ? this.buildWorkStateByDuration(Duration.ShortBreak) : this.buildWorkStateByDuration(Duration.Work);
  }

  private hasEarnedLongBreak(stateHistory: State[]): boolean {
    let mostRecent: State = this.stateHistory[this.stateHistory.length - 1];
    let prevState0: State = this.stateHistory[this.stateHistory.length - 2];
    let prevState1: State = this.stateHistory[this.stateHistory.length - 3];
    let prevState2: State = this.stateHistory[this.stateHistory.length - 4];
    let prevState3: State = this.stateHistory[this.stateHistory.length - 5];

    return mostRecent.mode === State.Work &&
      prevState0.mode === State.ShortBreak &&
      prevState1.mode === State.Work &&
      prevState2.mode === State.ShortBreak &&
      prevState3.mode === State.Work
  }
}
