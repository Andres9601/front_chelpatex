import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-mat-dialog-borrar',
  templateUrl: './mat-dialog-borrar.component.html',
  styleUrls: ['./mat-dialog-borrar.component.css']
})
export class MatDialogBorrarComponent implements OnInit {

  dato!:string;

  constructor(public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.dato = this.data;
  }

  cerrar(): void {
    this.dialogRef.close('CLOSE');
  }

  aceptar(): void {
    this.dialogRef.close(1);
  }

}
