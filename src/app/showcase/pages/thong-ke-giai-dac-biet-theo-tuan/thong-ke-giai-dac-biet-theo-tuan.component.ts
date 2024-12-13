import { Component, OnInit } from "@angular/core";
import { ApiServices } from "@layout/api.services";
import moment from "moment";
import { ToastService } from "../../utils/toast.service";
import { HttpResponse } from "@angular/common/http";
import { Plugins } from "../../utils/plugins";
import { DialogService, DynamicDialogRef } from "primeng/dynamicdialog";
import { XemKetQuaPopup } from "../../shared/popup/xem-ket-qua/xem-ket-qua.component";

@Component({
  selector: 'thong-ke-giai-dac-biet-theo-tuan',
  templateUrl: './thong-ke-giai-dac-biet-theo-tuan.component.html',
  styleUrls: ['thong-ke-giai-dac-biet-theo-tuan.component.scss']
})
export class ThongKeGiaiDacBietTheoTuanComponent implements OnInit {
  startDate = new Date(moment().subtract(1, 'months').toDate());
  endDate = new Date();
  minDate: any;
  maxDate: any;
  quantity: any;
  isLoading = false;
  listData: any[] = [];
  plugins = new Plugins();
  arrNumber = Array.from({ length: 100 }, (_, i) => i.toString().padStart(2, '0'));
  REQUEST_URL = 'api/v1/date-multi-values/quantity-values-by-date-and-numbers';
  constructor(
    private apiService: ApiServices,
    private toast: ToastService,
    private dialogService: DialogService
  ) {}
  ngOnInit(): void {
    this.getData();
  }
  getData() {
    this.isLoading = true;
    const params = {
      startDate: this.startDate ? moment(this.startDate).format('YYYYMMDD') : moment(new Date(new Date().getFullYear(), new Date().getMonth(), 1)).format('YYYYMMDD'),
      endDate: this.endDate ? moment(this.endDate).format('YYYYMMDD') : moment(new Date()).format('YYYYMMDD'),
      // numbers: this.quantity ? this.quantity.split(',') : []
      numbers: ['00', '01', '02', '03', '04']
    };
    this.apiService.postOption(this.REQUEST_URL, params, '').subscribe(
      (res: HttpResponse<any>) => {
        if (res.body.code === 200) {
          this.isLoading = false;
          const data = res.body.result.data.map((item) => ({
            ...item,
            date: this.plugins.formatDateWithType(item.date, 'YYYYMMDD', 'DD/MM/YYYY')
          }));
          // this.listData = res.body.result.data.map(item => ({
          //   ...item,
          //   date: this.plugins.formatDateWithType(item.date, 'YYYYMMDD', 'DD/MM/YYYY')
          // }))
          data.forEach((item) => {
            let dataNumber = [];
            this.arrNumber.forEach((number) => {
              const index = item.numberQuantityItemRes.findIndex((el) => el.number === number);
              if (index !== -1 && item.numberQuantityItemRes[index].quantity) {
                dataNumber.push({
                  number,
                  quantity: item.numberQuantityItemRes[index].quantity,
                  values: item.values
                });
              } else {
                dataNumber.push({
                  number,
                  quantity: '',
                  values: ''
                });
              }
            });
            this.listData.push({
              date: item.date,
              dataNumber
            });
          });
        } else {
          this.isLoading = false;
        }
      },
      () => {
        this.isLoading = false;
      }
    );
  }
  selectStartDate(event: Date) {
    this.minDate = event;
  }
  selectEndDate(event: Date) {
    this.maxDate = event;
  }
  calcSumNumber(number: string) {
    const result = this.listData.map((item) => {
      return item.dataNumber.find((el) => el.number === number);
    });
    if (result.length) {
      return result.reduce((a, b) => {
        if (b.quantity) {
          return a + b.quantity;
        } else {
          return a + 0;
        }
      }, 0);
    } else {
      return 0;
    }
  }
  viewLoto(data: any) {
    if (!data.values) return;
    const modal: DynamicDialogRef = this.dialogService.open(XemKetQuaPopup, {
      header: 'Xem kết quả cụ thể',
      width: '25%',
      modal: true,
      data: {
        data
      },
      breakpoints: {
        '960px': '75vw',
        '640px': '90vw'
      }
    });
  }
}