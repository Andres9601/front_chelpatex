import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-mat-dialog-logout',
  templateUrl: './mat-dialog-logout.component.html',
  styleUrls: ['./mat-dialog-logout.component.css']
})
export class MatDialogLogoutComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<any>) { }

  ngOnInit(): void {
  }

  cerrar(): void {
    this.dialogRef.close('CLOSE');
  }

  aceptar(): void {
    this.dialogRef.close(1);
  }

}
