import { Component, OnInit } from "@angular/core";
import { Plugins } from "../../utils/plugins";
import { ApiServices } from "@layout/api.services";
import { HttpResponse } from "@angular/common/http";
import moment from "moment";
import { ToastService } from "../../utils/toast.service";

@Component({
  selector: 'statistic-component',
  templateUrl: './statistic.component.html',
  styleUrls: ['statistic.component.scss']
})
export class StatisticComponent implements OnInit {
  startDate: any;
  endDate: any;
  minDate: any;
  maxDate: any;
  quantity: any;
  listData: any[] = [];
  listDataSearch: any[] = [];
  plugins = new Plugins();
  REQUEST_URL = 'api/v1/search';
  isLoading = false
  constructor(
    private apiService: ApiServices,
    private toast: ToastService
  ) {}
  ngOnInit(): void {
    this.getAllData();
  }
  getAllData() {
    this.isLoading = true;
    const params = {
      page: 0,
      size: 100000,
      filter: 'id>0',
      sort: ['id', 'asc']
    };
    this.apiService.getOption(this.REQUEST_URL, params, '').subscribe((res: HttpResponse<any>) => {
      if (res.body.code === 200) {
        this.isLoading = false;
        if (res.body.result.content.length) {
          this.listData = res.body.result.content.map((item: any) => ({
            ...item,
            date: this.plugins.formatDateWithType(item.date, 'YYYYMMDD', 'DD/MM/YYYY'),
            isHighlight: false
          }));
        } else {
          this.listData = [];
        }
      } else {
        this.isLoading = false
      }
    },
      () => {
        this.isLoading = false
      }
    );
  }
  searchStatistic() {
    this.isLoading = true;
    const params = {
      page: 0,
      size: 100000,
      filter: this.filter(),
      sort: ['id', 'asc']
    };
    this.apiService.getOption(this.REQUEST_URL, params, '').subscribe(
      (res: HttpResponse<any>) => {
        if (res.body.code === 200) {
          this.isLoading = false;
          this.toast.success('Tìm kiếm dữ liệu thành công')
          if (res.body.result.content.length) {
            this.listData = this.listData.map((item) => ({
              ...item,
              isHighlight: false
            }));
            this.listDataSearch = res.body.result.content;
          }
        } else {
          this.isLoading = false;
          this.toast.error(res.body.result)
        }
      },
      (err) => {
        console.error()
        this.isLoading = false;
      }
    );
  }
  filter() {
    const arr = [];
    arr.push('id>0');
    if (this.quantity) arr.push(`value==${this.quantity}`);
    if (this.startDate) arr.push(`date>=${+moment(this.startDate).format('YYYYMMDD')}`);
    if (this.endDate) arr.push(`date<=${+moment(this.endDate).format('YYYYMMDD')}`);
    return arr.join(';');
  }
  checkingMarkStatistic(data: any) {
    const result = this.listDataSearch.find((item) => item.value === data.value && item.date === +this.plugins.formatDateWithType(data.date, 'DD/MM/YYYY', 'YYYYMMDD'));
    if (result) return false;
    return true;
  }
  selectStartDate(event: Date) {
    this.minDate = event;
  }
  selectEndDate(event: Date) {
    this.maxDate = event;
  }
}