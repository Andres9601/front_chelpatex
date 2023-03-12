import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ServicesService } from '../../services.service';

export interface CampoMolde {
  idMolde:         number;
  idUsuario:       string;
  nombre:          string;
  fechaCreacion:   Date;
  precio:          number;
  tipoMolde:       string;
  tipoPrenda:      string;
  tipoModa:        string;
  objetivo:        string;
  tipoAcabado:     string;
  anchoTela:       number;
  consumoTotal:    null;
  tipoProduccion:  null;
  tipoCascada:     null;
  caracteristicas: null;
  rutaArchivo:     string;
  activo:          boolean;
  cantidad:        number;
}


@Component({
  selector: 'app-moldes',
  templateUrl: './moldes.component.html',
  styleUrls: ['./moldes.component.css']
})
export class MoldesComponent implements OnInit {

  contador:number = 1;
  /* items = Array.from({length: 10}).map((_, i) => `Item #${i}`); */
  spinner:boolean = false;
  selectProducts:CampoMolde[] = [];

  validadorMoldes:any;
  moldes:any;

  seleccion:string = "Seleccionar y añadir al carrito"

  constructor(private router:Router,
    private location:Location,
    private service:ServicesService,
    private dialog:MatDialog,
    private toastr:MatSnackBar) { }

  ngOnInit(): void {
    this.consultarMoldes();
  }

  contarMas(item:any){
    item.cantidad = item.cantidad ? item.cantidad +1 : item.cantidad = 1;
    this.selectProducts.map(cant => cant.cantidad = item.cantidad)
    console.log(item.cantidad)
    console.log(this.selectProducts)
  }

  contarMenos(item:any){
    if(item.cantidad > 1){
      item.cantidad = item.cantidad -1;
      console.log(item.cantidad)
      
    }
  }

  seleccionarMolde(molde:any){
    
    let index = this.selectProducts.findIndex(p => p.idMolde === molde.idMolde);
    console.log(this.selectProducts)

    if(index === -1){
      molde.selected = true;
      localStorage.setItem('idMold',molde.idMolde)
      this.selectProducts.push(molde)
      console.log(this.selectProducts)
    }else{
      molde.selected = false;
      this.selectProducts.splice(index,1);
      console.log(this.selectProducts)
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

  eliminarDiseno(){
    console.log(localStorage.getItem('idDise'));
    if(localStorage.getItem('idDise')){
        this.service.eliminarDiseno(localStorage.getItem('idDise')).subscribe(res =>{
        },(error) => {
          console.log(error)
          this.toastr.open('No hay moldes para los criterios seleccionados','',{
              duration: 3 * 1000,
              panelClass:['error-snackbar']
          });
          this.spinner = false;
          this.router.navigate(['/home/misColecciones'])
        })
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
      console.log(molde)
      if(molde){
        this.moldes = molde;
        if(this.moldes.length > 0){
          this.validadorMoldes = true;
          this.spinner = false;
        }else{
          this.validadorMoldes = false;
          this.eliminarDiseno()
        }
        
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
