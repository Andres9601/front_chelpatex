import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicesService } from '../../services.service';


@Component({
  selector: 'app-nueva-coleccion',
  templateUrl: './nueva-coleccion.component.html',
  styleUrls: ['./nueva-coleccion.component.css']
})
export class NuevaColeccionComponent implements OnInit {

  firstFormGroup!:FormGroup;
  prenda!:string;
  moda!:string;
  persona!:string;
  acabado!:string;
  siMolde:boolean = false;

  constructor(
    private location:Location,
    private _formBuilder: FormBuilder,
    private router:Router,
    private route: ActivatedRoute,
    private service:ServicesService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(res => {
      console.log(res);
      if(res['respuesta'] === 'false'){
        this.siMolde = false;
        console.log(res['respuesta']);
      }else{
        this.siMolde = true;
        console.log(res['respuesta']);
      }
    })
    this.formularioTipo();
    console.log(this.prenda)
  }

  formularioTipo(){
    this.firstFormGroup = this._formBuilder.group({
      nombre:['',Validators.required],
      nombreMol:[''],
      ruta:['https://www.google.com/']
    });
  }

  continuar(){
    localStorage.setItem('nombreDiseno',this.firstFormGroup.get('nombre')?.value);
    localStorage.setItem('prenda',this.prenda);
    localStorage.setItem('moda',this.moda);
    localStorage.setItem('persona',this.persona);
    localStorage.setItem('acabado',this.acabado);
    let body;
    if(!this.siMolde){
      body = {
        idColeccion:localStorage.getItem('idCole'),
        idUsuario:localStorage.getItem('idUser'),
        nombre:this.firstFormGroup.get('nombre')?.value,
        molde:{
          nombre:this.firstFormGroup.get('nombreMol')?.value,
          tipoMolde:"PROPIO",
          tipoPrenda:this.prenda,
          tipoModa:this.moda,
          objetivo:this.persona,
          tipoAcabado:this.acabado,
          rutaArchivo:this.firstFormGroup.get('ruta')?.value,
          idUsuario:localStorage.getItem('idUser')
        }
      }
    }else{
      body = {
        idColeccion:localStorage.getItem('idCole'),
        idUsuario:localStorage.getItem('idUser'),
        nombre:this.firstFormGroup.get('nombre')?.value,
        molde:{
          nombre:this.firstFormGroup.get('nombreMol')?.value,
          tipoMolde:"PROPIO",
          tipoPrenda:this.prenda,
          tipoModa:this.moda,
          objetivo:this.persona,
          tipoAcabado:this.acabado,
          rutaArchivo:'',
          idUsuario:localStorage.getItem('idUser')
        }
      }
    }
    console.log(body);
    this.service.crearDiseno(body).subscribe(res => {
      let idMolde1 = res.moldes[0].idMolde;
      localStorage.setItem('idDise',res.idDiseno);
      console.log(localStorage.getItem('idDise'))
      if(res && this.siMolde === true){
        this.router.navigate(['home/misColecciones/seleccionMolde'])
      }else{
        console.log(res.moldes[1].idMolde);
        localStorage.setItem('idMolde',res.moldes[1].idMolde);
        this.router.navigate(['home/misColecciones/itemMolde'],{queryParams:{idMolde1}})
      }
    })
  }

  toBack(){
    this.location.back();
  }
}

