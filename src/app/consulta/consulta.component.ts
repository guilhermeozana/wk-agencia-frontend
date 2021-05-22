import { style } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CandidatoPayload } from '../candidato-payload';
import { ConsultaService } from '../consulta.service';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css']
})
export class ConsultaComponent implements OnInit {

  consultaForm = new FormGroup({
    consulta: new FormControl(),
    estado: new FormControl(),
    faixaIdade: new FormControl(),
    sexo: new FormControl(),
    idadePorTipoSanguineo: new FormControl(),
    candidatosPorTipoSanguineo: new FormControl()
  });

  consulta = "";
  consultaCandidatosPorEstado = "estado";
  estado = "";

  consultaImcPorIdade = "faixaIdade";
  faixaIdade = "";
  altura = 0;
  peso = 0;
  imcMedio = "";
  diferencaAnos = 0;

  consultaObesosPorSexo = "sexo";
  sexo = "";
  candidatosPorSexo = 0;
  candidatosObesos!: CandidatoPayload[];
  porcentagem = 0;

  consultaIdadePorTipoSanguineo = "idadePorTipoSanguineo";
  
  idadeTotal = 0;
  totalCandidatos = 0;
  mediaIdade = 0;
  idade = "";
  dataHoje!: Date;

  consultaCandidatosPorTipoSanguineo = "candidatosPorTipoSanguineo";
  
  qtdeCandidatos = 0;
  tipoSanguineo = "";
  clicado = false;
  candidatoPayload: CandidatoPayload;

  constructor(private consultaService: ConsultaService) { 
    this.candidatoPayload = {
      id: 0,
      nome: "",
      cpf: "",
      rg: "",
      dataNasc: new Date,
      sexo: "",
      mae: "",
      pai: "",
      email: "",
      cep: "",
      endereco: "",
      numero: 0,
      bairro: "",
      cidade: "",
      estado: "",
      telefoneFixo: "",
      celular: "",
      altura: 0,
      peso: 0,
      tipoSanguineo: ""
    }
  }

  ngOnInit(): void {
  }

  onSubmit(){ 
    if(this.consulta === "consultaCandidatosPorEstado"){
      this.consultaService.obterCandidatosPorEstado(this.estado).subscribe(candidatos => {
      this.qtdeCandidatos = candidatos.length;
      },erro => {
        console.log("Não foi possível obter os candidatos",erro);
      });

    } else if (this.consulta === "consultaImcPorIdade"){
        let faixaIdade = this.faixaIdade.split(" a ")
        this.consultaService.obterImcMedio(faixaIdade).subscribe(candidatos => {
          candidatos.forEach(candidato => {
            this.candidatoPayload.altura += candidato.altura;
            this.candidatoPayload.peso += candidato.peso;
            this.imcMedio = (this.candidatoPayload.peso/(this.candidatoPayload.altura*this.candidatoPayload.altura)).toFixed(2);
          });
        });

        
      } else if (this.consulta === "consultaObesosPorSexo"){
        this.consultaService.obterObesosPorSexo(this.sexo).subscribe(candidatos => {
          this.candidatosPorSexo = candidatos.length;
          this.candidatosObesos = candidatos.filter(candidato => {
              return (candidato.peso/(candidato.altura * candidato.altura)) > 30 === true;
          });
          console.log(this.candidatosObesos)
          console.log(this.candidatosPorSexo)

          this.porcentagem = this.candidatosObesos.length * this.candidatosPorSexo / 100;
          
        })
      } else if (this.consulta === "consultaIdadePorTipoSanguineo") {
          this.consultaService.obterCandidatosPorTipoSanguineo(this.tipoSanguineo).subscribe(candidatos => {
          let hoje = new Date().getFullYear();
          candidatos.forEach(candidato => {
            this.idadeTotal += hoje - candidato.dataNasc.getFullYear();
            return this.idadeTotal;
          }); 
          console.log(this.idadeTotal);
          this.totalCandidatos = candidatos.length;
          this.mediaIdade = this.idadeTotal/this.totalCandidatos;
        });

      } else if (this.consulta === "consultaCandidatosPorTipoSanguineo") {
        this.consultaService.obterCandidatosPorTipoSanguineo(this.tipoSanguineo).subscribe(candidatos => {
          this.qtdeCandidatos = candidatos.length;
        })
      }
  }

  onClick(){
    this.clicado = true;
    let form = document.getElementById('form') as HTMLVideoElement;
    form.style.display = "none";
  }
}