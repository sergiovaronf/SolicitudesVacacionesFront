import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PositionService } from 'src/app/services/position.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(
    private positionService : PositionService,
    private userService : UserService,
    private router: Router
  ) {
  }  

  login(){
    this.router.navigateByUrl('/dashboard/employee');
  }
}
