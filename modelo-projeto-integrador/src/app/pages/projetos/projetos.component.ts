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
  proximoId = 1;
  idEmEdicao: number | null = null;
  mensagem = '';

  campeonato: Omit<Campeonato, 'id'> = this.novoCampeonato();

  private novoCampeonato(): Omit<Campeonato, 'id'> {
    return {
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

  salvar(formulario: NgForm): void {
    if (formulario.invalid) {
      formulario.control.markAllAsTouched();
      this.mensagem = 'Confira os campos obrigatórios antes de salvar.';
      return;
    }

    if (this.idEmEdicao !== null) {
      this.campeonatos = this.campeonatos.map(item =>
        item.id === this.idEmEdicao
          ? { ...this.campeonato, id: item.id }
          : item
      );
      this.mensagem = 'Campeonato atualizado com sucesso!';
    } else {
      this.campeonatos = [
        ...this.campeonatos,
        { ...this.campeonato, id: this.proximoId++ }
      ];
      this.mensagem = 'Campeonato cadastrado com sucesso!';
    }

    this.limparFormulario(formulario);
  }

  editar(item: Campeonato): void {
    this.idEmEdicao = item.id;
    this.campeonato = {
      nome: item.nome,
      modalidade: item.modalidade,
      local: item.local,
      organizador: item.organizador,
      dataInicio: item.dataInicio,
      dataFim: item.dataFim,
      quantidadeEquipes: item.quantidadeEquipes,
      formato: item.formato
    };
    this.mensagem = 'Editando campeonato. Altere os campos e salve.';
  }

  excluir(id: number): void {
    this.campeonatos = this.campeonatos.filter(item => item.id !== id);
    if (this.idEmEdicao === id) {
      this.idEmEdicao = null;
      this.campeonato = this.novoCampeonato();
    }
    this.mensagem = 'Campeonato removido da lista.';
  }

  cancelarEdicao(formulario: NgForm): void {
    this.limparFormulario(formulario);
    this.mensagem = 'Edição cancelada.';
  }

  limparFormulario(formulario: NgForm): void {
    this.idEmEdicao = null;
    this.campeonato = this.novoCampeonato();
    formulario.resetForm({ ...this.campeonato });
  }
}
