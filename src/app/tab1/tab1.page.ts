import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  providers: [AuthService]
})
export class Tab1Page {
  constructor(public auth: AuthService) {
  }
}
