import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalculadoraComponent } from './calculadora/calculadora.component';
import { ItemsComponent } from './items/items.component';
import { ColeccionesComponent } from './mis-colecciones/colecciones.component';
import { MoldesComponent } from './moldes/moldes.component';
import { NuevaColeccionComponent } from './nueva-coleccion/nueva-coleccion.component';
import { TablaColeccionesComponent } from './tabla-colecciones/tabla-colecciones.component';

const routes: Routes = [
  {
    path:'misColecciones',
    component:ColeccionesComponent
  },
  {
    path:'tablaColecciones',
    component:TablaColeccionesComponent
  },
  {
    path:'nuevaColeccion',
    component:NuevaColeccionComponent
  },
  {
    path:'seleccionMolde',
    component:MoldesComponent
  },
  {
    path:'itemMolde',
    component:ItemsComponent
  },
  {
    path:'calculadoraColeccion',
    component:CalculadoraComponent
  },
  {
    path:'**',
    redirectTo:'misColecciones'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ColeccionesRoutingModule { }
