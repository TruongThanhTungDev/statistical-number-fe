import { Component, Input, OnInit } from "@angular/core";
import { DynamicDialogConfig } from "primeng/dynamicdialog";

@Component({
  selector: 'xem-ket-qua',
  templateUrl: './xem-ket-qua.component.html'
})
export class XemKetQuaPopup implements OnInit {
  data: any
  listLoto: any[] = [];
  giaiDacBiet: any;
  giaiNhat: any;
  giaiNhi: any;
  giaiBa: any;
  giaiTu: any;
  giaiNam: any;
  giaiSau: any;
  giaiBay: any;
  dau0: any
  dau1: any
  dau2: any
  dau3: any
  dau4: any
  dau5: any
  dau6: any
  dau7: any
  dau8: any
  dau9: any
  constructor(public config: DynamicDialogConfig) {}
  ngOnInit(): void {
    this.data = this.config.data.data
    if (this.data) {
      this.listLoto = this.data.values.split(",")
      this.giaiDacBiet = this.listLoto.slice(0, 1)
      this.giaiNhat = this.listLoto.slice(1, 2)
      this.giaiNhi = this.listLoto.slice(2, 4)
      this.giaiBa = this.listLoto.slice(4, 10)
      this.giaiTu = this.listLoto.slice(10, 14)
      this.giaiNam = this.listLoto.slice(14, 20)
      this.giaiSau = this.listLoto.slice(20, 23)
      this.giaiBay = this.listLoto.slice(23, 27)
      const dataSplit: any[] = this.listLoto.map((item) => item.slice(item.length - 2, item.length));
      this.dau0 = dataSplit.filter(item => item.startsWith('0')).join("; ")
      this.dau1 = dataSplit.filter((item) => item.startsWith('1')).join('; ');
      this.dau2 = dataSplit.filter((item) => item.startsWith('2')).join('; ');
      this.dau3 = dataSplit.filter((item) => item.startsWith('3')).join('; ');
      this.dau4 = dataSplit.filter((item) => item.startsWith('4')).join('; ');
      this.dau5 = dataSplit.filter((item) => item.startsWith('5')).join('; ');
      this.dau6 = dataSplit.filter((item) => item.startsWith('6')).join('; ');
      this.dau7 = dataSplit.filter((item) => item.startsWith('7')).join('; ');
      this.dau8 = dataSplit.filter((item) => item.startsWith('8')).join('; ');
      this.dau9 = dataSplit.filter((item) => item.startsWith('9')).join('; ');
    }
  }
}