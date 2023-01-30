import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'misColecciones', 
    loadChildren: () => import(`./pages/colecciones/colecciones.module`).then(m => m.ColeccionesModule)
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
