import { Component, ViewChild } from '@angular/core';
import { Observable, map, shareReplay } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from '../services/auth/api.service';
import { AlertConfirmComponent } from '../components/alert-confirm/alert-confirm.component';
import { Configuration } from 'ng-material-multilevel-menu';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {

  @ViewChild('drawer') drawer: MatSidenav;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Web)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  siglas = 'A';
  nameRoleUser: string;
  appitems = [
    {
      label: 'EMPLEADOS',
      faIcon: 'ri-team-line',
      link: '/dashboard/employee',
    },
    {
      label: 'SOLICITUDES',
      faIcon: 'ri-calendar-todo-fill',
      link: '/dashboard/vacation-request',
    }
  ]

  config: Configuration = {
    paddingAtStart: true,
    selectedListFontColor : `var(--primary-color)`,
    fontColor: `var(--white-color)`,
    backgroundColor: `var(--dark-color)`,
  };

  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    public apiService: ApiService,
    private dialog: MatDialog
  ){}

  selectedItem($event) {
    this.router.navigateByUrl($event.link);
    if (this.drawer) {
      this.drawer.opened = false;
    }
  }

  logout(): void {
    const dialogRef = this.dialog.open(AlertConfirmComponent, {
      data: { message: '¿Estás seguro de que deseas salir?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.router.navigateByUrl('/auth/login');
      }
    });
  }

}
