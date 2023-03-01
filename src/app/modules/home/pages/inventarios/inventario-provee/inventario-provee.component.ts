import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatDialogDetalleComponent } from 'src/app/shared/mat-dialog-detalle/mat-dialog-detalle.component';
import { ServicesService } from '../../services.service';


@Component({
  selector: 'app-inventario-provee',
  templateUrl: './inventario-provee.component.html',
  styleUrls: ['./inventario-provee.component.css']
})
export class InventarioProveeComponent implements OnInit {

  displayedColumns: string[] = ['nombre', 'precio', 'tipoPrenda', 'tipoModa','objetivo','tipoAcabado','rutaArchivo'];
  displayedColumnsItem: string[] = ['nombre', 'idTrazabilidad', 'precioUnidad', 'cantidadMin','referencia','categoria'];
  dataSourceMolde!: MatTableDataSource<any>;
  dataSourceItem!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  inveItem:FormGroup = new FormGroup({})
  selectFormControl = new FormControl('', Validators.required);
  tipo:number = 1;
  tipoMoldeItem=[
    {id:1, name:"Molde"},
    {id:2, name:"Item"}
  ]

  items: any[] = [];


  constructor(
    private router:Router,
    private servicesInv:ServicesService,
    private formBuilder:FormBuilder,
    private dialog:MatDialog,
    private toastr:MatSnackBar
    ) {
   }

  ngOnInit(): void {
    this.datosFormulario();
  }

  ngAfterViewInit() {
    this.dataSourceMolde.paginator = this.paginator;
    this.dataSourceMolde.sort = this.sort;
    this.dataSourceItem.paginator = this.paginator;
    this.dataSourceItem.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceMolde.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceMolde.paginator) {
      this.dataSourceMolde.paginator.firstPage();
    }
  }

  applyFilterItem(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceItem.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceItem.paginator) {
      this.dataSourceItem.paginator.firstPage();
    }
  }

  datosFormulario(){
    this.inveItem = this.formBuilder.group({
      ItemMolde:[''],
      ItemsTipo:['']
    })
  }

  selecTipo(event:any){
    this.tipo = event.value.id;
    if(this.tipo === 2){
      this.consultarTiposItem();
    }
    console.log(this.tipo)
  }


  consultarTiposItem(){
    this.servicesInv.consultarTipoItem().subscribe(res => {
      this.items = res;
      console.log(this.items)
    })
  }

  buscarItemList(){
    this.servicesInv.consultarItemsUsuarioProvee(this.inveItem.get('ItemsTipo')?.value,localStorage.getItem('idUser')).subscribe(list => {
      console.log(list)
      this.dataSourceItem = new MatTableDataSource(list);
    })
  }

  buscarMoldeList(){
    this.servicesInv.consultarMoldesUsuarioProvee(localStorage.getItem('idUser')).subscribe(res => {
      console.log(res)
      this.dataSourceMolde = new MatTableDataSource(res);
    })
  }

  BuscarItemOMolde(){
    if(this.tipo === 2){
      this.buscarItemList();
    }else{
      this.buscarMoldeList();
    }
  }

detallesMolde(rowMolde:any){
  this.servicesInv.consultarDetalleMolde(rowMolde.idMolde).subscribe({
    next:(detalles) =>{
      let datos={
        tipoDato:'Molde',
        datos:detalles
      }
      this.dialog.open(MatDialogDetalleComponent,{
        height: '80vh',
        width: '70vh',
        data:datos,
      })
    },error:(err)=>{
      console.log(err)
      this.toastr.open('Error al consultar los detalles','',{
        duration:3*1000,
        panelClass:['error-snackbar']
      })
    }
  })
  console.log(rowMolde)
}

detallesItem(rowItem:any){
  this.servicesInv.consultarDetalleItem(rowItem.idItem).subscribe({
    next:(detalles) =>{
      let datos={
        tipoDato:'Item',
        datos:detalles
      }
      this.dialog.open(MatDialogDetalleComponent,{
        height: '80vh',
        width: '70vh',
        data:datos
      })
    },error:(err)=>{
      console.log(err)
      this.toastr.open('Error al consultar los detalles','',{
        duration:3*1000,
        panelClass:['error-snackbar']
      })
    }
  })
  console.log(rowItem)
}

anadirMolde(){
  this.router.navigate(['home/inventarios/nuevoMolde']);
}
anadirItem(){
  this.router.navigate(['home/inventarios/nuevoItem']);
}

}
