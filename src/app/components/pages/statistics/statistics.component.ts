import {Component, OnInit} from '@angular/core';
import {DataSourceService} from '../../shared/repository/data-source.service';

@Component({
  selector: 'app-settings',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {

  efficiency: Number = 0;
  statistics: Array<{formatted_time: string, seconds: number, subject_name: string}> = [];
  constructor(private dataSource: DataSourceService) { }

  static timeFormat(time) {
    const seconds = ((time % 60) >= 10 ? (time % 60) : ('0' + (time % 60)));
    const numberOfMinutes = Math.floor(time / 60) % 60;
    const minutes = numberOfMinutes >= 10 ? numberOfMinutes : ('0' + numberOfMinutes);
    const hours = Math.floor(time / (60 * 60));
    return hours + ':' + minutes + ':' + seconds;
  }

  ngOnInit() {
    this.dataSource.getStatistics()
      .subscribe(value => {
        this.statistics = value;
      });
    this.dataSource.getEfficiency()
      .subscribe(value => {
        console.log(value);
        this.efficiency = Number(value.efficiency);
      });
  }

  getTimeSumFormatted(): string {
    return StatisticsComponent.timeFormat(
      this.statistics.reduce((previousValue, currentValue) => previousValue + Number(currentValue.seconds), 0)
    );
  }
}
