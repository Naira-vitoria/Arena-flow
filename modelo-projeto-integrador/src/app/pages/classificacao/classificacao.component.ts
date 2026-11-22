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

interface EstatisticaEquipe {
  nome: string;
  partidas: number;
  vitorias: number;
  empates: number;
  derrotas: number;
  golsPro: number;
  golsContra: number;
  saldoGols: number;
  pontos: number;
}

@Component({
  selector: 'app-classificacao',
  standalone: false,
  templateUrl: './classificacao.component.html',
  styleUrls: ['./classificacao.component.scss']
})
export class ClassificacaoComponent {

  campeonatos: Campeonato[] = [];
  equipes: Equipe[] = [];
  partidas: Partida[] = [];

  campeonatoSelecionado = '';

  constructor() {
    this.carregarDados();
  }

  // Carrega os dados salvos no navegador
  carregarDados(): void {
    const campeonatosSalvos = localStorage.getItem('arena-flow-campeonatos');
    const equipesSalvas = localStorage.getItem('arena-flow-equipes');
    const partidasSalvas = localStorage.getItem('arena-flow-partidas');

    if (campeonatosSalvos) {
      this.campeonatos = JSON.parse(campeonatosSalvos);
    }

    if (equipesSalvas) {
      this.equipes = JSON.parse(equipesSalvas);
    }

    if (partidasSalvas) {
      this.partidas = JSON.parse(partidasSalvas);
    }
  }

  // Retorna as equipes do campeonato selecionado
  get equipesDoCampeonato(): Equipe[] {
    return this.equipes.filter(
      equipe => equipe.campeonato === this.campeonatoSelecionado
    );
  }

  // Retorna as partidas do campeonato selecionado
  get partidasDoCampeonato(): Partida[] {
    return this.partidas.filter(
      partida => partida.campeonato === this.campeonatoSelecionado
    );
  }

  // Calcula a classificação do campeonato
  get tabelaClassificacao(): EstatisticaEquipe[] {

    const tabela: EstatisticaEquipe[] = this.equipesDoCampeonato.map(equipe => ({
      nome: equipe.nome,
      partidas: 0,
      vitorias: 0,
      empates: 0,
      derrotas: 0,
      golsPro: 0,
      golsContra: 0,
      saldoGols: 0,
      pontos: 0
    }));

    const partidasFinalizadas = this.partidasDoCampeonato.filter(
      partida =>
        partida.status === 'Finalizada' &&
        partida.golsA !== null &&
        partida.golsB !== null
    );

    partidasFinalizadas.forEach(partida => {

      const equipeA = tabela.find(
        equipe => equipe.nome === partida.equipeA
      );

      const equipeB = tabela.find(
        equipe => equipe.nome === partida.equipeB
      );

      if (!equipeA || !equipeB) {
        return;
      }

      const golsA = partida.golsA as number;
      const golsB = partida.golsB as number;

      // Registra os jogos disputados
      equipeA.partidas++;
      equipeB.partidas++;

      // Registra os gols
      equipeA.golsPro += golsA;
      equipeA.golsContra += golsB;

      equipeB.golsPro += golsB;
      equipeB.golsContra += golsA;

      // Calcula vitória, empate ou derrota
      if (golsA > golsB) {
        equipeA.vitorias++;
        equipeA.pontos += 3;

        equipeB.derrotas++;

      } else if (golsB > golsA) {
        equipeB.vitorias++;
        equipeB.pontos += 3;

        equipeA.derrotas++;

      } else {
        equipeA.empates++;
        equipeB.empates++;

        equipeA.pontos++;
        equipeB.pontos++;
      }

    });

    // Calcula o saldo de gols
    tabela.forEach(equipe => {
      equipe.saldoGols = equipe.golsPro - equipe.golsContra;
    });

    // Ordena a classificação
    tabela.sort((a, b) => {
      if (b.pontos !== a.pontos) {
        return b.pontos - a.pontos;
      }

      if (b.vitorias !== a.vitorias) {
        return b.vitorias - a.vitorias;
      }

      if (b.saldoGols !== a.saldoGols) {
        return b.saldoGols - a.saldoGols;
      }

      if (b.golsPro !== a.golsPro) {
        return b.golsPro - a.golsPro;
      }

      return a.nome.localeCompare(b.nome);
    });

    return tabela;
  }

  // Quantidade de jogos finalizados
  get totalJogosFinalizados(): number {
    return this.partidasDoCampeonato.filter(
      partida => partida.status === 'Finalizada'
    ).length;
  }

  // Quantidade de jogos que ainda não foram finalizados
  get totalJogosPendentes(): number {
    return this.partidasDoCampeonato.filter(
      partida => partida.status !== 'Finalizada'
    ).length;
  }

}
