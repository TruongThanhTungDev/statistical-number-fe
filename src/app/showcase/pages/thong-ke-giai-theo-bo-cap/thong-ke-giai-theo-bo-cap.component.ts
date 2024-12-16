import { Component } from "@angular/core";
import { DialogService, DynamicDialogRef } from "primeng/dynamicdialog";
import { XemKetQuaPopup } from "../../shared/popup/xem-ket-qua/xem-ket-qua.component";
import moment from "moment";
import { ApiServices } from "@layout/api.services";
import { ToastService } from "../../utils/toast.service";
import { HttpResponse } from "@angular/common/http";
import { Plugins } from "../../utils/plugins";

@Component({
  selector: 'thong-ke-giai-theo-bo-cap',
  templateUrl: './thong-ke-giai-theo-bo-cap.component.html',
  styleUrls: ['thong-ke-giai-theo-bo-cap.component.scss']
})
export class ThongKeGiaiTheoBoCapComponent {
  startDate = new Date(moment().subtract(1, 'months').toDate());
  endDate = new Date();
  minDate: any;
  maxDate: any;
  quantity: any;
  isHead = false;
  isCouple = false;
  isLoading = false;
  isShowSearch = false;
  isShowChoiceNumber = false;
  listData: any[] = [];
  plugins = new Plugins();
  arrNumberSingle = Array.from({ length: 100 }, (_, i) => i.toString().padStart(2, '0'));
  arrNumber = [
    '00-55',
    '01-10',
    '02-20',
    '03-30',
    '04-40',
    '05-50',
    '06-60',
    '07-70',
    '08-80',
    '09-90',
    '11-66',
    '12-21',
    '13-31',
    '14-41',
    '15-51',
    '16-61',
    '17-71',
    '18-81',
    '19-91',
    '22-77',
    '23-32',
    '24-42',
    '25-52',
    '26-62',
    '27-72',
    '28-82',
    '29-92',
    '33-88',
    '34-43',
    '35-53',
    '36-63',
    '37-73',
    '38-83',
    '39-93',
    '44-99',
    '45-54',
    '46-64',
    '47-74',
    '48-84',
    '49-94',
    '56-65',
    '57-75',
    '58-85',
    '59-95',
    '67-76',
    '68-86',
    '69-96',
    '78-87',
    '79-97',
    '89-98'
  ];
  arrNumberSelected: any[] = [];
  arrNumber1 = ['00-55', '01-10', '02-20', '03-30', '04-40', '05-50', '06-60', '07-70', '08-80', '09-90'];
  arrNumber2 = ['11-66', '12-21', '13-31', '14-41', '15-51', '16-61', '17-71', '18-81', '19-91', '22-77'];
  arrNumber3 = ['23-32', '24-42', '25-52', '26-62', '27-72', '28-82', '29-92', '33-88', '34-43', '35-53'];
  arrNumber4 = ['36-63', '37-73', '38-83', '39-93', '44-99', '45-54', '46-64', '47-74', '48-84', '49-94'];
  arrNumber5 = ['56-65', '57-75', '58-85', '59-95', '67-76', '68-86', '69-96', '78-87', '79-97', '89-98'];
  arrNumber6 = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  REQUEST_URL = 'api/v1/date-multi-values/quantity-values-by-date-and-numbers';
  constructor(
    private apiService: ApiServices,
    private toast: ToastService,
    private dialogService: DialogService
  ) {}
  ngOnInit(): void {
    if (this.isCouple) {
      this.arrNumberSelected = [...this.arrNumber];
    } else {
      this.arrNumberSelected = [...this.arrNumberSingle];
    }
    this.getData();
  }
  getData() {
    if (this.quantity && this.quantity.split(',').some((item) => !item.includes('-'))) {
      this.toast.warning('Các số nhập vào phải theo cặp!');
      return;
    }
    this.isLoading = true;
    const params = {
      startDate: this.startDate ? moment(this.startDate).format('YYYYMMDD') : moment(new Date(new Date().getFullYear(), new Date().getMonth(), 1)).format('YYYYMMDD'),
      endDate: this.endDate ? moment(this.endDate).format('YYYYMMDD') : moment(new Date()).format('YYYYMMDD'),
      numbers: this.arrNumberSelected,
      head: this.isHead ? 1 : 0
      // numbers: ['00', '01', '02', '03', '04']
    };
    this.listData = [];
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
            this.arrNumberSelected.forEach((number) => {
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
              date: this.getDayOfWeek(item.date) + '\n' +item.date,
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
    const result = this.listData.filter((item) => {
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
    if (data && !data.length && !data.values) return;
    const modal: DynamicDialogRef = this.dialogService.open(XemKetQuaPopup, {
      header: 'Xem kết quả cụ thể',
      width: '50%',
      modal: true,
      data: {
        data,
        isHead: this.isHead
      },
      breakpoints: {
        '960px': '75vw',
        '640px': '90vw'
      }
    });
  }
  selectedNumber(number) {
    this.arrNumberSelected = this.arrNumber.filter((item) => item.includes(number));
    this.getData();
  }
  selectNumberAll() {
    this.arrNumberSelected = [...this.arrNumber];
    this.getData();
  }
  unSelectNumber() {
    this.arrNumberSelected = [];
  }
  changeTypeView(event: any) {
    if (event.checked) {
      this.arrNumberSelected = [...this.arrNumber];
    } else {
      this.arrNumberSelected = [...this.arrNumberSingle];
    }
    this.getData();
  }
  getDayOfWeek(dateString) {
    const daysOfWeek = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
    const date = new Date(this.plugins.formatDateWithType(dateString, 'DD/MM/YYYY', 'YYYY-MM-DD'));
    const dayIndex = date.getDay();
    return daysOfWeek[dayIndex];
  }
}