import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServicesService } from '../../services.service';

@Component({
  selector: 'app-moldes',
  templateUrl: './moldes.component.html',
  styleUrls: ['./moldes.component.css']
})
export class MoldesComponent implements OnInit {

  contador:number = 1;
  /* items = Array.from({length: 10}).map((_, i) => `Item #${i}`); */
  spinner:boolean = false;

  items:any;

  seleccion:string = "Seleccionar y añadir al carrito"

  constructor(private router:Router,
    private location:Location,
    private service:ServicesService) { }

  ngOnInit(): void {
    this.consultarMoldes();
  }

  contarMas(){
    this.contador += 1;
  }

  contarMenos(){
    if(this.contador > 1){
      this.contador -= 1;
    }
  }

  seleccionarItem(item:any){
    localStorage.setItem('idMold',item.idMolde)
    console.log(item)
    if(this.seleccion === 'Seleccionar y añadir al carrito'){
      this.seleccion = 'No seleccionar';
    }else{
      this.seleccion = "Seleccionar y añadir al carrito"
    }
  }

  consultarMoldes(){
    this.spinner = true;
    let body = {
      prenda:localStorage.getItem('prenda'),
      moda:localStorage.getItem('moda'),
      objetivo:localStorage.getItem('persona'),
      acabado:localStorage.getItem('acabado'),
    }
    this.service.consultarMolde(body).subscribe(molde => {
      if(molde){
        this.items = molde;
        this.spinner = false;
        console.log(molde)
        
      }
    })
  }

  cancelar(){
    this.location.back()
  }

  continuar(){
    this.router.navigate(['home/misColecciones/itemMolde'])
  }

}
