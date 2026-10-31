
import { Component, inject } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { map, shareReplay } from 'rxjs';

@Component({
  selector: 'app-layout',
  standalone: false,
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {

  nomeSistema = 'Arena Flow';
  usuario = 'Administrador';
  funcao = 'Organizador';

  readonly telaPequena$ = inject(BreakpointObserver)
    .observe('(max-width: 767px)')
    .pipe(map(result => result.matches), shareReplay({ bufferSize: 1, refCount: true }));

}
