import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthServicesService } from '../../services/auth-services.service';

@Component({
  selector: 'app-crear-user',
  templateUrl: './crear-user.component.html',
  styleUrls: ['./crear-user.component.css']
})
export class CrearUserComponent implements OnInit {

  createUser: FormGroup =new FormGroup({})
  ocultarMostrarPassword = 'password';
  showEnableBtnPwd: boolean = false;
  public NUMEROS = /^[0-9]+$/
  labelPosition: 'before' | 'after' = 'after';
  idTipo!:number;
  valor = '';

  constructor(
    private formBuilder:FormBuilder,
    private router:Router,
    private userService:AuthServicesService,
    private toastr:MatSnackBar) { }

  ngOnInit(){
    this.datosFormulario();
    console.log(this.labelPosition)
  }

  datosFormulario(){
    this.createUser = this.formBuilder.group({
      user:['',[Validators.required,Validators.email]],
      celular:['',[Validators.required,Validators.pattern('[0-9]*')]],
      nombreEmpresa:['',[Validators.required]],
      tipo:[''],
      check:[''],
      password:['',[Validators.required]],
    })
  }

  restriccionNumber(evento:any){
    console.log(evento)
    let teclaPresionada = evento.key;
    let teclaPresionadaEsUnNumero = Number.isInteger(parseInt(teclaPresionada));
    console.log(teclaPresionadaEsUnNumero)

    let sePresionoUnaTeclaNoAdmitida = 
        teclaPresionada != 'ArrowDown' &&
        teclaPresionada != 'ArrowUp' &&
        teclaPresionada != 'ArrowLeft' &&
        teclaPresionada != 'ArrowRight' &&
        teclaPresionada != 'Backspace' &&
        teclaPresionada != 'Delete' &&
        teclaPresionada != 'Enter' &&
        !teclaPresionadaEsUnNumero;
        console.log(sePresionoUnaTeclaNoAdmitida)
        let comienzaPorCero = 
        this.createUser.get('celular')?.value.length === 0 &&
        teclaPresionada == 0;
        console.log(comienzaPorCero)
        if (sePresionoUnaTeclaNoAdmitida || comienzaPorCero) {
          evento.preventDefault(); 
        } else if (teclaPresionadaEsUnNumero) {
          this.valor += String(teclaPresionada);
        }

  }

  cambiarTipo(): void {
    if (this.ocultarMostrarPassword === 'password') {
      this.ocultarMostrarPassword = 'text';
      this.showEnableBtnPwd = true;
    } else {
      this.ocultarMostrarPassword = 'password';
      this.showEnableBtnPwd = false;
    }
  }

  radio(radio:any){
    console.log(radio);
    if(radio.value === 'proveedor'){
      this.idTipo = 1;
      this.createUser.get('tipo')?.setValue(radio.value);
    }else if(radio.value === 'productor'){
      this.idTipo = 2;
      this.createUser.get('tipo')?.setValue(radio.value);
    }
    console.log(this.createUser.value.check)
  }

  toBack(){
    this.router.navigate(['auth/login'])
  }

  soloNumeros($event:any):boolean{
    const stringKey: string = $event.key;
    return this.NUMEROS.test(stringKey);
  }

  crearUsuario(){
    let email =this.createUser.get('user')?.value;
    let password = this.createUser.get('password')?.value
    this.userService.registre(email,password).then(result => {
      console.log(result)
      if(result){
        this.crearServicioRe(email,result.user.uid);
      }
      this.toastr.open('Usuario creado con exito','',{
        duration: 3 * 1000,
        panelClass:['sucess-snackbar']
      });
      this.router.navigate(['auth/login']);
    }).catch(error => {
      console.log(error)
      this.toastr.open('Error al crear el usuario','',{
        duration: 3 * 1000,
        panelClass:['error-snackbar']
      });
    })
  }

  crearServicioRe(email:any,idUser:any){
    console.log(idUser)
    let body = {
      usuarioDTO:{
        idUsuario:idUser,
        email:email,
        nombre:this.createUser.get('nombreEmpresa')?.value,
        telefono:this.createUser.get('celular')?.value,
        activo:true
      },
      rolDTO:{
        idRol:this.idTipo,
        rol:this.createUser.get('tipo')?.value,
        activo:true
      }
    }
    console.log(body)
      this.userService.registroRe(body).subscribe(regis =>{
        console.log(regis);
      })
  }

}
