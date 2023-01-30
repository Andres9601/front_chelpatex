import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CambiarPassComponent } from './pages/cambiar-pass/cambiar-pass.component';
import { CrearUserComponent } from './pages/crear-user/crear-user.component';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'crearUser',
    component: CrearUserComponent
  },
  {
    path: 'cambiarPass',
    component: CambiarPassComponent
  },
  {
    path: '**',
    redirectTo: '/auth/login'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
