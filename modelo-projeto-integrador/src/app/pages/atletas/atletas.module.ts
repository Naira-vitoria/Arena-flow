import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';

import { AtletasComponent } from './atletas.component';

@NgModule({
  declarations: [
    AtletasComponent
  ],
  imports: [
    CommonModule,
    FormsModule,

    RouterModule.forChild([
      {
        path: '',
        component: AtletasComponent
      }
    ]),

    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDividerModule
  ]
})
export class AtletasModule { }