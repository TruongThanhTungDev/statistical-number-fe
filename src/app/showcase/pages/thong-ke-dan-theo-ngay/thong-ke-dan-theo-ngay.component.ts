import { Component, OnInit } from "@angular/core";
import { Plugins } from "../../utils/plugins";
import { HttpResponse } from "@angular/common/http";
import { ApiServices } from "@layout/api.services";
import { ActivatedRoute, Router } from "@angular/router";
import moment from "moment";

@Component({
  selector: 'thong-ke-dan-theo-ngay',
  templateUrl: './thong-ke-dan-theo-ngay.component.html'
})
export class ThongKeDanTheoNgayComponent implements OnInit {
  startDate = new Date('2010-01-01');
  endDate = new Date(Date.now() - 86400000);
  minDate: any;
  maxDate: any;
  quantity: any;
  itemsPerPage = 5;
  scrollHeight = '';
  listData: any[] = [];
  listDataSearch: any[] = [];
  plugins = new Plugins();
  page = 0;
  first = 0;
  size = 15;
  totalItems = 0;
  listQuantity = Array.from({ length: 9 }, (_, i) => {
    const value = 30 + i * 5;
    return { label: value, value: value, key: value };
  });
  isShowSearch = false
  REQUEST_URL = 'api/v1/date-values-history/search';
  sort = ['id', 'desc'];
  constructor(
    private apiService: ApiServices,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.scrollHeight = this.plugins.calculateScrollHeight(-20);
    this.searchThongKeDanTheoNgay();
  }
  selectStartDate(event: Date) {
    this.minDate = event;
  }
  selectEndDate(event: Date) {
    this.maxDate = event;
  }
  changeRowTable(event: any) {
    this.itemsPerPage = event;
  }
  filter() {
    const arr = [];
    arr.push('status==0');
    if (this.quantity) arr.push(`quantity==${this.quantity.value}`);
    if (this.startDate) arr.push(`date>=${+moment(this.startDate).format('YYYYMMDD')}`);
    if (this.endDate) arr.push(`date<=${+moment(this.endDate).format('YYYYMMDD')}`);
    return arr.join(';');
  }
  searchThongKeDanTheoNgay() {
    const params = {
      page: this.page,
      size: this.size,
      filter: this.filter(),
      sort: this.sort
    };
    this.apiService.getOption(this.REQUEST_URL, params, '').subscribe((res: HttpResponse<any>) => {
      if (res.body.code === 200) {
        this.listData = res.body.result.content.map((item, index) => ({
          ...item,
          index: 10 * this.page + index + 1,
          data: item.data.replaceAll(/\[|\]/g, ''),
          lastDate: this.plugins.formatDateWithType(item.lastDate, 'YYYYMMDD', 'DD/MM/YYYY'),
          startDate: this.plugins.formatDateWithType(item.startDate, 'YYYYMMDD', 'DD/MM/YYYY'),
          endDate: this.plugins.formatDateWithType(item.endDate, 'YYYYMMDD', 'DD/MM/YYYY'),
          createDate: this.plugins.formatDateWithType(item.createDate, 'YYYYMMDDHHmmss', 'DD/MM/YYYY')
        }));
        this.totalItems = res.body.result.totalElements;
        this.isShowSearch = false;
      }
    });
  }
  changePage(event: any) {
    this.page = event.page;
    this.size = event.rows;
    this.first = event.first;
    this.searchThongKeDanTheoNgay();
  }
  filterData() {
    this.page = 0;
    this.first = 0;
    this.searchThongKeDanTheoNgay();
  }
  selectRow(data) {
    this.router.navigate(['/tra-cuu-dan-dac-biet'], {
      queryParams: {
        data: data.data,
        startDate: this.plugins.formatDateWithType(data.startDate, 'DD/MM/YYYY', 'YYYYMMDD'),
        endDate: this.plugins.formatDateWithType(data.endDate, 'DD/MM/YYYY', 'YYYYMMDD')
      }
    });
  }
}