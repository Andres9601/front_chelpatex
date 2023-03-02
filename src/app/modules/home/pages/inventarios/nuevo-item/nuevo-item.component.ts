import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatDialogNewItemComponent } from 'src/app/shared/mat-dialog-new-item/mat-dialog-new-item.component';
import { ServicesService } from '../../services.service';

export interface CampoItems {
  idDominio:   number;
  tipoDominio: TipoDominio;
  nombre:      string;
  activo:      boolean;
  nombreVisual:string;
}

export enum TipoDominio {
  DOMCampoTela = "DOM_CAMPO_TELA",
}

@Component({
  selector: 'app-nuevo-item',
  templateUrl: './nuevo-item.component.html',
  styleUrls: ['./nuevo-item.component.css']
})
export class NuevoItemComponent implements OnInit {
  items:any;
  value = 'Clear me';
  itemsList: any = [];
  myForm!: FormGroup;
  camposAdicionales:any[] = [];

  itemsForm: FormGroup =new FormGroup({})
  itemsName:CampoItems[] = [];
  itemsNameVisual:CampoItems[] = [];

  constructor(
    private router:Router,
    private dialog:MatDialog,
    private formBuilder:FormBuilder,
    private serviceItem:ServicesService,
    private toastr:MatSnackBar) { }

  ngOnInit(): void {
    this.datosFormulario();
    this.consultarTipoItem();
  }

  

  datosFormulario(){
    this.itemsForm = this.formBuilder.group({
      nameItem:[''],
      tipoItem:[''],
      camposItem:this.formBuilder.array([]),
      imagenItem:['https://www.google.com/']
    })
  }

  get favoritosArr() {
    return this.itemsForm.get('fincasLotes') as FormArray;
  }

  consultarTipoItem(){
    this.serviceItem.consultarTipoItem().subscribe({
      next:(tipos) => {
        this.items = tipos;
        console.log(tipos);
      },error:(err) => {
        console.log(err)
      }
    })
  }

  listadoItems(event:any){
    console.log(event.value.nombre)
    this.serviceItem.consultarCamposTipoItem(event.value.nombre).subscribe({
      next:(lista) =>{
        this.itemsList = lista;
        this.itemsList.map((res:any) => {
          let nuevoCampo = res.nombre.replace(/([a-z])([A-Z])/g, '$1 $2');
          nuevoCampo = nuevoCampo.charAt(0).toUpperCase() + nuevoCampo.slice(1);
          this.itemsName.push(nuevoCampo)
        })
        this.itemsNameVisual = [...this.itemsName];
        console.log(this.itemsNameVisual)
        const formControls:any ={};
        this.itemsList.forEach((obj:any, index:number) => {
          console.log(obj)
          let value;
          if(obj.tipoDato === 'text'){
            value = '';
          }else if(obj.tipoDato ==='number'){
            value = 0;
          }
          obj.nombreVisual = this.itemsName[index]
          formControls[obj.nombre] = new FormControl(value);
          console.log(formControls)
        });
        console.log(this.itemsList)
      this.myForm = this.formBuilder.group(formControls);
      console.log(this.myForm.value)
      },error:(err) => {
        console.log(err)
      }
    })
  }

  crearItem(){
    const modalReference = this.dialog.open(MatDialogNewItemComponent,{
      width: '497px',
      height: '650px',
      disableClose:true
    })

    modalReference.afterClosed().subscribe(res =>{
      console.log(res)
      this.camposAdicionales.push(res)
      console.log(this.camposAdicionales)
    })
  }

  borrarCampo(index:any){
    this.camposAdicionales.splice(index,1)
  }

  guardarItem(){
    let formData = this.myForm.value
    let dataToSend:any = {};
    Object.keys(formData).forEach(key => {
      if (typeof formData[key] === 'string' && !isNaN(parseFloat(formData[key]))) {
        dataToSend[key] = parseFloat(formData[key]);
      } else {
        dataToSend[key] = formData[key];
      }
    });

    let parametrosFijos = {
      tipoItem:this.itemsForm.get('tipoItem')?.value.nombre,
      idUsuario:localStorage.getItem('idUser')
    }

    Object.assign(dataToSend,parametrosFijos)
    console.log(dataToSend)

    let valorVacio = {
      nombre:'',
      valor:''
    }

    let body = {
      item:dataToSend,
      camposAdicionales:this.camposAdicionales ? this.camposAdicionales : valorVacio
    }
    console.log(body)
    this.serviceItem.crearItemConCampos(body).subscribe({
      next:(guardeItem) =>{
        console.log(guardeItem)
        this.router.navigate(['/home/inventarios/inventarioProvee'])
        this.toastr.open('Item Creado Exitosamente','',{
          duration:3*1000,
          panelClass:['sucess-snackbar']
        })
      },error:(err)=>{
        console.log(err)
        this.toastr.open('Error al crear el item','',{
          duration:3*1000,
          panelClass:['error-snackbar']
        })
      }
    })
  }

  toBack(){
    this.router.navigate(['home/inventarios/inventarioProvee']);
  }

}
