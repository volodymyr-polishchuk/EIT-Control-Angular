import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  showMenu = false;

  constructor(private router: Router) { }

  logout(): void {
    if (confirm('Ви точно бажаєте вийти?')) {
      localStorage.removeItem('token');
      this.router.navigate(['login']).catch(alert);
    }
  }

}
