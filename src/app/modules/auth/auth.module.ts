import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './pages/login/login.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { CrearUserComponent } from './pages/crear-user/crear-user.component';
import { CambiarPassComponent } from './pages/cambiar-pass/cambiar-pass.component';



@NgModule({
  declarations: [
    LoginComponent,
    CrearUserComponent,
    CambiarPassComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class AuthModule { }
