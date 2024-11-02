import { Component } from "@angular/core";
import { Plugins } from "../../utils/plugins";

@Component({
  selector: 'statistic-component',
  templateUrl: './statistic.component.html'
})
export class StatisticComponent {
  startDate = new Date();
  endDate = new Date();
  quantity: any
  data: any
  plugins = new Plugins()
}