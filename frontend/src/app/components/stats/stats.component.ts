import { Component, AfterViewInit } from '@angular/core';

import { Entry } from '../../models/entry.model';
import { EntryService } from '../../services/entry.service';

import * as moment from 'moment-timezone';

import MY_FORMATS from '../../globals';
import { MAT_DATE_FORMATS } from '@angular/material/core';

import { Chart, ChartSize } from 'chart.js';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css'],
  providers: [
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ]
})
export class StatsComponent implements AfterViewInit {

  mainChart: any;
  startDate = moment().subtract(2, 'd').hours(0).minutes(0).seconds(0);
  endDate = moment().hours(23).minutes(59).seconds(59);
  entries: Entry[];
  filteredEntries: Entry[];

  currentXAxe: Chart.ChartXAxe;
  currentDataArray: any[];

  detailedHoursXAxe: Chart.ChartXAxe = {
    type: 'time',
    time: {
      unit: 'hour',
      unitStepSize: 1,
      displayFormats: {
          'hour': 'HH:mm'
      },
      tooltipFormat: 'HH:mm'
    }
  };

  hoursXAxe: Chart.ChartXAxe = {
    type: 'time',
    time: {
      unit: 'hour',
      unitStepSize: 4,
      displayFormats: {
          'hour': 'HH:mm ddd'
      },
      tooltipFormat: 'HH:mm ddd'
    }
  };

  longHoursXAxe: Chart.ChartXAxe = {
    type: 'time',
    time: {
      unit: 'hour',
      unitStepSize: 8,
      displayFormats: {
          'hour': 'HH:mm ddd'
      },
      tooltipFormat: 'HH:mm ddd'
    }
  };

  detailedDaysXAxe: Chart.ChartXAxe = {
    type: 'time',
    time: {
      unit: 'hour',
      unitStepSize: 12,
      displayFormats: {
          'hour': 'HH:mm DD/MM'
      },
      tooltipFormat: 'HH:mm DD/MM'
    }
  };

  daysXAxe: Chart.ChartXAxe = {
    type: 'time',
    time: {
      unit: 'day',
      displayFormats: {
          'day': 'DD MMM'
      }
    }
  };

  constructor(private entryService: EntryService) {
    Chart.defaults.global.maintainAspectRatio = false;
  }

  ngAfterViewInit() {
    this.entryService
      .getEntries()
      .subscribe((data: Entry[]) => {
        this.entries = data;
        this.filteredEntries = this.entries.filter(entry => {
          const validDate = moment(entry.date);
          return validDate <= this.endDate &&
            validDate >= this.startDate;
        });
        this.currentDataArray = this.getChartDataArray(this.filteredEntries);
        this.currentXAxe = this.hoursXAxe;
        this.chartInit();
      });
  }

  onResize(event) {
    this.chartInit();
  }

  updateChart() {
    const duration = moment.duration(this.endDate.diff(this.startDate)).asDays();
    console.log(duration);

    if (duration < 1) {
      this.updateData(this.detailedHoursXAxe);
      this.chartInit();
    } else if (duration < 3) {
      this.updateData(this.hoursXAxe);
      this.chartInit();
    } else if (duration < 5) {
      this.updateData(this.longHoursXAxe);
      this.chartInit();
    } else if (duration < 7) {
      this.updateData(this.detailedDaysXAxe);
      this.chartInit();
    } else {
      this.updateDataByIntervals(1, 'days', this.daysXAxe);
      this.chartInit();
    }
  }

  updateData(XAxe: Chart.ChartXAxe) {
    this.filteredEntries = this.entries.filter(entry => {
      const validDate = moment(entry.date);
      return validDate <= moment(this.endDate).add(1, 'days') &&
        validDate >= this.startDate;
    });
    this.mainChart.destroy();
    this.currentDataArray = this.getChartDataArray(this.filteredEntries);
    this.currentXAxe = XAxe;
  }

  updateDataByIntervals(interval: moment.DurationInputArg1, unit: moment.unitOfTime.DurationConstructor, XAxe: Chart.ChartXAxe) {
      const start = moment(this.startDate).hours(0).minutes(0).seconds(0);
      const end = moment(this.startDate).add(1, 'days');
      const dates = [];
      const moods = [];
      while (end <= this.endDate.clone().add(interval, unit)) {
        this.filteredEntries = this.entries.filter(entry => {
          const validDate = moment(entry.date);
          return validDate <= end &&
            validDate >= start;
        });
        if (this.filteredEntries.length > 0) {
          dates.push(start.toDate());
          const dailyMoods = this.filteredEntries.map(entry => entry.mood);
          const sum = dailyMoods.reduce((a, b) => a.valueOf() + b.valueOf());
          moods.push(sum.valueOf() / dailyMoods.length);
        }
        start.add(interval, unit);
        end.add(interval, unit);
      }
      this.mainChart.destroy();
      this.currentDataArray = this.createChartDataArray(dates, moods);
      this.currentXAxe = XAxe;
  }

  chartInit() {
    this.mainChart = new Chart('main', {
      type: 'line',
      data: {
          datasets: [{
              label: 'Mood',
              data: this.currentDataArray,
              fill: false,
              backgroundColor: 'white',
              cubicInterpolationMode: 'monotone'
          }]
      },
      options: {
        legend: {
            display: false
        },
        tooltips: {
          custom: function(tooltip) {
            if (!tooltip) { return; }
            tooltip.displayColors = false;
          }
        },
        scales: {
          xAxes: [this.currentXAxe],
          yAxes: [{
            ticks: {
              min: 0,
              max: 10
            }
          }]
        },
        responsive: true
      },
      plugins: [
        {
          afterLayout: (chart, options) => {
            const area = chart.chartArea;
            const color = chart.ctx.createLinearGradient(0, area.bottom, 0, area.top);
            color.addColorStop(0, 'navy');
            color.addColorStop(0.1 , 'navy');
            color.addColorStop(0.2, 'blue');
            color.addColorStop(0.35, 'blue');
            color.addColorStop(0.375, '#007878');
            color.addColorStop(0.4, 'green');
            color.addColorStop(0.5, 'green');
            color.addColorStop(0.6, 'green');
            color.addColorStop(0.625, '#989800');
            color.addColorStop(0.65, 'orange');
            color.addColorStop(0.8, 'orange');
            color.addColorStop(0.9, 'red');
            color.addColorStop(1, 'red');
            chart.data.datasets[0].borderColor = color;
            console.log('beep');
          }
        }
      ],
    });
  }

  createChartDataArray(dates: Date[], moods: Number[]) {
    const dataArray = [];
    const length = moods.length;
    if (dates.length !== length) {
      throw new Error('Both parameter tables length have to be equal!');
    } else {
      for (let i = 0; i < moods.length; i++) {
        dataArray.push({
          x: dates[i],
          y: moods[i]
        });
      }
    }
    return dataArray;
  }

  getChartDataArray(entries) {
    const dataArray = [];
    const sortedEntries = entries;
    sortedEntries.sort((a, b) => {
      const date1 = moment(a.date);
      const date2 = moment(b.date);
      return +date1 - +date2;
    });
    sortedEntries.forEach(entry => {
      dataArray.push({
        x: entry.date,
        y: entry.mood
      });
    });
    return dataArray;
  }
}
