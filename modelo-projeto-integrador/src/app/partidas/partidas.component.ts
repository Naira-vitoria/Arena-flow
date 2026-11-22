
import { Component } from '@angular/core';

interface Campeonato {
  id: number;
  nome: string;
  modalidade: string;
  local: string;
  organizador: string;
  dataInicio: string;
  dataFim: string;
  quantidadeEquipes: number;
  formato: string;
}

interface Equipe {
  id: number;
  nome: string;
  responsavel: string;
  capitao: string;
  telefone: string;
  campeonato: string;
}

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
  campeonatos: Campeonato[] = [];
  equipes: Equipe[] = [];

  partida: Partida = this.novaPartida();

  editando = false;
  proximoId = 1;

  constructor() {
    this.carregarPartidas();
    this.carregarCampeonatos();
    this.carregarEquipes();
  }

  // Carrega as partidas salvas
  carregarPartidas(): void {
    const dados = localStorage.getItem('arena-flow-partidas');

    if (dados) {
      this.partidas = JSON.parse(dados);

      if (this.partidas.length > 0) {
        this.proximoId =
          Math.max(...this.partidas.map(item => item.id)) + 1;
      }
    }
  }

  // Carrega os campeonatos cadastrados
  carregarCampeonatos(): void {
    const dados = localStorage.getItem('arena-flow-campeonatos');

    if (dados) {
      const campeonatosSalvos = JSON.parse(dados);

      this.campeonatos = campeonatosSalvos.map((item: any) => ({
        id: item.id,
        nome: item.nome || item.name || '',
        modalidade: item.modalidade,
        local: item.local,
        organizador: item.organizador,
        dataInicio: item.dataInicio,
        dataFim: item.dataFim,
        quantidadeEquipes: item.quantidadeEquipes,
        formato: item.formato
      }));
    }
  }

  // Carrega as equipes cadastradas
  carregarEquipes(): void {
    const dados = localStorage.getItem('arena-flow-equipes');

    if (dados) {
      this.equipes = JSON.parse(dados);
    }
  }

  // Salva as partidas no navegador
  salvarPartidasStorage(): void {
    localStorage.setItem(
      'arena-flow-partidas',
      JSON.stringify(this.partidas)
    );
  }

  // Cria uma partida vazia
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

  // Cadastra ou atualiza uma partida
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

    if (
      this.partida.equipeA.trim().toLowerCase() ===
      this.partida.equipeB.trim().toLowerCase()
    ) {
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

    this.salvarPartidasStorage();
    this.cancelarEdicao();
  }

  // Edita uma partida
  editar(item: Partida): void {
    this.partida = { ...item };
    this.editando = true;

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  // Exclui uma partida
  excluir(id: number): void {
    const confirmar = confirm(
      'Deseja realmente excluir esta partida?'
    );

    if (confirmar) {
      this.partidas = this.partidas.filter(
        item => item.id !== id
      );

      this.salvarPartidasStorage();

      if (this.partida.id === id) {
        this.cancelarEdicao();
      }
    }
  }

  // Cancela edição e limpa o formulário
  cancelarEdicao(): void {
    this.partida = this.novaPartida();
    this.editando = false;
  }

  // Quantidade de partidas agendadas
  get totalAgendadas(): number {
    return this.partidas.filter(
      item => item.status === 'Agendada'
    ).length;
  }

  // Quantidade de partidas em andamento
  get totalEmAndamento(): number {
    return this.partidas.filter(
      item => item.status === 'Em andamento'
    ).length;
  }

  // Quantidade de partidas finalizadas
  get totalFinalizadas(): number {
    return this.partidas.filter(
      item => item.status === 'Finalizada'
    ).length;
  }

  // Atualiza o status da partida
  atualizarStatus(item: Partida): void {
    if (
      item.status === 'Finalizada' &&
      (item.golsA === null || item.golsB === null)
    ) {
      alert('Informe o placar antes de finalizar a partida.');
      item.status = 'Em andamento';
    }

    this.salvarPartidasStorage();
  }
}
