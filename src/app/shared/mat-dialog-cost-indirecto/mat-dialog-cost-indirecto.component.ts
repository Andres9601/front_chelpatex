import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-mat-dialog-cost-indirecto',
  templateUrl: './mat-dialog-cost-indirecto.component.html',
  styleUrls: ['./mat-dialog-cost-indirecto.component.css']
})
export class MatDialogCostIndirectoComponent implements OnInit {

  candCifs = this._formBuilder.group({
    tipoCif:[''],
    nombre:[''],
    porcentajeCif:[''],
    valor:[0],
    periodo:[0],
    productividadPeriodo:[1]
  })

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  private _formBuilder:FormBuilder) { }


  ngOnInit(): void {
    console.log(this.data);
    if(this.data){
      this.candCifs.get('tipoCif')?.setValue(this.data.tipoCif)
      this.candCifs.get('valor')?.setValue(this.data.valor)
      this.candCifs.get('periodo')?.setValue(this.data.periodo)
      this.candCifs.get('productividadPeriodo')?.setValue(this.data.productividadPeriodo)
    }
  }

}
