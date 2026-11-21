
import { Component } from '@angular/core';

interface Partida {
  id: number;
  campeonato: string;
  equipeA: string;
  equipeB: string;
  rodada: string;
  data: string;
  horario: string;
  local: string;
  status: string;
  golsA: number | null;
  golsB: number | null;
}

@Component({
  selector: 'app-partidas',
  standalone: false,
  templateUrl: './partidas.component.html',
  styleUrls: ['./partidas.component.scss']
})
export class PartidasComponent {
  partidas: Partida[] = [];

  partida: Partida = this.novaPartida();

  editando = false;
  proximoId = 1;

  novaPartida(): Partida {
    return {
      id: 0,
      campeonato: '',
      equipeA: '',
      equipeB: '',
      rodada: '',
      data: '',
      horario: '',
      local: '',
      status: 'Agendada',
      golsA: null,
      golsB: null
    };
  }

  salvar(): void {
    if (
      !this.partida.campeonato.trim() ||
      !this.partida.equipeA.trim() ||
      !this.partida.equipeB.trim() ||
      !this.partida.data ||
      !this.partida.horario ||
      !this.partida.local.trim()
    ) {
      alert('Preencha todos os campos obrigatórios.');
      return;
    }

    if (this.partida.equipeA.trim().toLowerCase() ===
        this.partida.equipeB.trim().toLowerCase()) {
      alert('Uma equipe não pode jogar contra ela mesma.');
      return;
    }

    if (this.editando) {
      const indice = this.partidas.findIndex(
        item => item.id === this.partida.id
      );

      if (indice !== -1) {
        this.partidas[indice] = { ...this.partida };
      }
    } else {
      this.partida.id = this.proximoId++;
      this.partidas.push({ ...this.partida });
    }

    this.cancelarEdicao();
  }

  editar(item: Partida): void {
    this.partida = { ...item };
    this.editando = true;

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  excluir(id: number): void {
    const confirmar = confirm('Deseja realmente excluir esta partida?');

    if (confirmar) {
      this.partidas = this.partidas.filter(item => item.id !== id);

      if (this.partida.id === id) {
        this.cancelarEdicao();
      }
    }
  }

  cancelarEdicao(): void {
    this.partida = this.novaPartida();
    this.editando = false;
  }

  get totalAgendadas(): number {
    return this.partidas.filter(
      item => item.status === 'Agendada'
    ).length;
  }

  get totalEmAndamento(): number {
    return this.partidas.filter(
      item => item.status === 'Em andamento'
    ).length;
  }

  get totalFinalizadas(): number {
    return this.partidas.filter(
      item => item.status === 'Finalizada'
    ).length;
  }

  atualizarStatus(item: Partida): void {
    if (item.status === 'Finalizada' &&
        (item.golsA === null || item.golsB === null)) {
      alert('Informe o placar antes de finalizar a partida.');
      item.status = 'Em andamento';
    }
  }
}
