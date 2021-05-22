import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { ConsultaComponent } from './consulta/consulta.component';
import { HttpClientModule } from '@angular/common/http';
import { ConsultaService } from './consulta.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    ConsultaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {path: "", component: HomeComponent},
      {path: "consulta", component: ConsultaComponent}
    ]),
    HttpClientModule
  ],
  providers: [HttpClientModule, ConsultaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
