import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import Chart from 'chart.js';
import {ChartData} from "./chart-data";

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit, AfterViewInit {
  @Input() chartName: string;
  @Input() size = 400;
  @Input() type = 'pie';
  @Input() title = '';
  @Input() data: [ChartData][];

  chart: Chart;
  chartData;

  constructor() {
  }

  ngOnInit() {
    this.chartData = this.setChartData(this.data);
  }

  ngAfterViewInit() {
    this.initChart(this.chartName);
  }

  initChart(name: string) {
    const ctx = document.getElementById(name);
    this.chart = new Chart(ctx, {
      type: this.type,
      data: {
        labels: this.chartData.labels,
        datasets: [
          {
            data: this.chartData.data,
            backgroundColor: this.chartData.colors,
            /*borderColor: this.chartData.colors,*/
            borderWidth: 2,
          }
        ]
      },
      options: {
        title: {
          display: !!this.title,
          text: this.title
        },
        legend: {
          align: 'end',
          position: 'left'
        },
        layout: {
          padding: {
            left: 15,
            right: 15,
            top: 15,
            bottom: 15
          }
        }
      }
    });
  }

  /**
   * Convert data to appropriate chart data.
   * @param items
   */
  setChartData(items) {
    let chartData = [];
    let labels = [];
    let values = [];

    items.forEach(item => {
      labels.push(item[0]);
      values.push(item[1]);
    });

    chartData['labels'] = labels;
    chartData['data'] = values;
    chartData['colors'] =  this.generateColors(items.length);
    return chartData;
  }

  private generateColors(amount: number) {
    let colors = [];
    for (let i = 0; i < amount; i++) {
      const h = 190; // blue
      const s = Math.floor(Math.random() * 80);
      const l = Math.floor(Math.random() * 90);
      colors.push('hsl(' + h + ', ' + s + '%, ' + l + '%)');
    }
    return colors;
  }
}
