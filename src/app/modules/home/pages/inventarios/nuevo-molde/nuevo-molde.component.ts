import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatDialogInfoMoldeComponent } from 'src/app/shared/mat-dialog-info-molde/mat-dialog-info-molde.component';
import { MatDialogNewMoldeComponent } from 'src/app/shared/mat-dialog-new-molde/mat-dialog-new-molde.component';
import { ServicesService } from '../../services.service';
interface Food {
  value: string;
  viewValue: string;
}


@Component({
  selector: 'app-nuevo-molde',
  templateUrl: './nuevo-molde.component.html',
  styleUrls: ['./nuevo-molde.component.css']
})
export class NuevoMoldeComponent implements OnInit {
  items = Array.from({length: 10}).map((_, i) => `Item #${i}`);
  value = 'Clear me';

  prendas:any;
  modas:any;
  objetivos:any;
  acabados:any;

  moldeForm:FormGroup = new FormGroup({})

  selectedValue!: string;
  selectedCar!: string;

  foods: Food[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'},
  ];

  constructor(private router:Router,
    private dialog:MatDialog,
    private servicesMolde:ServicesService,
    private formBuilder:FormBuilder,
    private toastr:MatSnackBar) { }

  ngOnInit(): void {
    this.datosItems();
    this.consultarTipos();
  }

  datosItems(){ 
    this.moldeForm = this.formBuilder.group({
      nombre:['',Validators.required],
      imageMolde:[''],
      precio:['',Validators.required],
      caracteristicas:[''],
      prenda:['',Validators.required],
      moda:['',Validators.required],
      publico:['',Validators.required],
      acabado:['',Validators.required],
      tela:[''],
      consumo:[''],
      produccion:[''],
      cascada:['']
    })
  }

  crearMolde(){
    let formulario =this.moldeForm
    let bodyMolde={
      idUsuario:localStorage.getItem('idUser'),
      nombre:formulario.get('nombre')?.value,
      precio:formulario.get('precio')?.value,
      tipoMolde:'VENTA',
      tipoPrenda:formulario.get('prenda')?.value,
      tipoModa:formulario.get('moda')?.value,
      objetivo:formulario.get('publico')?.value,
      tipoAcabado:formulario.get('acabado')?.value,
      anchoTela:formulario.get('tela')?.value,
      consumoTotal:formulario.get('consumo')?.value,
      tipoProduccion:formulario.get('produccion')?.value,
      tipoCascada:formulario.get('cascada')?.value,
      caracteristicas:formulario.get('caracteristicas')?.value,
      rutaArchivo:"www.google.com"
    }
    const modalReference = this.dialog.open(MatDialogInfoMoldeComponent,{
      disableClose:true
    })
    modalReference.afterClosed().subscribe(res => {
      console.log(res)
      if(res){
        this.servicesMolde.controladorMoldeCrear(bodyMolde).subscribe({
          next:(molde) => {
            if(molde){
              this.toastr.open('Usuario creado con exito','',{
                duration: 3 * 1000,
                panelClass:['sucess-snackbar']
              })
              this.router.navigate(['/home/inventarios/inventarioProvee']);
              const modalReferenceA = this.dialog.open(MatDialogNewMoldeComponent,{
                disableClose:true,
                data:molde
              })
              modalReferenceA.afterClosed().subscribe(res =>{
                console.log(res)
              })
            }
          },
          error:(error:any) =>{
            console.log(error)
            this.toastr.open('Error al crear el molde','',{
              duration: 3 * 1000,
              panelClass:['error-snackbar']
            })
          }
        })
      }
    })
  }

  seguirMoldeItem(){
    this.crearMolde();
    console.log(this.moldeForm.value)
  }

  consultarTipos(){
    this.servicesMolde.tipoAcabado().subscribe(res => {
      console.log(res)
      this.acabados = res;
    })
    this.servicesMolde.tipoPrenda().subscribe(res => {
      console.log(res)
      this.prendas = res;
    })
    this.servicesMolde.tipoObjetivo().subscribe(res => {
      console.log(res)
      this.objetivos = res;
    })
    this.servicesMolde.tipoModa().subscribe(res => {
      console.log(res)
      this.modas = res;
    })
  }

  toBack(){
    this.router.navigate(['home/inventarios/inventarioProvee']);
  }

}
