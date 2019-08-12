import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../shared/repository/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  hide = true;
  private formSubmitAttempt: boolean;
  constructor(private fb: FormBuilder,
              private router: Router,
              private auth: AuthService) { }

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
      this.auth.login(this.form.value.login, this.form.value.password)
        .subscribe((token) => {
          this.auth.updateToken(token);
          this.router.navigate(['/student/lessons']).catch(console.log);
        }, error => {
          alert(JSON.stringify(error));
        });
    }
    this.formSubmitAttempt = true;
  }

}
