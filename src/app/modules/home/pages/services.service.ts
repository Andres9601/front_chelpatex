import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  /* private apiURL = environment.apiUrl; */
  private apiURL = 'webresources/controller';
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

  consultarTipoItem():Observable<any>{
    const headers = new HttpHeaders().set('x-firebase-auth',this.token);
    return this.http.get(`${this.apiURL}/controladorDominio/consultarTiposItem`,{headers})
  }
  
  consultarItemTipo(item:string):Observable<any>{
    const headers = new HttpHeaders().set('x-firebase-auth',this.token);
    return this.http.get(`${this.apiURL}/controladorItem/consultarItemsTipo?tipoItem=${item}`,{headers})
  }

  agregarItem(body:any):Observable<any>{
    const headers = new HttpHeaders().set('x-firebase-auth',this.token);
    return this.http.post(`${this.apiURL}/controladorItem/crearItemsMolde`,body,{headers})
  }
  // proveedor
  consultarItemsUsuarioProvee(item:string,idUsuario:any):Observable<any>{
    const headers = new HttpHeaders().set('x-firebase-auth',this.token);
    return this.http.get(`${this.apiURL}/controladorItem/consultarItemsUsuario?idUsuario=${idUsuario}&tipoItem=${item}`,{headers})
  }

  consultarDetalleItem(idItem:string):Observable<any>{
    const headers = new HttpHeaders().set('x-firebase-auth',this.token);
    return this.http.get(`${this.apiURL}/controladorItem/consultarDetallesItem?idItem=${idItem}`,{headers})
  }

  consultarMoldesUsuarioProvee(idUsuario:any){
    const headers = new HttpHeaders().set('x-firebase-auth',this.token);
    return this.http.get<any>(`${this.apiURL}/controladorMolde/consultarMoldesUsuario?idUsuario=${idUsuario}`,{headers})
  }

  consultarDetalleMolde(idMolde:string):Observable<any>{
    const headers = new HttpHeaders().set('x-firebase-auth',this.token);
    return this.http.get(`${this.apiURL}/controladorMolde/consultarDetallesMolde?idMolde=${idMolde}`,{headers})
  }

  crearItemConCampos(body:any):Observable<any>{
    const headers = new HttpHeaders().set('x-firebase-auth',this.token);
    return this.http.post(`${this.apiURL}/controladorItem/crearItemConCampos`,body,{headers})
  }

  tipoPrenda(){
    const headers = new HttpHeaders().set('x-firebase-auth',this.token);
    return this.http.get(`${this.apiURL}/controladorDominio/consultarDominiosTipo?tipoDominio=DOM_TIPO_PRENDA`,{headers})
  }
  tipoModa(){
    const headers = new HttpHeaders().set('x-firebase-auth',this.token);
    return this.http.get(`${this.apiURL}/controladorDominio/consultarDominiosTipo?tipoDominio=DOM_TIPO_MODA`,{headers})
  }
  tipoObjetivo(){
    const headers = new HttpHeaders().set('x-firebase-auth',this.token);
    return this.http.get(`${this.apiURL}/controladorDominio/consultarDominiosTipo?tipoDominio=DOM_OBJETIVO`,{headers})
  }
  tipoAcabado(){
    const headers = new HttpHeaders().set('x-firebase-auth',this.token);
    return this.http.get(`${this.apiURL}/controladorDominio/consultarDominiosTipo?tipoDominio=DOM_TIPO_ACABADO`,{headers})
  }

  controladorMoldeCrear(body:any):Observable<any>{
    const headers = new HttpHeaders().set('x-firebase-auth',this.token);
    return this.http.post(`${this.apiURL}/controladorMolde/crear`,body,{headers})
  }

  consultarCamposTipoItem(item:any):Observable<any>{
    const headers = new HttpHeaders().set('x-firebase-auth',this.token);
    return this.http.get(`${this.apiURL}/controladorDominio/consultarCamposTipoItem?tipoItem=${item}`,{headers})
  }
}
