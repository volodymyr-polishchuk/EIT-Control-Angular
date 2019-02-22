import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subject} from '../../../shared/models/subject';
import {DataSourceService} from '../../../shared/repository/data-source.service';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.css']
})
export class SubjectsComponent implements OnInit {
  form: FormGroup;
  private formSubmitAttempt: boolean;
  subjects: Array<Subject> = [];
  constructor(private formBuilder: FormBuilder,
              private dataSource: DataSourceService,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      subjectName: ['', Validators.required]
    });
    this.dataSource.getAllSubject()
      .subscribe(value => {
        this.subjects = value.map((item) => ({key: item.k, name: item.name}));
        this.subjects.sort((a, b) => a.name.localeCompare(b.name));
      });
  }

  isFieldInvalid(field: string) {
    return (
      (!this.form.get(field).valid && this.form.get(field).touched) ||
      (this.form.get(field).untouched && this.formSubmitAttempt)
    );
  }

  createSubject() {
    if (this.form.valid) {
      this.dataSource.createSubject({ key: null, name: this.form.value.subjectName })
        .subscribe(value => {
          this.snackBar.open('Предмет успішно створено', 'Закрити', { duration: 3000 });
          this.form.reset();
          this.subjects.push({key: value.k, name: value.name });
          this.subjects.sort((a, b) => a.name.localeCompare(b.name));
        });
    }
    this.formSubmitAttempt = true;
  }

  deleteSubject(event: any, subject: Subject): void {
    const message = `Ви точно бажаєте видалити предмет [${subject.name}]?`;
    if (confirm(message)) {
      this.subjects = this.subjects.filter(item => item !== subject);
      alert('Майже видаляно');
    }
  }
}
