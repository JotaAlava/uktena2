import { Component, Input } from '@angular/core';
import { LocalTomatoService } from '../services/local.tomato.service';
import { AuthService } from 'src/app/auth.service';
import { Tomato } from '../services/tomato';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  @Input() select: Function;

  public description: string = '';

  constructor(
    public tomato: LocalTomatoService,
    public auth: AuthService,
    public navCtrl: NavController) {
  }

  public create(description: string): void {
    const userId = '0';
    const newTomato = new Tomato(description, new Date(), userId);

    this.tomato.create(newTomato)
      .then((x) => {
        this.description = '';
        this.navCtrl.navigateRoot('');
      });
  }
}
