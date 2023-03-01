import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-mat-dialog-new-item',
  templateUrl: './mat-dialog-new-item.component.html',
  styleUrls: ['./mat-dialog-new-item.component.css']
})
export class MatDialogNewItemComponent implements OnInit {

  formCampos:FormGroup = new FormGroup({});

  constructor(private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.datosFormularioCampos();
  }

  datosFormularioCampos(){
    this.formCampos = this.formBuilder.group({
      nombre:[''],
      valor:['']
    })
  }
}
