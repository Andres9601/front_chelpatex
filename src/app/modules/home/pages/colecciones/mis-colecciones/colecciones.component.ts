import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatDialogBorrarComponent } from 'src/app/shared/mat-dialog-borrar/mat-dialog-borrar.component';
import { MatDialogColeccionesComponent } from 'src/app/shared/mat-dialog-colecciones/mat-dialog-colecciones.component';
import { ServicesService } from '../../services.service';

@Component({
  selector: 'app-colecciones',
  templateUrl: './colecciones.component.html',
  styleUrls: ['./colecciones.component.css']
})
export class ColeccionesComponent implements OnInit {

  /*items = Array.from({length: 10}).map((_, i) => `Item #${i}`); */
  items:any;
  title:string = '';
  spinner:boolean = false;
  iniciales:string = '';

  constructor(private dialog:MatDialog,
    private services:ServicesService,
    private router:Router,
    private service:ServicesService,
    private toastr:MatSnackBar) { }

  ngOnInit(): void {
    this.consultarColecciones();
  }

  randomColor(): string {
    // Genera valores hexadecimales aleatorios para cada uno de los canales de color
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    // Devuelve el valor hexadecimal concatenando los canales de color
    return '#' + this.rgbToHex(r) + this.rgbToHex(g) + this.rgbToHex(b);
  }

  // Convierte un valor de canal de color RGB a su valor hexadecimal correspondiente
  rgbToHex(value: number): string {
    const hex = value.toString(16);
    console.log(hex)
    return hex.length === 1 ? '0' + hex : hex;
  }

  getInitials(frase: string) {
    let palabras = frase.split(' ');
    let iniciales = palabras.slice(0, 2).map(palabra => palabra.charAt(0).toUpperCase()).join('');
    this.iniciales = iniciales;
  }

  nuevaColeccion(){
    const modalReference = this.dialog.open(MatDialogColeccionesComponent,{
      width: '446px',
      height: '242px',
      panelClass:'modalStyle',
      disableClose:true
    })

    modalReference.afterClosed().subscribe((res) => {
      console.log(res)
      this.getInitials(res)
      if(res === false){
        this.consultarColecciones();
      }else if(res){
        this.services.enviarDatos(res);
        this.randomColor()
        console.log(this.randomColor())
        let body = {
          idUsuario:localStorage.getItem('idUser'),
          nombre:res,
          iniciales:this.iniciales,
          color:this.randomColor()
        }
        this.service.crearColeccion(body).subscribe(nuevaColeccion => {
          if(nuevaColeccion){
            this.toastr.open('Coleccion creado con exito','',{
              duration: 3 * 1000,
              panelClass:['sucess-snackbar']
            });
            this.consultarColecciones();
          }
        },(e) =>{ 
          if(e.status === 401){
            this.toastr.open('El token a caducado, volver a ingresar','',{
              duration: 3 * 1000,
              panelClass:['error-snackbar']
            });
          }else{
            this.toastr.open('Error al consultar las tareas','',{
              duration: 3 * 1000,
              panelClass:['error-snackbar']
            });
          }
        })
      }
    })

  }

  consultarColecciones(){
    this.spinner = true;
    this.services.consultarColecciones().subscribe(colecciones =>{
      if(colecciones){
        this.items = colecciones;
        this.spinner = false
      }
    },(e) =>{
      if(e.status === 401){
        this.toastr.open('El token a caducado, volver a ingresar','',{
          duration: 3 * 1000,
          panelClass:['error-snackbar']
        });
      }else{
        this.toastr.open('Error al consultar las tareas','',{
          duration: 3 * 1000,
          panelClass:['error-snackbar']
        });
      }
    });
  }

  crearColeccion(nombre:string){
    let body ={
      idUsuario:localStorage.getItem('idUser'),
      nombre:nombre
    }
    this.service.crearColeccion(body).subscribe(disenos => {
      console.log(disenos);
    })
  }

  seleccColeccion(item:any){
    console.log('entro',item)
    if(item.idColeccion){
      this.router.navigate(['home/misColecciones/tablaColecciones'])
      localStorage.setItem('idCole',item.idColeccion);
      localStorage.setItem('nombre',item.nombre);
      this.services.enviarDatos(item)
    }
  }

  eliminarColeccion(id:number){
    const modalReference = this.dialog.open(MatDialogBorrarComponent,{
      width: '450px',
      height: '200px',
      data:'coleccion',
      disableClose:true
    })
    modalReference.afterClosed().subscribe((result) => {
      console.log(result)
      if(result){
        this.service.eliminarColeccion(id).subscribe(res =>{
          
          console.log(res)
        },(error) => {
          console.log(error)
          this.toastr.open('Coleccion eliminada con exito','',{
            duration: 3 * 1000,
            panelClass:['sucess-snackbar']
          });
          this.consultarColecciones();
        })
      }
      })
    
  }

}
