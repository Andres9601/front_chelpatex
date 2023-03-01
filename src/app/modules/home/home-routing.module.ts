import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'misColecciones', 
    loadChildren: () => import(`./pages/colecciones/colecciones.module`).then(m => m.ColeccionesModule)
  },
  {
    path: 'inventarios', 
    loadChildren: () => import(`./pages/inventarios/inventarios.module`).then(m => m.InventariosModule)
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
export class HomeRoutingModule { }
