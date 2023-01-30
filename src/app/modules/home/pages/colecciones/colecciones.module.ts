import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ColeccionesRoutingModule } from './colecciones-routing.module';
import { NuevaColeccionComponent } from './nueva-coleccion/nueva-coleccion.component';
import { TablaColeccionesComponent } from './tabla-colecciones/tabla-colecciones.component';
import { ColeccionesComponent } from './mis-colecciones/colecciones.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CalculadoraComponent } from './calculadora/calculadora.component';
import { SugerenciaComponent } from './sugerencia/sugerencia.component';
import { MoldesComponent } from './moldes/moldes.component';
import { ItemsComponent } from './items/items.component';


@NgModule({
  declarations: [
    ColeccionesComponent,
    NuevaColeccionComponent,
    TablaColeccionesComponent,
    CalculadoraComponent,
    SugerenciaComponent,
    MoldesComponent,
    ItemsComponent
  ],
  imports: [
    CommonModule,
    ColeccionesRoutingModule,
    SharedModule
  ]
})
export class ColeccionesModule { }
