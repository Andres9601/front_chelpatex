import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventariosRoutingModule } from './inventarios-routing.module';
import { InventarioProdComponent } from './inventario-prod/inventario-prod.component';
import { InventarioProveeComponent } from './inventario-provee/inventario-provee.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NuevoMoldeComponent } from './nuevo-molde/nuevo-molde.component';
import { NuevoItemComponent } from './nuevo-item/nuevo-item.component';



@NgModule({
  declarations: [
    InventarioProdComponent,
    InventarioProveeComponent,
    NuevoMoldeComponent,
    NuevoItemComponent
  ],
  imports: [
    CommonModule,
    InventariosRoutingModule,
    SharedModule
  ]
})
export class InventariosModule { }
