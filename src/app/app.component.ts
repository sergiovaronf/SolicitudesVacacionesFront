import { Component } from '@angular/core';
import { UserService } from './services/user.service';
import { PositionService } from './services/position.service';
import { ApiService } from './services/auth/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  rol : number;
  position : number;

  title = 'SolicitudesVacacionesFront';

  constructor(
    private apiService : ApiService,
    private snackBar: MatSnackBar,
    private userService : UserService,
  ) {
  }

  async ngOnInit() {
    this.apiService.messageErrorHttp.subscribe(message => {
      this.openSnackBar(message);
    })

    this.rol = (await this.userService.getListRole().toPromise()).length;
    this.position = (await this.userService.getListPosition().toPromise()).length;    
    if(this.rol == 0 ){
      await this.userService.createRole().toPromise();
    }
    if(this.position == 0){
      await this.userService.createPosition().toPromise();
    }    
  }

  openSnackBar(message: string) {
    this.snackBar.open(`Error: ${message}`, 'OK', {
      duration: 4000,
    });
  }
  
}
