import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DataSourceService} from '../../shared/repository/data-source.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  hide = true;
  private formSubmitAttempt: boolean;
  constructor(private fb: FormBuilder, private dataSource: DataSourceService, private router: Router) { }

  ngOnInit() {
    this.form = this.fb.group({
      login: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  isFieldInvalid(field: string) {
    return (
      (!this.form.get(field).valid && this.form.get(field).touched) ||
      (this.form.get(field).untouched && this.formSubmitAttempt)
    );
  }

  login() {
    if (this.form.valid) {
      this.dataSource.login(this.form.value.login, this.form.value.password)
        .subscribe(value => {
          localStorage.setItem('token', value.auth_token);
          localStorage.setItem('id', value.auth_k);
          this.router.navigate(['/student/lessons']).catch(console.log);
        });
    }
    this.formSubmitAttempt = true;
  }

}
