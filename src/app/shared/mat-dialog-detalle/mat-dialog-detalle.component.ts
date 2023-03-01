import { Component, OnInit,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogNewMoldeComponent } from '../mat-dialog-new-molde/mat-dialog-new-molde.component';
@Component({
  selector: 'app-mat-dialog-detalle',
  templateUrl: './mat-dialog-detalle.component.html',
  styleUrls: ['./mat-dialog-detalle.component.css']
})
export class MatDialogDetalleComponent implements OnInit {
  obj:any;
  constructor(
    public dialogRef: MatDialogRef<MatDialogNewMoldeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,) { }

  ngOnInit(): void {
    console.log(this.data)
    this.obj = this.data
  }

}
