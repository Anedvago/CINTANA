import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxChartsModule, Color, ScaleType } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-vertical-bars',
  standalone: true,
  imports: [CommonModule, NgxChartsModule],
  templateUrl: './vertical-bars.component.html',
  styleUrls: ['./vertical-bars.component.css'],
})
export class VerticalBarsComponent {
  public monthsValue: { name: string; value: number }[] = [
    { name: 'Mar', value: 50000 },
    { name: 'Abr', value: 60000 },
    { name: 'May', value: 75000 },
    { name: 'Jun', value: 90000 },
    { name: 'Jul', value: 85000 },
    { name: 'Ago', value: 100000 },
    { name: 'Sep', value: 50000 },
    { name: 'Oct', value: 60000 },
    { name: 'Nov', value: 75000 },
  ];

  public view: [number, number] = [470, 130];

  public gradient = false;
  public showXAxis = true;

  public colorScheme: string | Color = {
    name: 'Color1',
    selectable: true,
    group: ScaleType.Linear,
    domain: ['#3056D3', '#61BD5F', '#BB4141', '#F19221'],
  };
}
