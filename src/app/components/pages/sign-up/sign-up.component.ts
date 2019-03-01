import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DataSourceService} from '../../shared/repository/data-source.service';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  form: FormGroup;
  hide = true;
  private formSubmitAttempt: boolean;
  constructor(private fb: FormBuilder,
              private dataSource: DataSourceService,
              private router: Router,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      login: ['', Validators.required],
      password: ['', Validators.minLength(8)],
      email: ['', Validators.email]
    });
  }

  isFieldInvalid(field: string) {
    return (
      (!this.form.get(field).valid && this.form.get(field).touched) ||
      (this.form.get(field).untouched && this.formSubmitAttempt)
    );
  }

  signUp() {
    if (this.form.valid) {
      this.dataSource.signUp(this.form.value.name, this.form.value.email, this.form.value.login, this.form.value.password)
        .subscribe(value => {
          this.snackBar.open('Реєстрація успішна', 'Закрити', { duration: 3000 });
          this.router.navigate(['/login']).catch(console.log);
        });
    }
    this.formSubmitAttempt = true;
  }
}
