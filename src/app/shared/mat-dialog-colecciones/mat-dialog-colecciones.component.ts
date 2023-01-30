import { Component, OnInit,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-mat-dialog-colecciones',
  templateUrl: './mat-dialog-colecciones.component.html',
  styleUrls: ['./mat-dialog-colecciones.component.css']
})
export class MatDialogColeccionesComponent implements OnInit {

  name: string='';
  constructor(public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,) { }

  ngOnInit(): void {
  }

  

}
