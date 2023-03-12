import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatDialogBorrarComponent } from 'src/app/shared/mat-dialog-borrar/mat-dialog-borrar.component';
import { MatDialogMoldeDiseComponent } from 'src/app/shared/mat-dialog-molde-dise/mat-dialog-molde-dise.component';
import {MatSort} from '@angular/material/sort';
import { ServicesService } from '../../services.service';

export interface UserData {
  id: string;
  name: string;
  progress: string;
  fruit: string;
}

/** Constants used to fill up our data base. */
const FRUITS: string[] = [
  'blueberry',
  'lychee',
  'kiwi',
  'mango',
  'peach',
  'lime',
  'pomegranate',
  'pineapple',
];
const NAMES: string[] = [
  'Maia',
  'Asher',
  'Olivia',
  'Atticus',
  'Amelia',
  'Jack',
  'Charlotte',
  'Theodore',
  'Isla',
  'Oliver',
  'Isabella',
  'Jasper',
  'Cora',
  'Levi',
  'Violet',
  'Arthur',
  'Mia',
  'Thomas',
  'Elizabeth',
];

@Component({
  selector: 'app-tabla-colecciones',
  templateUrl: './tabla-colecciones.component.html',
  styleUrls: ['./tabla-colecciones.component.css']
})
export class TablaColeccionesComponent implements OnInit, AfterViewInit  {
  nombreColeccion:string | null = 'nombre Coleccion'
  resultsLength = 0;
  data:any;
  nombreButton:string='Producir nuevo diseño'
  valorColeccion:number = 0;
  displayedColumns: string[] = ['name', 'molde', 'costTol', 'units','delete'];
  dataSource = new MatTableDataSource<any>([]);
  spinner:boolean =false;

  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  @ViewChild(MatSort) sort: MatSort | any;

  constructor(
    private services:ServicesService,
    private router:Router,
    private dialog:MatDialog,
    private toastr:MatSnackBar) { }


  

  ngOnInit(): void {
    this.recibirData();
    if(localStorage.getItem('idCole')){
      this.spinner = true;
      this.consultarDisenos(localStorage.getItem('idCole'))
    }
    
  }
  
  ngAfterViewInit() {
   
    
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    
  }

 

  /* applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  } */

  getData(){
    this.nombreColeccion = localStorage.getItem('nombre');
  }

  consultarDisenos(idColeccion?:any){
    
    let body ={
      idColeccion:idColeccion,
      idUsuario:localStorage.getItem('idUser')
    }
    this.services.consultarDiseno(body).subscribe(listaDiseno => {
      console.log(listaDiseno);
      this.valorColeccion = (listaDiseno.costoColeccion ? listaDiseno.costoColeccion : 0);
      this.dataSource.data = listaDiseno.disenos;
      this.resultsLength = listaDiseno.disenos.length;
      this.spinner = false;
    },(e) =>{
      this.toastr.open('El token se a vencido por favor vuelve a ingresar','',{
        duration: 5 * 1000,
        panelClass:['error-snackbar']
      });
    })
  }

  recibirData(){
    this.services.datosRecibe.subscribe(res => {
      this.data = res;
      console.log(res)
      console.log(res.idColeccion)
      if(localStorage.getItem('idCole')){
        this.nombreColeccion = res.nombre;
        console.log(this.nombreColeccion);
        console.log('idCole',localStorage.getItem('idCole'))
        this.getData();
      }
    })
  }


  crearMolde(){
    const modalReference = this.dialog.open(MatDialogMoldeDiseComponent,{
      width: '497px',
      height: '169px',
      disableClose:true
    })

    modalReference.afterClosed().subscribe((res) => {
      let respuesta = res;
      console.log(res)
      if(res === true){
        this.router.navigate(['home/misColecciones/nuevaColeccion'],{queryParams:{respuesta}})
      }else if(res === false){
        this.router.navigate(['home/misColecciones/nuevaColeccion'],{queryParams:{respuesta}});
      }else{
        return;
      }
      
    })
  }

  eliminarDiseno(element:any){
    const modalReference = this.dialog.open(MatDialogBorrarComponent,{
      width: '450px',
      height: '200px',
      data:'diseño',
      disableClose:true
    })
    modalReference.afterClosed().subscribe((result) => {
      this.spinner =true;
      console.log(element.idDiseno);
      if(result){
        this.services.eliminarDiseno(element.idDiseno).subscribe(res =>{
    
        },(error) => {
          console.log(error)
          if(localStorage.getItem('idCole')){
            this.toastr.open('Diseño eliminado con exito','',{
              duration: 3 * 1000,
              panelClass:['sucess-snackbar']
            });
            this.consultarDisenos(localStorage.getItem('idCole'))
          }
        })
      }else{
        this.spinner = false;
      }
    })
    
  }

  toBack(){
    this.router.navigate(['home/misColecciones/misColecciones']);
  }

}
