import { Component } from '@angular/core';

interface Equipe {
  id: number;
  nome: string;
  responsavel: string;
  capitao: string;
  telefone: string;
  campeonato: string;
}

@Component({
  selector: 'app-equipes',
  standalone: false,
  templateUrl: './equipes.component.html',
  styleUrls: ['./equipes.component.scss']
})
export class EquipesComponent {

  equipes: Equipe[] = [];

  idEmEdicao: number | null = null;

  mensagem = '';

  equipe: Equipe = this.novaEquipe();

  novaEquipe(): Equipe {
    return {
      id: 0,
      nome: '',
      responsavel: '',
      capitao: '',
      telefone: '',
      campeonato: ''
    };
  }

  salvar(formulario: any): void {
    if (formulario.invalid) {
      formulario.control.markAllAsTouched();
      return;
    }

    if (this.idEmEdicao === null) {
      const nova = {
        ...this.equipe,
        id: Date.now()
      };

      this.equipes.push(nova);
      this.mensagem = 'Equipe cadastrada com sucesso!';
    } else {
      const indice = this.equipes.findIndex(
        item => item.id === this.idEmEdicao
      );

      if (indice !== -1) {
        this.equipes[indice] = {
          ...this.equipe,
          id: this.idEmEdicao
        };
      }

      this.mensagem = 'Equipe atualizada com sucesso!';
    }

    this.limparFormulario(formulario);
  }

  editar(item: Equipe): void {
    this.equipe = { ...item };
    this.idEmEdicao = item.id;
    this.mensagem = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  excluir(id: number): void {
    const confirmar = window.confirm(
      'Tem certeza que deseja excluir esta equipe?'
    );

    if (!confirmar) {
      return;
    }

    this.equipes = this.equipes.filter(item => item.id !== id);
    this.mensagem = 'Equipe excluída com sucesso!';

    if (this.idEmEdicao === id) {
      this.limparFormulario();
    }
  }

  limparFormulario(formulario?: any): void {
    this.equipe = this.novaEquipe();
    this.idEmEdicao = null;

    if (formulario) {
      formulario.resetForm();
    }
  }

  cancelarEdicao(formulario: any): void {
    this.limparFormulario(formulario);
    this.mensagem = '';
  }
}