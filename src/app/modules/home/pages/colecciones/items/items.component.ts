import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicesService } from '../../services.service';

export interface Products {
  idItem:             number;
  tipoItem:           string;
  idTrazabilidad:     string;
  precioUnidad:       number;
  cantidadMinima:     number;
  nombre:             null;
  imagen:             null;
  origen:             null;
  fabricante:         null;
  referencia:         null;
  uso:                null;
  segmento_categoria: null;
  base:               null;
  ligamento:          null;
  codigo_acabado:     null;
  anchoTotal:         null;
  pesoGramaje:        null;
  peso:               null;
  color:              null;
  composicion:        null;
  tipoTejido:         null;
  diseno:             null;
  ubicacion:          null;
  tamano:             null;
  tipoMaterial:       null;
  tipoPrenda:         null;
  maquinasEspeciales: null;
  cantidadPrenda:     null;
  objetivo:           null;
  usoSugerido:        null;
  tipoTintura:        null;
  ecologico:          null;
  impactoSocial:      null;
  normaCertificacion: null;
  anchoUtil:          null;
  longitud:           null;
  calibreGrosor:      null;
  aseguramiento:      null;
  forma:              null;
  numeroLigas:        null;
  textura:            null;
  encogimiento:       null;
  unidad:             null;
  idUsuario:          null;
  activo:             boolean;
  cantidad:           number;
}
interface Food {
  value: string;
  viewValue: string;
}

interface Car {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {

  formItems:FormGroup = new FormGroup({})
  selectProducts:Products[] = [];
  idMoldeVinc!:number;


  selectedValue!: string;
  selectedCar!: string;

  siMolde:boolean =false;

  seleccion1:string = "Añadir Item";

  foods: Food[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'},
  ];

  itemsMol:any;
  itemSeleccionado!:number;

  contador:number = 1;
  items:any;

  productos:any[] = [];
  productosSelect:any[] = [];

  seleccion:string = "Añadir al carrito"
  arrayNew: any = [];

  constructor(private router:Router,
    private location:Location,
    private formBuilder:FormBuilder,
    private route: ActivatedRoute,
    private service:ServicesService) { }

  ngOnInit(): void {
    this.datosFormuarioItems();
    if(localStorage.getItem('idMolde')){
      this.siMolde = false
      this.consultarTipoItem();
      this.consultarParams();
    }else{
      this.siMolde = true
      this.consultarItems();
      
    }
    localStorage.getItem('idMolde') ? this.siMolde = false : (this.siMolde = true) ;
    
  }

  
  datosFormuarioItems(){
    this.formItems = this.formBuilder.group({
      item:['']
    })
  }
  consultarParams(){
    this.route.queryParams.subscribe(res => {
      this.idMoldeVinc = parseInt(res["idMolde1"]);
      localStorage.setItem('idNewMolde',this.idMoldeVinc.toString());
      console.log(res);
    })
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

  seleccionarItem(item:any){
    
    let index = this.selectProducts.findIndex(p => p.idItem === item.idItem);

    if(index === -1){
      item.selected = true;
      this.selectProducts.push(item)
      console.log(this.selectProducts)
    }else{
      item.selected = false;
      this.selectProducts.splice(index,1);
      console.log(this.selectProducts)
    }
  }

  /* agregarItem(item?:any, itemSeleccionado?:any,cantidad?:any){
    console.log(this.items[itemSeleccionado])
    this.productosSelect.push(this.items[itemSeleccionado])
    console.log(this.productosSelect);
    let body;
    this.productosSelect.forEach(res => {
      console.log(res)
      let body = {
            idMolde:localStorage.getItem('idMolde'),
            cantidad:this.productos.length,
            idItem:res.idItem
        }
      
      this.arrayNew.push(body);
      console.log(body)
    })
    console.log(this.arrayNew)
  } */

  consultarItems(){
    let idMolde= localStorage.getItem('idMold') ? localStorage.getItem('idMold') : localStorage.getItem('idMolde');
    this.service.consultarItem(idMolde).subscribe(item => {
      if(localStorage.getItem('idMolde')){
        console.log(item)
      }
    })
  }

  consultarTipoItem(){
    this.service.consultarTipoItem().subscribe(res => {
      console.log(res)
      this.itemsMol = res;
    })
  }

  buscarItems(){
    this.service.consultarItemTipo(this.formItems.get('item')?.value).subscribe(res => {
      console.log(res);
      this.items = res;
    })
  }

  guardar(){
    let array:any = [];
    let datos;
    this.selectProducts.map(data => {
      datos = {
          idMolde:this.idMoldeVinc ? this.idMoldeVinc : localStorage.getItem('idMold'),
          cantidad:data.cantidad,
          idItem:data.idItem
        }
      
      array.push(datos)
      console.log(array);
    })
    this.service.agregarItem(array).subscribe(res =>{
      console.log(res)
      this.router.navigate(['home/misColecciones/calculadoraColeccion'])
    })
  }

  cancelar(){
    this.location.back()
  }

  continuar(){
    if(localStorage.getItem('idMolde')){
      this.guardar();
    }else{
      this.router.navigate(['home/misColecciones/calculadoraColeccion'])
    }
  }

}
