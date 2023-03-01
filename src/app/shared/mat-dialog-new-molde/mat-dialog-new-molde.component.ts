import { NestedTreeControl } from '@angular/cdk/tree';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { ServicesService } from 'src/app/modules/home/pages/services.service';





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






@Component({
  selector: 'app-mat-dialog-new-molde',
  templateUrl: './mat-dialog-new-molde.component.html',
  styleUrls: ['./mat-dialog-new-molde.component.css']
})
export class MatDialogNewMoldeComponent implements OnInit {


  moldeForm:FormGroup = new FormGroup({})

  selectedValue!: string;
  selectedCar!: string;
  panelOpenState = false;

  seleccion:string = "Añadir Item";
  items:Products[] = [];
  selectProducts:Products[] = [];
  selectedStates: boolean[] = []
  contador:number = 1;

  itemsType: any;

  

  constructor(
    private formBuilder:FormBuilder,
    private serviceModal:ServicesService,
    public dialogRef: MatDialogRef<MatDialogNewMoldeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toastr:MatSnackBar
) {
    
  }

  ngOnInit(): void {
    console.log(this.data)
    this.datosFormularioMolde();
    this.listItem();
  }

  datosFormularioMolde(){
    this.moldeForm = this.formBuilder.group({
      items:['',Validators.required]
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


  listItem(){
    this.serviceModal.consultarTipoItem().subscribe(res => {
      console.log(res);
      this.itemsType = res;
    })
  }

  buscarItems(){
    this.serviceModal.consultarItemTipo(this.moldeForm.get('items')?.value).subscribe(res => {
      console.log(res);
      this.items= res;
    })
  }

  guardar(){
    let array:any = [];
    let datos;
    this.selectProducts.map(data => {
      datos = {
          idMolde:this.data.idMolde,
          cantidad:data.cantidad,
          idItem:data.idItem
        }
      
      array.push(datos)
      console.log(array);
    })
    if(array.length > 0){
      this.serviceModal.agregarItem(array).subscribe({
        next:(items) => {
          this.toastr.open('Se ha añadido los items exitosamente','',{
            duration: 3 * 1000,
            panelClass:['sucess-snackbar']
          })
        },error:(err) =>{
          console.log(err)
          this.toastr.open('Error al añadir los items al molde','',{
            duration:3*1000,
            panelClass:['error-snackbar']
          })
        }
      })
    }
  }

}
