import { Component } from '@angular/core';

@Component({
  selector: 'app-inicio',
  standalone: false,
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent {

  campeonatos: any[] = [];
  equipes: any[] = [];
  partidas: any[] = [];

  totalCampeonatos = 0;
  totalEquipes = 0;
  totalPartidasFinalizadas = 0;

  constructor() {
    this.carregarDados();
  }

  carregarDados(): void {

    // Carrega os campeonatos
    const campeonatosSalvos = localStorage.getItem('arena-flow-campeonatos');
    this.campeonatos = campeonatosSalvos
      ? JSON.parse(campeonatosSalvos)
      : [];

    // Carrega as equipes
    const equipesSalvas = localStorage.getItem('arena-flow-equipes');
    this.equipes = equipesSalvas
      ? JSON.parse(equipesSalvas)
      : [];

    // Carrega as partidas
    const partidasSalvas = localStorage.getItem('arena-flow-partidas');
    this.partidas = partidasSalvas
      ? JSON.parse(partidasSalvas)
      : [];

    // Calcula os indicadores
    this.totalCampeonatos = this.campeonatos.length;
    this.totalEquipes = this.equipes.length;

    this.totalPartidasFinalizadas = this.partidas.filter(
      partida => partida.status?.toLowerCase() === 'finalizada'
        || partida.status?.toLowerCase() === 'finalizado'
    ).length;
  }

}