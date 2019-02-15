import { Component, OnInit } from '@angular/core';
import {DataSourceService} from '../../shared/repository/data-source.service';

@Component({
  selector: 'app-settings',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {

  statistics: Array<{formatted_time: string, seconds: number, subject_name: string}> = [];
  constructor(private dataSource: DataSourceService) { }

  static timeFormat(second: number) {
    return Math.floor(second / 60) + ':' + ((second % 60) >= 10 ? (second % 60) : ('0' + (second % 60)));
  }

  ngOnInit() {
    this.dataSource.getStatistics()
      .subscribe(value => {
        this.statistics = value;
      });
  }

  getTimeSumFormatted(): string {
    return StatisticsComponent.timeFormat(
      this.statistics.reduce((previousValue, currentValue) => previousValue + Number(currentValue.seconds), 0)
    );
  }
}
