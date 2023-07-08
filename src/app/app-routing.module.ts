import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationComponent } from './components/authentication/authentication.component';
import { MainComponent } from './components/main/main.component';
import { CatalogoComponent } from './components/main/catalogo/catalogo.component';
import { ShoppingCartComponent } from './components/main/shopping-cart/shopping-cart.component';
import { MainAdminComponent } from './components/main-admin/main-admin.component';
import { InventarioComponent } from './components/main-admin/inventario/inventario.component';
import { HomeComponent } from './components/main-admin/home/home.component';
import { TablesComponent } from './components/main-admin/tables/tables.component';
import { MasterComponent } from './components/main-admin/master/master.component';
import { EmployessComponent } from './components/main-admin/employess/employess.component';
import { ClientComponent } from './components/main-admin/client/client.component';
import { AccountComponent } from './components/main-admin/account/account.component';
import { StatisticsComponent } from './components/main-admin/statistics/statistics.component';
import { PedidoComponent } from './components/main-admin/pedido/pedido.component';
import { InventarioIngredienteComponent } from './components/main-admin/inventario-ingrediente/inventario-ingrediente.component';
import { InventarioAddComponent } from './components/main-admin/inventario-add/inventario-add.component';
import { InventarioIngredienteAddComponent } from './components/main-admin/inventario-ingrediente-add/inventario-ingrediente-add.component';

const routes: Routes = [
  { path: 'login', component: AuthenticationComponent },
  { path: 'main', component: MainComponent,children:[
    {path:'',component:CatalogoComponent},
    {path:'shoppingCart',component:ShoppingCartComponent}
  ]},
  { path: 'admin',component:MainAdminComponent,children:[
    {path:'home',component:HomeComponent},
    {path:'mesas',component:TablesComponent},
    {path:'inventario',component:InventarioComponent},
    {path:'inventario/add',component:InventarioAddComponent},
    {path:'ingredientes',component:InventarioIngredienteComponent},
    {path:'ingredientes/add',component:InventarioIngredienteAddComponent},
    {path:'pedido',component:PedidoComponent},
    {path:'statistics',component:StatisticsComponent},
    {path:'master',component:MasterComponent},
    {path:'employess',component:EmployessComponent},
    {path:'clients',component:ClientComponent},
    {path:'account',component:AccountComponent}
  ]},
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
