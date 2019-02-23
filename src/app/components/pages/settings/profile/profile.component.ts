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
    this.dataSource.getUserInfo()
      .subscribe(value => {
        this.user = value;
      });
  }

}
