import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

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

@Component({
  selector: 'app-projetos',
  standalone: false,
  templateUrl: './projetos.component.html',
  styleUrls: ['./projetos.component.scss']
})
export class ProjetosComponent {

  campeonatos: Campeonato[] = [];

  campeonato: Campeonato = this.novoCampeonato();

  idEmEdicao: number | null = null;

  proximoId = 1;

  mensagem = '';

  constructor() {
    this.carregarCampeonatos();
  }

  // Carrega os campeonatos salvos no navegador
  carregarCampeonatos(): void {
    const dados = localStorage.getItem('arena-flow-campeonatos');

    if (dados) {
      this.campeonatos = JSON.parse(dados);

      if (this.campeonatos.length > 0) {
        this.proximoId =
          Math.max(...this.campeonatos.map(item => item.id)) + 1;
      }
    }
  }

  // Salva os campeonatos no localStorage
  salvarStorage(): void {
    localStorage.setItem(
      'arena-flow-campeonatos',
      JSON.stringify(this.campeonatos)
    );
  }

  // Cria um campeonato vazio
  novoCampeonato(): Campeonato {
    return {
      id: 0,
      nome: '',
      modalidade: '',
      local: '',
      organizador: '',
      dataInicio: '',
      dataFim: '',
      quantidadeEquipes: 2,
      formato: ''
    };
  }

  // Salva um novo campeonato ou as alterações de um existente
  salvar(formulario: NgForm): void {

    if (formulario.invalid) {
      formulario.control.markAllAsTouched();
      return;
    }

    if (this.campeonato.dataFim < this.campeonato.dataInicio) {
      this.mensagem = 'A data de término não pode ser anterior à data de início.';
      return;
    }

    if (this.idEmEdicao !== null) {

      const indice = this.campeonatos.findIndex(
        item => item.id === this.idEmEdicao
      );

      if (indice !== -1) {
        this.campeonatos[indice] = {
          ...this.campeonato,
          id: this.idEmEdicao
        };

        this.mensagem = 'Campeonato atualizado com sucesso!';
      }

    } else {

      this.campeonato.id = this.proximoId++;

      this.campeonatos.push({
        ...this.campeonato
      });

      this.mensagem = 'Campeonato cadastrado com sucesso!';
    }

    this.salvarStorage();

    formulario.resetForm();

    this.campeonato = this.novoCampeonato();
    this.idEmEdicao = null;
  }

  // Prepara um campeonato para edição
  editar(item: Campeonato): void {
    this.campeonato = { ...item };
    this.idEmEdicao = item.id;
    this.mensagem = '';

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  // Cancela a edição
  cancelarEdicao(formulario: NgForm): void {
    formulario.resetForm();

    this.campeonato = this.novoCampeonato();
    this.idEmEdicao = null;
    this.mensagem = '';
  }

  // Limpa os campos do formulário
  limparFormulario(formulario: NgForm): void {
    formulario.resetForm();

    this.campeonato = this.novoCampeonato();
    this.mensagem = '';
  }

  // Exclui um campeonato
  excluir(id: number): void {
    const confirmar = confirm(
      'Deseja realmente excluir este campeonato?'
    );

    if (confirmar) {
      this.campeonatos = this.campeonatos.filter(
        item => item.id !== id
      );

      this.salvarStorage();

      this.mensagem = 'Campeonato excluído com sucesso!';

      if (this.idEmEdicao === id) {
        this.campeonato = this.novoCampeonato();
        this.idEmEdicao = null;
      }
    }
  }
}