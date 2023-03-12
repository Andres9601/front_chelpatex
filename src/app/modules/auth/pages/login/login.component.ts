import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthServicesService } from '../../services/auth-services.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login: FormGroup =new FormGroup({})
  ocultarMostrarPassword = 'password';
  showEnableBtnPwd: boolean = false;
  public NUMEROS = /^[0-9]+$/
  rol: any;
  nombreUser: any;

  constructor(
    private formBuilder:FormBuilder,
    private router:Router,
    private userServices:AuthServicesService,
    private toastr:MatSnackBar ) { }

  ngOnInit(){
    this.datosFormulario();
  }

  datosFormulario(){
    this.login = this.formBuilder.group({
      user:['',[Validators.required,Validators.email]],
      password:['',[Validators.required]],
    })
  }

  crearCuenta(){
    this.router.navigate(['auth/crearUser'])
  }

  recuperarPass(){
    this.router.navigate(['auth/cambiarPass'])
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

  inicioSesion(){
    let email = this.login.get('user')?.value;
    let password = this.login.get('password')?.value;
    this.userServices.login(email,password).then(result =>{
      console.log(result)
      
      let token:string;
      result.user.getIdToken().then(res =>{
        token = res;
        localStorage.setItem('Token',token);
        console.log(result.user.getIdToken().then(res =>{console.log(res)}));
        localStorage.setItem('idUser',result.user.uid)
        if(result.user.uid){
          this.loginRe(result.user.uid,token)
          
        }
      })
      
    }).catch(error => {
      console.log(error)
      this.toastr.open('Error al iniciar sesión, revise sus credenciales','',{
        duration: 3 * 1000,
        panelClass:['error-snackbar']
      });
    });
    
  }

  loginRe(idUser:any,token:any){
    this.userServices.loginRe(idUser,token).subscribe(res =>{
      this.rol = res.rolDTO.rol;
      console.log(res)
      if(res.rolDTO.rol === "Proveedor"){
        this.router.navigate(['/home/inventarios/inventarioProvee'])
      }else{
        this.router.navigate(['/home']);
      }
      this.nombreUser = res.usuarioDTO.nombre;
    })
  }

  

}
