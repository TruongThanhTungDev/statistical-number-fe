import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { Plugins } from "../../utils/plugins";
import { ApiServices } from "@layout/api.services";
import { HttpResponse } from "@angular/common/http";
import moment from "moment";
import { ToastService } from "../../utils/toast.service";

interface Item {
  id: number;
  date: number;
  value: string;
  isActive: number;
}
@Component({
  selector: 'statistic-component',
  templateUrl: './statistic.component.html',
  styleUrls: ['statistic.component.scss']
})
export class StatisticComponent implements OnInit, AfterViewInit {
  @ViewChild('scrollableDiv') scrollableDiv!: ElementRef;
  startDate = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
  endDate = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0);
  minDate: any;
  maxDate: any;
  quantity: any;
  listData: any[];
  dateList: any[]
  listDataSearch: any[] = [];
  plugins = new Plugins();
  REQUEST_URL = 'api/v1/search';
  REQUEST_URL_V2 = 'api/v1/search-rage-numbers';
  isLoading = false;
  isShowSearch = false;
  isLoadmore = false;
  scrollHeight = '';
  previousScrollHeight = 0;
  page = 0;
  totalPages = 0;
  start = false;
  end = false;
  sum = false;
  constructor(
    private apiService: ApiServices,
    private toast: ToastService
  ) {}
  ngOnInit(): void {
    // this.getAllData();
    this.getAllDataV2();
    this.scrollHeight = this.plugins.calculateScrollHeight(-20);
  }
  ngAfterViewInit() {
  }
  getAllDataV2() {
    this.isLoading = true;
    const params = {
      startDate: this.startDate ? moment(this.startDate).format('YYYYMMDD') : moment(new Date(new Date().getFullYear(), new Date().getMonth(), 1)).format('YYYYMMDD'),
      endDate: this.endDate ? moment(this.endDate).format('YYYYMMDD') : moment(new Date()).format('YYYYMMDD'),
      data: this.quantity ? this.quantity.split(",") : []
      // data: [12, 61, 91, 94, 87, 78, 38, 22, 77, 15, 73, 26, 84, 33, 64, 67, 55, 74, 58, 88, 62, 34, 51, 93, 71, 49, 41, 23, 60, 37, 29, 45, 57, 42, 13, 54, 66, 2, 35, 43, 19, 53, 95, 48, 92, 50, 28, 9, 69, 4, 65, 36, 81, 24, 47, 89, 40, 32, 97, 75]
    };
    this.apiService.postOption(this.REQUEST_URL_V2, params, '').subscribe((res: HttpResponse<any>) => {
      if (res.body.code === 200) {
        this.isLoading = false;
        if (res.body.result.dateValues.length) {
          this.listData = this.formatDateByWeek(res.body.result.dateValues);
          this.dateList = res.body.result.dateList;
        } else {
          this.listData = [];
          this.dateList = []
          this.isLoading = false;
        }
      } else {
        this.isLoading = false;
        this.listData = [];
        this.dateList = [];
      }
    },
      () => {
        this.isLoading = false;
        this.listData = [];
        this.dateList = [];
    });
  }
  formatDateByWeek(data: any[]) {
    if (!data.length) return;
    let grouped: { [weekNumber: number]: Item[] } = {};
    data.forEach((item) => {
      const dateStr = item.date.toString();
      const year = parseInt(dateStr.substring(0, 4), 10);
      const month = parseInt(dateStr.substring(4, 6), 10) - 1;
      const day = parseInt(dateStr.substring(6, 8), 10) - 1;
      const date = new Date(year, month, day);
      const firstDayOfYear = new Date(year, 0, 1);
      const weekNumber = Math.floor((+date - +firstDayOfYear + firstDayOfYear.getDay() * 86400000) / (7 * 86400000));
      if (!grouped[weekNumber]) {
        grouped[weekNumber] = [item];
      } else {
        grouped[weekNumber].push(item);
      }
    });
    Object.keys(grouped).forEach((weekNumber) => {
      const weekDays: Item[] = grouped[weekNumber];
      const date = new Date(moment(weekDays[0].date, 'YYYYMMDD').format('YYYY-MM-DD'));
      const dayOfWeek = date.getDay();
      const diff = date.getDate() - dayOfWeek + (dayOfWeek == 0 ? -6 : 1);
      const firstDayOfWeek = new Date(date.setDate(diff));
      for (let i = 0; i < 7; i++) {
        const dayOfWeek = new Date(firstDayOfWeek);
        dayOfWeek.setDate(firstDayOfWeek.getDate() + i);
        const formattedDate = dayOfWeek.toISOString().slice(0, 10).replace(/-/g, '');

        if (weekDays.length !== 7) {
          if (!weekDays.some((item) => item.date.toString() === formattedDate)) {
            weekDays.push({
              id: 0,
              date: +formattedDate,
              value: '',
              isActive: 0
            });
          }
        }
      }
      weekDays.sort((a, b) => a.date - b.date);
    });
    return Object.values(grouped);
  }
  convertToDate(date: any) {
    return date ? new Date(date.toString().substring(0, 4), date.toString().substring(4, 6) - 1, date.toString().substring(6, 8)) : '';
  }
  getWeekNumber(date: any) {
    const startOfYear = new Date(date.getFullYear(), 0, 1);
    const days = Math.floor((date - +startOfYear) / (24 * 60 * 60 * 1000)) + startOfYear.getDay();
    return Math.ceil(days / 7);
  }
  searchStatistic() {
    this.isLoading = true;
    const params = {
      page: 0,
      size: 100000,
      filter: this.filter(),
      sort: ['id', 'desc']
    };
    this.apiService.getOption(this.REQUEST_URL, params, '').subscribe(
      (res: HttpResponse<any>) => {
        if (res.body.code === 200) {
          this.isLoading = false;
          this.toast.success('Tìm kiếm dữ liệu thành công');
          if (res.body.result.content.length) {
            this.listData = this.listData.map((item) => ({
              ...item,
              isHighlight: false
            }));
            this.isShowSearch = false;
            this.listDataSearch = res.body.result.content;
          }
        } else {
          this.isLoading = false;
          this.toast.error(res.body.result);
        }
      },
      (err) => {
        console.error();
        this.isLoading = false;
      }
    );
  }
  filter() {
    const arr = [];
    arr.push('id>0');
    if (this.quantity) arr.push(`value=in=(${this.quantity})`);
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
  getFirstChar(data: any) {
    return data ? data.toString().charAt(0) : '';
  }
  getLastChar(data: any) {
    return data ? data.toString().charAt(data.length - 1) : '';
  }
  totalNumber(data) {
    return data ? +data.toString().charAt(0) + +data.toString().charAt(data.length - 1) : '';
  }
  markDate(data) {
    if (!this.dateList) return false
    if (!data.id) return false
    return this.dateList.some((item) => data.date >= item.from && data.date <= item.to - 1)
  }
}