import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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

  

  constructor(
    private location:Location,
    private _formBuilder: FormBuilder,
    private router:Router,
    private service:ServicesService) { }

  ngOnInit(): void {
    this.formularioTipo();
    console.log(this.prenda)
  }

  formularioTipo(){
    this.firstFormGroup = this._formBuilder.group({
      nombre:['',Validators.required]
    });
  }

  continuar(){
    localStorage.setItem('nombreDiseno',this.firstFormGroup.get('nombre')?.value);
    localStorage.setItem('prenda',this.prenda);
    localStorage.setItem('moda',this.moda);
    localStorage.setItem('persona',this.persona);
    localStorage.setItem('acabado',this.acabado);
    let body = {
      idColeccion:localStorage.getItem('idCole'),
      idUsuario:localStorage.getItem('idUser'),
      nombre:this.firstFormGroup.get('nombre')?.value,
      tipoPrenda:this.prenda,
      tipoModa:this.moda,
      objetivo:this.persona,
      tipoAcabado:this.acabado
    }
    this.service.crearDiseno(body).subscribe(res => {
      localStorage.setItem('idDise',res.idDiseno);
      console.log(localStorage.getItem('idDise'))
      if(res){
        this.router.navigate(['home/misColecciones/seleccionMolde'])
      }
    })
  }

  toBack(){
    this.location.back();
  }
}

