import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServicesService } from '../../services.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {

  contador:number = 1;
  items = Array.from({length: 10}).map((_, i) => `Item #${i}`);

  seleccion:string = "Añadir al carrito"

  constructor(private router:Router,
    private location:Location,
    private service:ServicesService) { }

  ngOnInit(): void {
    this.consultarItems();
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
    console.log(item)
    if(this.seleccion === 'Añadir al carrito'){
      this.seleccion = 'No seleccionar';
    }else{
      this.seleccion = "Añadir al carrito"
    }
  }

  consultarItems(){
    let idMolde= localStorage.getItem('idMold')
    this.service.consultarItem(idMolde).subscribe(item => {
      console.log(item)
    })
  }

  cancelar(){
    this.location.back()
  }

  continuar(){
    this.router.navigate(['home/misColecciones/calculadoraColeccion'])
  }

}
