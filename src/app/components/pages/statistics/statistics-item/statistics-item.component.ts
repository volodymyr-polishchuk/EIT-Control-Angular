import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-statistics-item',
  templateUrl: './statistics-item.component.html',
  styleUrls: ['./statistics-item.component.css']
})
export class StatisticsItemComponent {

  @Input() subjectName: string;
  @Input() formattedTime: string;
}
