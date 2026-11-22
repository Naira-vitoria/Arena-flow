import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ClassificacaoComponent } from './classificacao.component';

@NgModule({
  declarations: [ClassificacaoComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      { path: '', component: ClassificacaoComponent }
    ])
  ]
})
export class ClassificacaoModule {}