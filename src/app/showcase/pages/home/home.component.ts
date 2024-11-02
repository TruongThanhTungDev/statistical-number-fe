import { HttpResponse } from "@angular/common/http";
import { Component } from "@angular/core";
import { ApiServices } from "@layout/api.services";
import { Plugins } from "../../utils/plugins";
import moment from "moment";

@Component({
  selector: 'home-component',
  templateUrl: './home.component.html'
})
export class HomeComponent {
  REQUEST_STATISTIC_TODAY = 'api/v1/statistic-today-number'
  REQUEST_STATISTIC = 'api/v1/statistic'
  soCoDinhList: any[] = [
    {
      key: '0',
      label: 'Documents',
      data: 'Documents Folder',
      icon: 'pi pi-fw pi-inbox',
      children: [
        {
          key: '0-0',
          label: 'Work',
          data: 'Work Folder',
          icon: 'pi pi-fw pi-cog',
          children: [
            { key: '0-0-0', label: 'Expenses.doc', icon: 'pi pi-fw pi-file', data: 'Expenses Document' },
            { key: '0-0-1', label: 'Resume.doc', icon: 'pi pi-fw pi-file', data: 'Resume Document' }
          ]
        },
        {
          key: '0-1',
          label: 'Home',
          data: 'Home Folder',
          icon: 'pi pi-fw pi-home',
          children: [{ key: '0-1-0', label: 'Invoices.txt', icon: 'pi pi-fw pi-file', data: 'Invoices for this month' }]
        }
      ]
    },
    {
      key: '1',
      label: 'Events',
      data: 'Events Folder',
      icon: 'pi pi-fw pi-calendar',
      children: [
        { key: '1-0', label: 'Meeting', icon: 'pi pi-fw pi-calendar-plus', data: 'Meeting' },
        { key: '1-1', label: 'Product Launch', icon: 'pi pi-fw pi-calendar-plus', data: 'Product Launch' },
        { key: '1-2', label: 'Report Review', icon: 'pi pi-fw pi-calendar-plus', data: 'Report Review' }
      ]
    },
    {
      key: '2',
      label: 'Movies',
      data: 'Movies Folder',
      icon: 'pi pi-fw pi-star-fill',
      children: [
        {
          key: '2-0',
          icon: 'pi pi-fw pi-star-fill',
          label: 'Al Pacino',
          data: 'Pacino Movies',
          children: [
            { key: '2-0-0', label: 'Scarface', icon: 'pi pi-fw pi-video', data: 'Scarface Movie' },
            { key: '2-0-1', label: 'Serpico', icon: 'pi pi-fw pi-video', data: 'Serpico Movie' }
          ]
        },
        {
          key: '2-1',
          label: 'Robert De Niro',
          icon: 'pi pi-fw pi-star-fill',
          data: 'De Niro Movies',
          children: [
            { key: '2-1-0', label: 'Goodfellas', icon: 'pi pi-fw pi-video', data: 'Goodfellas Movie' },
            { key: '2-1-1', label: 'Untouchables', icon: 'pi pi-fw pi-video', data: 'Untouchables Movie', selectable: false }
          ]
        }
      ]
    }
  ];
  diemGanList = Array.from({ length: 10 }, (_, i) => {
    const value = 10 + i * 5;
    return { label: value, value: value, key: value };
  });
  startDate = new Date();
  endDate = new Date();
  quantity: any
  listQuantity: any
  data: any
  plugins = new Plugins()
  constructor(
    private apiService: ApiServices
  ) {}
  searchStatisticsTodayNumber() {
    const payload = {
      quantity: this.quantity ? this.quantity.value : ''
    }
    this.apiService.postOption(this.REQUEST_STATISTIC_TODAY, payload, '').subscribe(
      (res: HttpResponse<any>) => {
        if(res.body.code == 200) {
          this.data = {
            ...res.body.result,
            data: res.body.result.data.join(", "),
            startDate: this.plugins.formatDateWithType(res.body.result.startDate, 'YYYYMMDD', 'DD-MM-YYYY'),
            endDate: this.plugins.formatDateWithType(res.body.result.endDate, 'YYYYMMDD', 'DD-MM-YYYY'),
            maxStartDate: this.plugins.formatDateWithType(res.body.result.maxStartDate, 'YYYYMMDD', 'DD-MM-YYYY'),
            maxEndDate: this.plugins.formatDateWithType(res.body.result.maxEndDate, 'YYYYMMDD', 'DD-MM-YYYY'),
            lastDate: this.plugins.formatDateWithType(res.body.result.lastDate, 'YYYYMMDD', 'DD-MM-YYYY'),
          }
        }
      },
      () => {
        console.error()
      }
    )
  }
  searchStatistic() {
    const payload = {
      startDate: this.startDate ? +moment(this.startDate).format('YYYYMMDD') : '',
      endDate : this.endDate ? +moment(this.endDate).format('YYYYMMDD') : '',
      data: this.listQuantity ? this.listQuantity.trim().split(",").map((item: any) => +item) : ''
    }
    this.apiService.postOption(this.REQUEST_STATISTIC, payload, '').subscribe(
      (res: HttpResponse<any>) => {
        if(res.body.code === 200) {
          this.data = this.formatData(res.body.result)
        }
      }
    )
  }
  formatData(dataOrigin: any) {
    if(!dataOrigin) return null
    return {
      ...dataOrigin,
      data: dataOrigin.data.join(", "),
      startDate: this.plugins.formatDateWithType(dataOrigin.startDate, 'YYYYMMDD', 'DD-MM-YYYY'),
      endDate: this.plugins.formatDateWithType(dataOrigin.endDate, 'YYYYMMDD', 'DD-MM-YYYY'),
      maxStartDate: this.plugins.formatDateWithType(dataOrigin.maxStartDate, 'YYYYMMDD', 'DD-MM-YYYY'),
      maxEndDate: this.plugins.formatDateWithType(dataOrigin.maxEndDate, 'YYYYMMDD', 'DD-MM-YYYY'),
      lastDate: this.plugins.formatDateWithType(dataOrigin.lastDate, 'YYYYMMDD', 'DD-MM-YYYY'),
    }
  }
}