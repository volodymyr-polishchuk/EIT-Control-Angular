import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Subject} from '../../../shared/models/subject';
import {MatCheckbox} from '@angular/material';

@Component({
  selector: 'app-search-fields',
  templateUrl: './search-fields.component.html',
  styleUrls: ['./search-fields.component.css']
})
export class SearchFieldsComponent implements OnInit {

  @Input() subjects: Array<Subject> = [];
  @Output() search = new EventEmitter<{subjectKey: string, group: string, fromDate: string, toDate: string}>();
  constructor() { }

  ngOnInit() {
  }

  onButtonClick(subjectSelect: HTMLSelectElement,
           groupCheckbox: MatCheckbox,
           fromDateInput: HTMLInputElement,
           toDateInput: HTMLInputElement) {
    const subjectKey: string = subjectSelect.options[subjectSelect.selectedIndex].value;
    const group: string = groupCheckbox.checked ? '1' : '0';
    const fromDate: string = fromDateInput.value;
    const toDate: string = toDateInput.value;
    this.search.emit({subjectKey: subjectKey, group: group, fromDate: fromDate, toDate: toDate});
  }

}
