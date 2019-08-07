import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGuardService } from './shared/guards/auth-guard.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'filmes';

  constructor(private auth: AuthGuardService, private router: Router) { }

  navigate(menu: string) {
    if (menu === 'logout') {
      this.logout();
    } else {
      this.chageMenu(menu);
    }
  }

  chageMenu(menu:string):void {
    this.router.navigate(['/'+ menu +'']);
  } 

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/auth']);
  }

  getToken() {
    return localStorage.getItem("token")
  }

  isLoggednIn() {
    return this.getToken() !== null;
  }
}
