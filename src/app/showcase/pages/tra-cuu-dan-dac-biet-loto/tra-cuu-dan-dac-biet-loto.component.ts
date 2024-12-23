import { HttpResponse } from "@angular/common/http";
import { Component } from "@angular/core";
import moment from "moment";
import { ToastService } from "../../utils/toast.service";
import { ApiServices } from "@layout/api.services";
import { ActivatedRoute } from "@angular/router";
import { Plugins } from "../../utils/plugins";

@Component({
  selector: 'tra-cuu-dan-dac-biet-loto',
  templateUrl: './tra-cuu-dan-dac-biet-loto.component.html',
  styleUrls: ['tra-cuu-dan-dac-biet-loto.component.scss']
})
export class TraCuuDanDacBietLotoComponent {
  REQUEST_STATISTIC_TODAY = 'api/v1/date-multi-values';
  REQUEST_STATISTIC = 'api/v1/statistic';
  isShowSearch = false;
  listSo = [
    {
      label: 2,
      value: 2,
      key: 2
    },
    {
      label: 3,
      value: 3,
      key: 3
    }
  ];
  startDate = new Date('2010-01-01');
  endDate = new Date(Date.now() - 86400000);
  minDate: any;
  maxDate: any;
  quantity: any;
  listQuantity: any;
  data: any;
  isConcurOccur = false;
  plugins = new Plugins();
  isLoading = false;
  constructor(
    private apiService: ApiServices,
    private toast: ToastService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.searchStatistic();
  }
  searchStatisticsTodayNumber() {
    this.isLoading = true;
    const payload = {
      quantity: this.quantity ? this.quantity.value : ''
    };
    this.apiService.postOption(this.REQUEST_STATISTIC_TODAY, payload, '/statistic-today-number').subscribe(
      (res: HttpResponse<any>) => {
        if (res.body.code == 200) {
          this.isLoading = false;
          this.data = {
            ...res.body.result,
            data: res.body.result.data.join(', '),
            startDate: this.plugins.formatDateWithType(res.body.result.startDate, 'YYYYMMDD', 'DD-MM-YYYY'),
            endDate: this.plugins.formatDateWithType(res.body.result.endDate, 'YYYYMMDD', 'DD-MM-YYYY'),
            maxStartDate: res.body.result.maxStartDate ? this.plugins.formatDateWithType(res.body.result.maxStartDate, 'YYYYMMDD', 'DD-MM-YYYY') : 0,
            maxEndDate: res.body.result.maxEndDate ? this.plugins.formatDateWithType(res.body.result.maxEndDate, 'YYYYMMDD', 'DD-MM-YYYY') : 0,
            lastDate: this.plugins.formatDateWithType(res.body.result.lastDate, 'YYYYMMDD', 'DD-MM-YYYY'),
            duringDate: this.plugins.formatDateWithType(res.body.result.duringDate, 'YYYYMMDD', 'DD-MM-YYYY')
          };
          this.toast.success('Tìm kiếm dữ liệu thành công!');
        } else {
          this.isLoading = false;
          this.toast.error(res.body.result);
        }
      },
      () => {
        this.isLoading = false;
        console.error();
      }
    );
  }
  searchStatistic() {
    this.isLoading = true;
    const payload = {
      startDate: this.startDate ? +moment(this.startDate).format('YYYYMMDD') : '',
      endDate: this.endDate ? +moment(this.endDate).format('YYYYMMDD') : '',
      values: this.listQuantity
        ? this.listQuantity
            .trim()
            .split(',')
            .map((item: any) => +item)
        : '',
      concurOccur: this.isConcurOccur ? 1 : 0
    };
    this.apiService.postOption(this.REQUEST_STATISTIC_TODAY, payload, '/statistic').subscribe(
      (res: HttpResponse<any>) => {
        if (res.body.code === 200) {
          this.isLoading = false;
          this.data = this.formatData(res.body.result);
          this.toast.success('Tìm kiếm dữ liệu thành công!');
        } else {
          this.isLoading = false;
          this.toast.error(res.body.result);
        }
      },
      () => {
        this.isLoading = false;
      }
    );
  }
  formatData(dataOrigin: any) {
    if (!dataOrigin) return null;
    return {
      ...dataOrigin,
      data: dataOrigin.data.join(', '),
      startDate: this.plugins.formatDateWithType(dataOrigin.startDate, 'YYYYMMDD', 'DD-MM-YYYY'),
      endDate: this.plugins.formatDateWithType(dataOrigin.endDate, 'YYYYMMDD', 'DD-MM-YYYY'),
      maxStartDate: dataOrigin.maxStartDate ? this.plugins.formatDateWithType(dataOrigin.maxStartDate, 'YYYYMMDD', 'DD-MM-YYYY') : 0,
      maxEndDate: dataOrigin.maxEndDate ? this.plugins.formatDateWithType(dataOrigin.maxEndDate, 'YYYYMMDD', 'DD-MM-YYYY') : 0,
      lastDate: this.plugins.formatDateWithType(dataOrigin.lastDate, 'YYYYMMDD', 'DD-MM-YYYY'),
      duringDate: this.plugins.formatDateWithType(dataOrigin.duringDate, 'YYYYMMDD', 'DD-MM-YYYY')
    };
  }
  selectStartDate(event: Date) {
    this.minDate = event;
  }
  selectEndDate(event: Date) {
    this.maxDate = event;
  }
}