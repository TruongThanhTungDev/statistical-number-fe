import { Component } from "@angular/core";
import { DialogService, DynamicDialogRef } from "primeng/dynamicdialog";
import { XemKetQuaPopup } from "../../shared/popup/xem-ket-qua/xem-ket-qua.component";
import moment from "moment";
import { ApiServices } from "@layout/api.services";
import { ToastService } from "../../utils/toast.service";
import { HttpResponse } from "@angular/common/http";
import { Plugins } from "../../utils/plugins";

interface Item {
  date: number;
  dataNumber: any[];
  isNewYear: boolean
}
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
  isCouple = true;
  isLoading = false;
  isShowSearch = false;
  isShowChoiceNumber = false;
  listData: any[] = [];
  listData1: any[] = []
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
      this.arrNumberSelected = [];
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
    this.listData1 = []
    this.apiService.postOption(this.REQUEST_URL, params, '').subscribe(
      (res: HttpResponse<any>) => {
        if (res.body.code === 200) {
          this.isLoading = false;
          if (!this.isCouple) {
            const data1 = res.body.result.data.map(item => ({
              ...item,
              date: this.plugins.formatDateWithType(item.date, 'YYYYMMDD', 'DD/MM/YYYY')
            }))
            data1.forEach((item) => {
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
              this.listData1.push({
                date: item.date,
                dataNumber
              });
            });
          } else {
            const data = res.body.result.data
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
                dataNumber,
                isNewYear: item.values ? false : true
              });
            });
            this.listData = this.formatDateByWeek(this.listData);
          }
          // this.listData = res.body.result.data.map(item => ({
          //   ...item,
          //   date: this.plugins.formatDateWithType(item.date, 'YYYYMMDD', 'DD/MM/YYYY')
          // }))
        } else {
          this.isLoading = false;
        }
      },
      () => {
        this.isLoading = false;
      }
    );
  }
  formatDateByWeek(data: any[]) {
    if (!data.length) return;
    let grouped: any = {};
    data.forEach((item) => {
      const dateStr = item.date.toString();
      const year = parseInt(dateStr.substring(0, 4), 10);
      const month = parseInt(dateStr.substring(4, 6), 10) - 1;
      const day = parseInt(dateStr.substring(6, 8), 10) - 1;
      const date = new Date(year, month, day);
      const firstDayOfYear = new Date(year, 0, 1);
      const weekNumber = Math.floor((+date - +firstDayOfYear + firstDayOfYear.getDay() * 86400000) / (7 * 86400000));
      if (!grouped[year]) {
        grouped[year] = {};
      }
      if (!grouped[year][weekNumber]) {
        grouped[year][weekNumber] = [item];
      } else {
        grouped[year][weekNumber].push(item);
      }
    });
    Object.keys(grouped).forEach((year) => {
      const weeks = grouped[parseInt(year)];
      Object.keys(weeks).forEach((weekNumber) => {
        const weekDays: Item[] = weeks[parseInt(weekNumber)];
        const date = new Date(moment(weekDays[0].date.toString(), 'YYYYMMDD').format('YYYY-MM-DD'));
        const dayOfWeek = date.getDay();
        const diff = date.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
        const firstDayOfWeek = new Date(date.setDate(diff));

        for (let i = 0; i < 7; i++) {
          const dayOfWeek = new Date(firstDayOfWeek);
          dayOfWeek.setDate(firstDayOfWeek.getDate() + i);
          const formattedDate = dayOfWeek.toISOString().slice(0, 10).replace(/-/g, '');

          if (weekDays.length !== 7) {
            if (!weekDays.some((item) => item.date.toString() === formattedDate)) {
              weekDays.push({
                date: +formattedDate,
                dataNumber: [],
                isNewYear: false
              });
            }
          }
        }
        weekDays.sort((a, b) => a.date - b.date);
      });
    });
    const mapData = Object.values(grouped).map((item) => Object.values(item).map((el) => el));
    let resultData = [];
    mapData.forEach((item) => {
      item.forEach((el) => {
        resultData.push(el);
      });
    });
    return resultData;
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
      this.arrNumberSelected = [];
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