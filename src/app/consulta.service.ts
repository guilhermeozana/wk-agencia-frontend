import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, ObservableInput } from 'rxjs';
import { CandidatoPayload } from './candidato-payload';

@Injectable({
  providedIn: 'root'
})
export class ConsultaService {

  private url = 'http://localhost:8080/api/candidatos';

  constructor(private httpClient: HttpClient) {}

  obterCandidatosPorEstado(estado: String): Observable<CandidatoPayload[]>{
    return this.httpClient.get<CandidatoPayload[]>(this.url+"/estado/"+estado);
  }  

  obterImcMedio(faixaIdade: string[]):Observable<CandidatoPayload[]>{
    return this.httpClient.get<CandidatoPayload[]>(this.url+"/faixa-idade/"+faixaIdade[0]+"/"+faixaIdade[1]);
  }

  obterObesosPorSexo(sexo:String): Observable<CandidatoPayload[]>{
    return this.httpClient.get<CandidatoPayload[]>(this.url+"/sexo/"+sexo);
  }

  obterCandidatosPorTipoSanguineo(tipo:String): Observable<CandidatoPayload[]>{
    return this.httpClient.get<CandidatoPayload[]>(this.url+"/tipo-sanguineo/"+tipo);
  }


}
