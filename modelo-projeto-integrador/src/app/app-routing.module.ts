
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// O layout permanece na tela. Somente o conteúdo do router-outlet é trocado.
const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },

  {
    path: 'inicio',
    loadChildren: () => import('./pages/inicio/inicio.module').then(m => m.InicioModule),
    data: { titulo: 'Início' }
  },

  {
    path: 'projetos',
    loadChildren: () => import('./pages/projetos/projetos.module').then(m => m.ProjetosModule),
    data: { titulo: 'Campeonatos' }
  },

  {
    path: 'equipes',
    loadChildren: () => import('./pages/equipes/equipes.module').then(m => m.EquipesModule),
    data: { titulo: 'Equipes' }
  },

  {
    path: 'partidas',
    loadChildren: () => import('./partidas/partidas.module').then(m => m.PartidasModule),
    data: { titulo: 'Partidas' }
  },

  { path: '**', redirectTo: 'inicio' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
