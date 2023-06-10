import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationComponent } from './components/authentication/authentication.component';
import { MainComponent } from './components/main/main.component';
import { CatalogoComponent } from './components/main/catalogo/catalogo.component';
import { ShoppingCartComponent } from './components/main/shopping-cart/shopping-cart.component';

const routes: Routes = [
  { path: 'login', component: AuthenticationComponent },
  { path: 'main', component: MainComponent,children:[
    {path:'',component:CatalogoComponent},
    {path:'shoppingCart',component:ShoppingCartComponent}
  ]},
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
