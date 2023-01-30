import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ServicesService } from 'src/app/modules/home/pages/services.service';

@Component({
  selector: 'app-mat-dialog-tarea',
  templateUrl: './mat-dialog-tarea.component.html',
  styleUrls: ['./mat-dialog-tarea.component.css']
})
export class MatDialogTareaComponent implements OnInit {

  tareas:any;
  spinner:boolean=false;

  cantProd = this._formBuilder.group({
    nombreTarea: ['', Validators.required],
    costoTarea: [0, Validators.required],
  });

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  private _formBuilder: FormBuilder,
  private service:ServicesService,
  private toastr:MatSnackBar) { }

  ngOnInit(): void {
    this.consultarTareas();
    
  }

  consultarTareas(){
    this.spinner = true;
    this.service.consultarTareas().subscribe(tareas => {
      this.tareas = tareas;
      console.log(this.tareas);
      if(tareas){
        if(this.data){
          let buscar = this.tareas.find((res:any) => res.tipoMaquila === this.data.nombreTarea.tipoMaquila)
          console.log(buscar);
          this.cantProd.controls['nombreTarea'].setValue(buscar);
          this.cantProd.controls['costoTarea'].setValue(this.data.costoTarea);
          /* this.cantProd.get('costoTarea')?.setValue(this.data.costoTarea);
          this.cantProd.get('nombreTarea')?.setValue(this.data.nombreTarea); */
          console.log(this.cantProd.value)
        }
        this.spinner = false;
      }
      
    },(e) => { 
      console.log(e)
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

  cambio(evento:any){
    console.log(evento)
    /* this.cantProd.get('nombreTarea')?.setValue(evento.value.tipoMaquila); */
    this.cantProd.get('costoTarea')?.setValue(evento.value.precioUnidad);
    console.log(this.cantProd.value)
  }

  change(name:any){
    console.log(name)
  }
}
