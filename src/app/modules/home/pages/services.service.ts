import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  /* private apiURL = environment.apiUrl; */
  private apiURL = '/webresources/controller';
  private token = JSON.stringify(localStorage.getItem('Token')).replace(/['"]+/g,'');
  

  constructor(
    private http:HttpClient
  ) { }


  public datosColeccion = new BehaviorSubject<any>("");
  public datosRecibe = this.datosColeccion.asObservable();

  public nombreSelecc = new BehaviorSubject<any>("");
  public nombre = this.nombreSelecc.asObservable();


  enviarDatos(datos:any){
    this.datosColeccion.next(datos);
  }

  enviarNombre(datos:any){
    this.datosColeccion.next(datos);
  }

  consultarColecciones():Observable<any>{
    let idUsuario = localStorage.getItem('idUser');
    const headers = new HttpHeaders().set('x-firebase-auth',this.token);
    return this.http.get<any>(`${this.apiURL}/controladorColeccion/consultarColeccionesUsuario?idUsuario=${idUsuario}`,{headers});
  }

  crearColeccion(body:any):Observable<any>{
    const headers = new HttpHeaders().set('x-firebase-auth',this.token);
    return this.http.post(`${this.apiURL}/controladorColeccion/nuevaColeccion`,body,{headers});
  }

  eliminarColeccion(idColeccion:number):Observable<any>{
    const headers = new HttpHeaders().set('x-firebase-auth',this.token);
    return this.http.delete(`${this.apiURL}/controladorColeccion/eliminar?idColeccion=${idColeccion}`,{headers});
  }

  consultarDiseno(body:any):Observable<any>{
    const headers = new HttpHeaders().set('x-firebase-auth',this.token);
    return this.http.get(`${this.apiURL}/controladorColeccion/consultarColeccionCompleta?idColeccion=${body.idColeccion}&idUsuario=${body.idUsuario}`,{headers});
  }

  crearDiseno(body:any):Observable<any>{
    const headers = new HttpHeaders().set('x-firebase-auth',this.token);
    return this.http.post(`${this.apiURL}/controladorDiseno/nuevoDiseno`,body,{headers});
  }

  consultarMolde(body:any):Observable<any>{
    const headers = new HttpHeaders().set('x-firebase-auth',this.token);
    return this.http.get(`${this.apiURL}/controladorMolde/consultar?tipoPrenda=${body.prenda}&tipoModa=${body.moda}&objetivo=${body.objetivo}&tipoAcabado=${body.acabado}`,{headers});
  }

  consultarItem(idMolde:any):Observable<any>{
    const headers = new HttpHeaders().set('x-firebase-auth',this.token);
    return this.http.get(`${this.apiURL}/controladorItem/consultarItemsMolde?idMolde=${idMolde}`,{headers});
  }

  consultarTareas():Observable<any>{
    const headers = new HttpHeaders().set('x-firebase-auth',this.token);
    return this.http.get(`${this.apiURL}/controladorMaquila/consultar`,{headers})
  }

  actualizarDiseno(body:any):Observable<any>{
    const headers = new HttpHeaders().set('x-firebase-auth',this.token);
    return this.http.put(`${this.apiURL}/controladorDiseno/actualizarDiseno`,body,{headers})
  }

  finalizar(body:any):Observable<any>{
    const headers = new HttpHeaders().set('x-firebase-auth',this.token);
    return this.http.put(`${this.apiURL}/controladorDiseno/actualizarDisenoMg`,body,{headers})
  }

  eliminarDiseno(idDiseno:any):Observable<any>{
    const headers = new HttpHeaders().set('x-firebase-auth',this.token);
    return this.http.delete(`${this.apiURL}/controladorDiseno/eliminar?idDiseno=${idDiseno}`,{headers})
  }
}
