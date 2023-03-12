import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Auth, createUserWithEmailAndPassword , signInWithEmailAndPassword, signOut, sendPasswordResetEmail, sendEmailVerification, onAuthStateChanged, signInWithPhoneNumber} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthServicesService {

  /* private apiURL = '/webresources/controller'; */
  private apiURL = environment.apiUrl;

  constructor(
    private auth: Auth,
    private router:Router,
    private http:HttpClient) { }


  login(email:string,password:string){
   return signInWithEmailAndPassword(this.auth,email,password);
  }

  loginWithPhone(phone:string,appVerication:any){
    return signInWithPhoneNumber(this.auth,phone,appVerication)
  }

  loginRe(idUser:any,token:any):Observable<any>{
    const headers = new HttpHeaders().set('x-firebase-auth',token);
    return this.http.get(`${this.apiURL}/controladorUsuario/consultarDatosUsuario?idUsuario=${idUser}`,{headers})
  }
  
  registre(email:string, password:string){
    return createUserWithEmailAndPassword(this.auth,email,password)
  }

  registroRe(body:any):Observable<any>{
    return this.http.post(`${this.apiURL}/controladorUsuario/registrarUsuario`,body)
  }

  forgotPassword(email:string){
    return sendPasswordResetEmail(this.auth,email)
  }

  /* sendEmailForVerificacion(user:any){
    return sendEmailVerification(user);
  } */

  logOut(){
    return signOut(this.auth);
  }
}
