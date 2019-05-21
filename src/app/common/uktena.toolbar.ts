import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'uktena-toolbar',
  templateUrl: 'uktena.toolbar.html'
})
export class UktenaToolbar {
  constructor(public auth: AuthService) {
    
  }
}
