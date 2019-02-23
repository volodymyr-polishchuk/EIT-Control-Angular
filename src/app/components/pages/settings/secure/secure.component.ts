import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material';
import {DataSourceService} from '../../../shared/repository/data-source.service';

@Component({
  selector: 'app-secure',
  templateUrl: './secure.component.html',
  styleUrls: ['./secure.component.css']
})
export class SecureComponent implements OnInit {

  form: FormGroup;
  formSubmitAttempt: boolean;
  constructor(private formBuilder: FormBuilder,
              private snackBar: MatSnackBar,
              private dataSource: DataSourceService) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }

  isFieldInvalid(field: string) {
    return (
      (!this.form.get(field).valid && this.form.get(field).touched) ||
      (this.form.get(field).untouched && this.formSubmitAttempt)
    );
  }

  changePassword(): void {
    const oldPassword = this.form.value.oldPassword;
    const newPassword = this.form.value.newPassword;
    const confirmPassword = this.form.value.confirmPassword;
    if (newPassword !== confirmPassword) {
      this.snackBar.open('Паролі не співпадають', 'Закрити', { duration: 3000 });
      return;
    }
    this.dataSource.changePassword(oldPassword, newPassword)
      .subscribe(value => {
        this.snackBar.open(value.message, 'Закрити', { duration: 3000 });
        this.formSubmitAttempt = false;
        this.form.reset();
      }, error => {
        this.snackBar.open('Пароль уведено не вірно', 'Закрити', { duration: 3000 });
        this.form.reset();
      });
    this.formSubmitAttempt = true;
  }

}
