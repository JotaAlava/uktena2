import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UktenaToolbar } from './uktena.toolbar'

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule
  ],
  declarations: [UktenaToolbar],
  exports: [UktenaToolbar]
})
export class UktenaCommonModule {}
