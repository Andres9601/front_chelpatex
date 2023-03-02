import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatDialogCostEmpleadoComponent } from 'src/app/shared/mat-dialog-cost-empleado/mat-dialog-cost-empleado.component';
import { MatDialogCostIndirectoComponent } from 'src/app/shared/mat-dialog-cost-indirecto/mat-dialog-cost-indirecto.component';
import { MatDialogCostoComponent } from 'src/app/shared/mat-dialog-costo/mat-dialog-costo.component';
import { MatDialogTareaComponent } from 'src/app/shared/mat-dialog-tarea/mat-dialog-tarea.component';
import { ServicesService } from '../../services.service';

@Component({
  selector: 'app-calculadora',
  templateUrl: './calculadora.component.html',
  styleUrls: ['./calculadora.component.css']
})
export class CalculadoraComponent implements OnInit {

  /* tareas = Array.from({length: 20}).map((_, i) => `Item #${i}`); */
  tareas:any=[];
  totalMesTarea:number = 0;
  idsMaquila:any = [];
  empleados:any=[];
  totalEmpleado:number = 0;
  cifs:any = [];
  totalCifs:number = 0;
  totales:any;
  margenes:number[] = [10,20,30,40,50,60,70,80,90,100];
  spinner:boolean = false;
  
  cantProd = this._formBuilder.group({
    unidades: [1, Validators.required],
  });
  costoMano = this._formBuilder.group({
    listTarea: this._formBuilder.array([]),
    listEmpleado: ['', Validators.required],
  });

  
  costoCIF = this._formBuilder.group({
    fourCtrl: ['', Validators.required],
  });
  estimacionTotal = this._formBuilder.group({
    margen: [1,[Validators.required,Validators.pattern('[0-9]*')]],
  });
  valorConMargen:any;
  valor = '';
  numero!:number;

  get listaTare(){
    return this.costoMano.get('listTarea') as FormArray;
  }
  
  constructor(
    private router:Router,
    private location:Location,
    private _formBuilder: FormBuilder,
    private dialog:MatDialog,
    private service:ServicesService,
    private toastr:MatSnackBar) { }

  ngOnInit(): void {
  }

  unidades(){
    console.log(this.cantProd.value)
  }
  restriccionNumber(evento:any){
    console.log(evento)
    let teclaPresionada = evento.key;
    let teclaPresionadaEsUnNumero = Number.isInteger(parseInt(teclaPresionada));
    console.log(teclaPresionadaEsUnNumero)

    let sePresionoUnaTeclaNoAdmitida = 
        teclaPresionada != 'ArrowDown' &&
        teclaPresionada != 'ArrowUp' &&
        teclaPresionada != 'ArrowLeft' &&
        teclaPresionada != 'ArrowRight' &&
        teclaPresionada != 'Backspace' &&
        teclaPresionada != 'Delete' &&
        teclaPresionada != 'Enter' &&
        !teclaPresionadaEsUnNumero;
        console.log(sePresionoUnaTeclaNoAdmitida)
        let comienzaPorCero = 0;
        this.cantProd.get('unidades')?.value === 0 &&
        teclaPresionada == 0;
        console.log(comienzaPorCero)
        if (sePresionoUnaTeclaNoAdmitida || comienzaPorCero) {
          evento.preventDefault(); 
        } else if (teclaPresionadaEsUnNumero) {
          this.valor += String(teclaPresionada);
        }

  }

  agregarTarea(tarea?:any,index?:any){
    if(tarea){
      console.log(tarea)
      const modalReference = this.dialog.open(MatDialogTareaComponent,{
        width: '350px',
        height: '350px',
        data:tarea,
        disableClose:true
      })
      modalReference.afterClosed().subscribe((res) => {
        console.log(res)
        if(res.costoTarea != tarea.costoTarea && res != false){
          this.tareas.splice(index,1,res);
          this.idsMaquila.splice(index,1,res.nombreTarea.idMaquila)
          this.totalMesTarea -= tarea.costoTarea;
          this.totalMesTarea += res.costoTarea;
        }
        console.log(this.idsMaquila);
      })
    }else{
      const modalReference = this.dialog.open(MatDialogTareaComponent,{
        width: '350px',
        height: '350px',
        disableClose:true
      })
  
      modalReference.afterClosed().subscribe((res) => {
        console.log(res)
        if(res){
          this.tareas.push(res);
          this.idsMaquila.push(res.nombreTarea.idMaquila);
          this.totalMesTarea += res.costoTarea;
          console.log(this.totalMesTarea);
        }
        console.log(this.idsMaquila);
      })
    }
  }


  borrarTarea(tarea:any,i:any){
    this.tareas.splice(i,1)
    this.idsMaquila.splice(i,1);
    this.totalMesTarea -= tarea.costoTarea;
    console.log(this.idsMaquila);
  }

  

  
  agregarEmpleado(empleado?:any,index?:any){
    console.log(empleado)
    if(empleado){
      const modalReference = this.dialog.open(MatDialogCostEmpleadoComponent,{
        width: '400px',
        height: '703px',
        data:empleado,
        disableClose:true
      })
  
      modalReference.afterClosed().subscribe((res) => {
        console.log(res)
        if(res != empleado && res != false){
          console.log('entro')
          this.empleados.splice(index,1,res)
          this.totalEmpleado -= (empleado.salario/empleado.productividad)*this.cantProd.get('unidades')?.value;
          this.totalEmpleado += (res.salario/res.productividad)*this.cantProd.get('unidades')?.value;
        }
      })
    }else{
      const modalReference = this.dialog.open(MatDialogCostEmpleadoComponent,{
        width: '400px',
        height: '703px',
        disableClose:true
      })
  
      modalReference.afterClosed().subscribe((res) => {
        console.log(res)
        if(res){
          this.empleados.push(res)
          this.totalEmpleado += (res.salario/res.productividad)*this.cantProd.get('unidades')?.value;
          console.log(this.totalEmpleado)
        }
      })
    }
    console.log(this.empleados)
  }

  borrarEmpleado(empleado?:any,i?:any){
    console.log(empleado)
    this.empleados.splice(i,1)
    this.totalEmpleado -= (empleado.salario/empleado.productividad)*this.cantProd.get('unidades')?.value
    console.log(this.totalEmpleado)
  }




  agregarCostoIndire(cif?:any,i?:any){
    if(cif){
      const modalReference = this.dialog.open(MatDialogCostIndirectoComponent,{
        width: '400px',
        height: '550px',
        data:cif,
        disableClose:true
      })
  
      modalReference.afterClosed().subscribe((res) => {
        console.log(res)
        if(res != cif && res != false){
          this.cifs.splice(i,1,res);
          this.totalCifs -= (cif.valor/cif.productividadPeriodo)*this.cantProd.get('unidades')?.value
          this.totalCifs += (res.valor/res.productividadPeriodo)*this.cantProd.get('unidades')?.value
        }
      })
    }else{
      const modalReference = this.dialog.open(MatDialogCostIndirectoComponent,{
        width: '400px',
        height: '550px',
        disableClose:true
      })
  
      modalReference.afterClosed().subscribe((res) => {
        console.log(res)
        if(res){
          this.cifs.push(res);
          this.totalCifs += (res.valor/res.productividadPeriodo)*this.cantProd.get('unidades')?.value
        }
      })

    }
    console.log(this.cifs)
  }

  borrarCif(cif?:any,i?:any){
    this.cifs.splice(i,1);
    this.totalCifs -= (cif.valor/cif.productividadPeriodo)*this.cantProd.get('unidades')?.value;
  }


  actualizarDiseno(){
    console.log('entro')
    this.spinner = true;
    console.log(this.spinner)
    let body = {
      idDiseno:localStorage.getItem('idDise'),	
      idUsuario:localStorage.getItem('idUser'),
      nombre:localStorage.getItem('nombreDiseno'),
      idMolde:localStorage.getItem('idMold') ? localStorage.getItem('idMold') : localStorage.getItem('idNewMolde'),
      unidades:this.cantProd.get('unidades')?.value,
      empleados:this.empleados,
      idsMaquilas:this.idsMaquila,
      cifs:this.cifs,
      activo:1
    }
    console.log(body)
    this.service.actualizarDiseno(body).subscribe(res => {
      console.log(res);
      this.totales = res;
      console.log(this.totales)
      this.spinner = false;
    })
  }

  cambioMargen(evento:any){
    console.log(evento);
    console.log(this.estimacionTotal.value);
    this.valorConMargen = (this.totales.totalEstimado/this.totales.unidades)/(1-(this.estimacionTotal.get('margen')?.value/100))
    console.log(this.valorConMargen)
  }

  finalizar(){
    let body = {
      idDiseno:localStorage.getItem('idDise'),
      margenGanancia:this.estimacionTotal.get('margen')?.value
    }
    console.log(body.idDiseno)
    console.log(body)
    this.service.finalizar(body).subscribe(res => {
      if(res){
        this.toastr.open('Diseño creado con exito','',{
          duration: 3 * 1000,
          panelClass:['sucess-snackbar']
        });
        this.router.navigate(['/home']);
        this.limpiarStorage();
      }
    },(e) => {
      this.toastr.open('Error al crear el diseño','',{
        duration: 3 * 1000,
        panelClass:['error-snackbar']
      });
    })
  }

  toBack(){
    this.location.back();
  }

  limpiarStorage(){
    localStorage.removeItem('idMolde');
    localStorage.removeItem('idMold');
    localStorage.removeItem('idNewMolde');

  }
}
