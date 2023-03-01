import { Component, OnInit,Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-mat-dialog-cost-empleado',
  templateUrl: './mat-dialog-cost-empleado.component.html',
  styleUrls: ['./mat-dialog-cost-empleado.component.css']
})
export class MatDialogCostEmpleadoComponent implements OnInit {

  cantEmple = this._formBuilder.group({
    nombre: ['',Validators.required],
    tipoDoc:[''],
    numeroIdentificacion: ['',[Validators.required,Validators.pattern('[0-9]*')]],
    salario: ['',[Validators.required,Validators.pattern('[0-9]*')]],
    tarea: ['',[Validators.required]],
    cargo: ['',Validators.required],
    productividad: ['',[Validators.required,Validators.pattern('[0-9]*')]]
  });
  valor='';

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  private _formBuilder:FormBuilder) { }

  ngOnInit(): void {
    console.log(this.data)
    if(this.data){
      this.cantEmple.get('nombre')?.setValue(this.data.nombre)
      this.cantEmple.get('tipoDoc')?.setValue(this.data.tipoDoc)
      this.cantEmple.get('numeroIdentificacion')?.setValue(this.data.numeroIdentificacion)
      this.cantEmple.get('salario')?.setValue(this.data.salario)
      this.cantEmple.get('tarea')?.setValue(this.data.tarea)
      this.cantEmple.get('cargo')?.setValue(this.data.cargo)
      this.cantEmple.get('productividad')?.setValue(this.data.productividad)
    }
  }

  restriccionNumber(evento:any,tipo:any){
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
        let comienzaPorCero = 
        this.cantEmple.get(tipo)?.value === 0 &&
        teclaPresionada == 0;
        console.log(comienzaPorCero)
        if (sePresionoUnaTeclaNoAdmitida || comienzaPorCero) {
          evento.preventDefault(); 
        } else if (teclaPresionadaEsUnNumero) {
          this.valor += String(teclaPresionada);
        }

  }

}
