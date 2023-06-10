import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { AuthenticationComponent } from './components/authentication/authentication.component';
import { CatalogoComponent } from './components/main/catalogo/catalogo.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { LoadingComponent } from './shared/components/loading/loading.component';
import { PaginationComponent } from './shared/components/pagination/pagination.component';
import { ModalDetallarPlatoComponent } from './shared/components/modals/modal-detallar-plato/modal-detallar-plato.component';
import { MainFunction } from './shared/functions/mainFunction';
import { Alert } from './shared/functions/alerts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSelectModule} from '@angular/material/select';
import { VariablesGlobales } from './shared/functions/variablesGlobales';
import { ShoppingCartComponent } from './components/main/shopping-cart/shopping-cart.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    AuthenticationComponent,
    CatalogoComponent,
    HeaderComponent,
    FooterComponent,
    LoadingComponent,
    PaginationComponent,
    ModalDetallarPlatoComponent,
    ShoppingCartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSelectModule
  ],
  providers: [
    MainFunction,
    VariablesGlobales,
    Alert
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
