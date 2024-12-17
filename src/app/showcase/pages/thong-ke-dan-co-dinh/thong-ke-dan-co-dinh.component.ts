import { Component, OnInit } from "@angular/core";
import { Plugins } from "../../utils/plugins";
import { ApiServices } from "@layout/api.services";
import { HttpResponse } from "@angular/common/http";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastService } from "../../utils/toast.service";

@Component({
  selector: 'thong-ke-dan-co-dinh',
  templateUrl: './thong-ke-dan-co-dinh.component.html'
})
export class ThongKeDanCoDinhComponent implements OnInit {
  startDate = new Date('2010-01-01');
  endDate = new Date(Date.now() - 86400000);
  minDate: any;
  maxDate: any;
  quantity = { label: 'Tất cả', value: '', key: 'all' };
  itemsPerPage = 5;
  scrollHeight = '';
  REQUEST_URL = 'api/v1/date-values-history';
  listData: any[] = [];
  listDataSearch: any[] = [];
  plugins = new Plugins();
  isLoading = false;
  isShowSearch = false;
  page = 0;
  first = 0;
  size = 15;
  totalItems = 0;
  dataSelected: any;
  listQuantity = Array.from({ length: 10 }, (_, i) => {
    if (i === 0) {
      return { label: 'Tất cả', value: '', key: 'all' };
    }
    const value = 30 + (i - 1) * 5;
    return { label: value, value: value, key: value };
  });
  sort = ['id', 'desc'];
  constructor(
    private apiService: ApiServices,
    private router: Router,
    private route: ActivatedRoute,
    private toast: ToastService
  ) {}
  ngOnInit(): void {
    this.scrollHeight = this.plugins.calculateScrollHeight(-20);
    this.searchThongKeDanCoDinh();
  }
  changeRowTable(event: any) {
    this.itemsPerPage = event;
  }
  filter() {
    const arr = [];
    arr.push('status==1;id>0');
    if (this.quantity && this.quantity.value) arr.push(`quantity==${this.quantity.value}`);
    return arr.join(';');
  }
  searchThongKeDanCoDinh() {
    const params = {
      page: this.page,
      size: this.size,
      filter: this.filter(),
      sort: this.sort
    };
    this.apiService.getOption(this.REQUEST_URL, params, '/search').subscribe((res: HttpResponse<any>) => {
      if (res.body.code === 200) {
        this.listData = res.body.result.content.map((item, index) => ({
          ...item,
          index: 10 * this.page + index + 1,
          data: item.data.replaceAll(/\[|\]/g, ''),
          lastDate: this.plugins.formatDateWithType(item.lastDate, 'YYYYMMDD', 'DD/MM/YYYY'),
          startDate: this.plugins.formatDateWithType(item.startDate, 'YYYYMMDD', 'DD/MM/YYYY'),
          endDate: this.plugins.formatDateWithType(item.endDate, 'YYYYMMDD', 'DD/MM/YYYY')
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
    this.searchThongKeDanCoDinh();
  }
  filterData() {
    this.page = 0;
    this.first = 0;
    this.searchThongKeDanCoDinh();
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
  editNumber(data: any) {
    if (!data) return;
    this.dataSelected = {
      data: data.data,
      id: data.id
    };
  }
  updateData() {
    this.isLoading = true
    const payload = {
      id: this.dataSelected.id,
      data: JSON.stringify(this.dataSelected.data.split(',').map((item) => +item)),
      status: 1
    };
    this.apiService.put(this.REQUEST_URL, payload, '/update').subscribe(
      (res: HttpResponse<any>) => {
        if (res.body.code === 200) {
          this.isLoading = false
          this.dataSelected = null
          this.toast.success('Cập nhật dàn số thành công')
          this.searchThongKeDanCoDinh()
        } else {
          this.isLoading = false;
          this.toast.error('Cập nhật dàn số không thành công');
        }
      },
      () => {
        this.isLoading = false;
      }
    )
  }
}