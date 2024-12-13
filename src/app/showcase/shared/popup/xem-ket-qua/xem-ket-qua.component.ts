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
    }
  }
}