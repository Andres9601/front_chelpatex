import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-mat-dialog-costo',
  templateUrl: './mat-dialog-costo.component.html',
  styleUrls: ['./mat-dialog-costo.component.css']
})
export class MatDialogCostoComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

}
