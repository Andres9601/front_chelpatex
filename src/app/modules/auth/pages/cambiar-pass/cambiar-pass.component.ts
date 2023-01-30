import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServicesService } from '../../services/auth-services.service';

@Component({
  selector: 'app-cambiar-pass',
  templateUrl: './cambiar-pass.component.html',
  styleUrls: ['./cambiar-pass.component.css']
})
export class CambiarPassComponent implements OnInit {

  resPass: FormGroup =new FormGroup({})
  ocultarMostrarPassword = 'password';
  showEnableBtnPwd: boolean = false;
  public NUMEROS = /^[0-9]+$/

  constructor(
    private formBuilder:FormBuilder,
    private router:Router,
    private userService:AuthServicesService) { }

  ngOnInit(): void {
    this.datosFormulario();
  }

  datosFormulario(){
    this.resPass = this.formBuilder.group({
      user:['',[Validators.required,Validators.email]]
    })
  }

  toBack(){
    this.router.navigate(['/auth/login']);
  }

  recuperarPassword(){
    this.userService.forgotPassword(this.resPass.get('user')?.value).then(result => {
      this.router.navigate(['/auth/login']);
    }).catch(error => console.log(error))
  }
}
