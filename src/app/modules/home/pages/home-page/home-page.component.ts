import { AfterViewInit, Component, OnInit,ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { AuthServicesService } from 'src/app/modules/auth/services/auth-services.service';
import { MatDialogLogoutComponent } from 'src/app/shared/mat-dialog-logout/mat-dialog-logout.component';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  row='keyboard_arrow_left';
  nombreUser:any;
  nombre:string='Colecciones'
  idUser:any;
  token:any;

  events: string[] = [];
  opened!: boolean;

  constructor(
    private router:Router,
    public dialog:MatDialog,
    private userService:AuthServicesService) { }

  ngOnInit(): void {
    this.idUser = localStorage.getItem('idUser');
    this.token = localStorage.getItem('Token');
    if(this.idUser && this.token){
      this.loginRe(this.idUser,this.token);
    }
  }

  loginRe(idUser:any,token:any){
    this.userService.loginRe(idUser,token).subscribe(res =>{
      this.nombreUser = res.usuarioDTO.nombre;
    })
  }

  colecciones(){
    this.nombre = 'Colecciones'
    this.router.navigate(['home/misColecciones/misColecciones'])
  }

  inventario(){
    this.nombre = 'Inventario de diseños'
    this.router.navigate(['home/misColecciones/misColecciones'])
  }

  open(){
    this.row = 'keyboard_arrow_right';
  }
  close(){
    this.row = 'keyboard_arrow_left';
  }

  logOut(){
    const modalReference = this.dialog.open(MatDialogLogoutComponent,{
      width: '450px',
      height: '200px',
    })
    
    modalReference.afterClosed().subscribe((result) => {
      console.log(result)
      if(result){
          this.userService.logOut().then(result => {
            console.log(result);
            this.router.navigate(['/auth/login']);
            sessionStorage.clear();
            localStorage.clear();
            location.reload();
        }).catch(error => console.log(error))
      }
      })
     
    

  }

}
