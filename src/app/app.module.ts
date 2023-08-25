import { LOCALE_ID, NgModule } from '@angular/core';
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
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptorService } from './services/interceptor/auth-interceptor.service';
import { TextShared } from './shared/functions/textShared';
import { Singleton } from './library/Singleton';
import { ModalChosenMesaComponent } from './shared/components/modals/modal-chosen-mesa/modal-chosen-mesa.component';
import { CreditCardFormComponent } from './shared/components/otros/credit-card-form/credit-card-form.component';
import { PagoComponent } from './components/main/pago/pago.component';
import { ValidationForms } from './shared/functions/validation';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ModalChosenProductosComponent } from './shared/components/modals/modal-chosen-productos/modal-chosen-productos.component';
import { ModalMetodoPagoComponent } from './shared/components/modals/modal-metodo-pago/modal-metodo-pago.component';
import { CloudinaryFunction } from './shared/functions/cloudinary';
import { ModalChosenRangeFechaComponent } from './shared/components/modals/modal-chosen-range-fecha/modal-chosen-range-fecha.component';
import { FilterItems } from './shared/functions/filterItems';

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
    InventarioIngredienteAddComponent,
    ModalChosenMesaComponent,
    CreditCardFormComponent,
    PagoComponent,
    ModalChosenProductosComponent,
    ModalMetodoPagoComponent,
    ModalChosenRangeFechaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSelectModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule,
    MatTooltipModule,
    NgxMasonryModule,
    CarouselModule
  ],
  providers: [
    MainFunction,
    TextShared,
    VariablesGlobales,
    ValidationForms,
    Singleton,
    Alert,
    CloudinaryFunction,
    FilterItems,
    {provide: HTTP_INTERCEPTORS,useClass: AuthInterceptorService,multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
