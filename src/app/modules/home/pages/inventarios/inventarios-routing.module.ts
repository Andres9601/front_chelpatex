import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventarioProdComponent } from './inventario-prod/inventario-prod.component';
import { RouterModule, Routes } from '@angular/router';
import { InventarioProveeComponent } from './inventario-provee/inventario-provee.component';
import { HomePageComponent } from '../home-page/home-page.component';
import { NuevoMoldeComponent } from './nuevo-molde/nuevo-molde.component';
import { NuevoItemComponent } from './nuevo-item/nuevo-item.component';

const routes: Routes = [
  {
    path:'inventarioProd',
    component:InventarioProdComponent
  },
  {
    path:'inventarioProvee',
    component:InventarioProveeComponent
  },
  {
    path:'nuevoMolde',
    component:NuevoMoldeComponent
  },
  {
    path:'nuevoItem',
    component:NuevoItemComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventariosRoutingModule { }
