import {Component, OnInit} from '@angular/core';
import {DataSourceService} from '../../../shared/repository/data-source.service';
import {User} from '../../../shared/models/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: User = {
    name: '',
    login: '',
    description: ''
  };
  constructor(private dataSource: DataSourceService) { }

  ngOnInit() {
    if (localStorage.getItem('userInfo')) {
      this.user = JSON.parse(localStorage.getItem('userInfo'));
    }
    this.dataSource.getUserInfo()
      .subscribe(value => {
        this.user = value;
        localStorage.setItem('userInfo', JSON.stringify(this.user));
      });
  }

}
