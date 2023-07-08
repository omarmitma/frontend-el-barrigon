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
import { FormsModule } from '@angular/forms';
import { MainAdminComponent } from './components/main-admin/main-admin.component';
import { InventarioComponent } from './components/main-admin/inventario/inventario.component';
import { HomeComponent } from './components/main-admin/home/home.component';
import { InventarioAddComponent } from './components/main-admin/inventario-add/inventario-add.component';
import { TablesComponent } from './components/main-admin/tables/tables.component';
import { MasterComponent } from './components/main-admin/master/master.component';
import { EmployessComponent } from './components/main-admin/employess/employess.component';
import { ClientComponent } from './components/main-admin/client/client.component';
import { AccountComponent } from './components/main-admin/account/account.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { StatisticsComponent } from './components/main-admin/statistics/statistics.component';
import { PedidoComponent } from './components/main-admin/pedido/pedido.component';
import { NgxMasonryModule } from 'ngx-masonry';
import { InventarioIngredienteComponent } from './components/main-admin/inventario-ingrediente/inventario-ingrediente.component';
import { InventarioIngredienteAddComponent } from './components/main-admin/inventario-ingrediente-add/inventario-ingrediente-add.component';
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
    ShoppingCartComponent,
    MainAdminComponent,
    InventarioComponent,
    HomeComponent,
    InventarioAddComponent,
    TablesComponent,
    MasterComponent,
    EmployessComponent,
    ClientComponent,
    AccountComponent,
    StatisticsComponent,
    PedidoComponent,
    InventarioIngredienteComponent,
    InventarioIngredienteAddComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSelectModule,
    FormsModule,
    MatButtonModule,
    MatTooltipModule,
    NgxMasonryModule
  ],
  providers: [
    MainFunction,
    VariablesGlobales,
    Alert
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
