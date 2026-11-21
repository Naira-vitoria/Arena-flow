
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { MatIconModule } from '@angular/material/icon';

import { PartidasComponent } from './partidas.component';

const routes: Routes = [
  {
    path: '',
    component: PartidasComponent
  }
];

@NgModule({
  declarations: [
    PartidasComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    RouterModule.forChild(routes)
  ]
})
export class PartidasModule { }
