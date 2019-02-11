import { Component, Input } from '@angular/core';
import { Subject } from '../../../shared/models/subject';

@Component({
  selector: 'app-hint',
  templateUrl: './hint.component.html',
  styleUrls: ['./hint.component.css']
})
export class HintComponent {

  @Input() subjects: Array<Subject> = [];

}
