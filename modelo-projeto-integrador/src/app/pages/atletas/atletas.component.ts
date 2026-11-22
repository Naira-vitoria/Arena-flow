import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

interface Equipe {
  id: number;
  nome: string;
  responsavel: string;
  capitao: string;
  telefone: string;
  campeonato: string;
}

interface Atleta {
  id: number;
  nome: string;
  numero: number;
  posicao: string;
  equipeId: number;
  equipeNome: string;
}

@Component({
  selector: 'app-atletas',
  standalone: false,
  templateUrl: './atletas.component.html',
  styleUrls: ['./atletas.component.scss']
})
export class AtletasComponent {

  atletas: Atleta[] = [];
  equipes: Equipe[] = [];

  idEmEdicao: number | null = null;
  mensagem = '';

  atleta: Omit<Atleta, 'id' | 'equipeNome'> = this.novoAtleta();

  constructor() {
    this.carregarAtletas();
    this.carregarEquipes();
  }

  // Carrega os atletas salvos
  carregarAtletas(): void {
    const dados = localStorage.getItem('arena-flow-atletas');

    if (dados) {
      this.atletas = JSON.parse(dados);
    }
  }

  // Carrega as equipes cadastradas
  carregarEquipes(): void {
    const dados = localStorage.getItem('arena-flow-equipes');

    if (dados) {
      this.equipes = JSON.parse(dados);
    }
  }

  // Salva os atletas no navegador
  salvarAtletasStorage(): void {
    localStorage.setItem(
      'arena-flow-atletas',
      JSON.stringify(this.atletas)
    );
  }

  // Formulário vazio
  private novoAtleta(): Omit<Atleta, 'id' | 'equipeNome'> {
    return {
      nome: '',
      numero: 1,
      posicao: '',
      equipeId: 0
    };
  }

  // Cadastra ou atualiza atleta
  salvar(formulario: NgForm): void {

    if (formulario.invalid) {
      formulario.control.markAllAsTouched();
      this.mensagem = 'Confira os campos obrigatórios.';
      return;
    }

    const equipeSelecionada = this.equipes.find(
      item => item.id === Number(this.atleta.equipeId)
    );

    if (!equipeSelecionada) {
      this.mensagem = 'Selecione uma equipe válida.';
      return;
    }

    if (this.idEmEdicao === null) {

      const novo: Atleta = {
        ...this.atleta,
        id: Date.now(),
        equipeNome: equipeSelecionada.nome
      };

      this.atletas.push(novo);
      this.mensagem = 'Atleta cadastrado com sucesso!';

    } else {

      this.atletas = this.atletas.map(item =>
        item.id === this.idEmEdicao
          ? {
              ...this.atleta,
              id: item.id,
              equipeNome: equipeSelecionada.nome
            }
          : item
      );

      this.mensagem = 'Atleta atualizado com sucesso!';
    }

    this.salvarAtletasStorage();
    this.limparFormulario(formulario);
  }

  // Edita atleta
  editar(item: Atleta): void {
    this.idEmEdicao = item.id;

    this.atleta = {
      nome: item.nome,
      numero: item.numero,
      posicao: item.posicao,
      equipeId: item.equipeId
    };

    this.mensagem = 'Editando atleta. Altere os dados e salve.';
  }

  // Exclui atleta
  excluir(id: number): void {
    const confirmar = window.confirm(
      'Tem certeza que deseja excluir este atleta?'
    );

    if (!confirmar) {
      return;
    }

    this.atletas = this.atletas.filter(item => item.id !== id);

    this.salvarAtletasStorage();

    if (this.idEmEdicao === id) {
      this.limparFormulario();
    }

    this.mensagem = 'Atleta excluído com sucesso!';
  }

  // Cancela edição
  cancelarEdicao(formulario: NgForm): void {
    this.limparFormulario(formulario);
    this.mensagem = '';
  }

  // Limpa o formulário
  limparFormulario(formulario?: NgForm): void {
    this.idEmEdicao = null;
    this.atleta = this.novoAtleta();

    if (formulario) {
      formulario.resetForm({ ...this.atleta });
    }
  }
}