import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  showMenu = false;

  constructor(private router: Router) { }

  logout(): void {
    if (confirm('Ви точно бажаєте вийти?')) {
      localStorage.removeItem('token');
      this.router.navigate(['login']).catch(alert);
    }
  }

  closeMenu(event) {
    this.showMenu = false;
  }

  ngOnInit(): void {
    const elements = document.querySelectorAll('button[mat-button]');
    elements.forEach(element => element.addEventListener('click', () => {
      this.showMenu = false;
    }));
  }

}
