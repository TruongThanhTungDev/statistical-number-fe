import { Component, OnInit } from "@angular/core";
import { Plugins } from "../../utils/plugins";
import { ApiServices } from "@layout/api.services";
import { HttpResponse } from "@angular/common/http";
import moment from "moment";

@Component({
  selector: 'statistic-component',
  templateUrl: './statistic.component.html',
  styleUrls: ['statistic.component.scss']
})
export class StatisticComponent implements OnInit{
  startDate: any
  endDate: any
  quantity: any
  listData: any[]
  plugins = new Plugins()
  REQUEST_URL = 'api/v1/search'
  constructor(
    private apiService: ApiServices
  ) {}
  ngOnInit(): void {
    this.getAllData()
  }
  getAllData() {
    const params = {
      page: 0,
      size: 100000,
      filter: 'id>0',
      sort: ['id', 'asc']
    }
    this.apiService.getOption(this.REQUEST_URL, params, '').subscribe(
      (res: HttpResponse<any>) => {
        if(res.body.code === 200) {
          if(res.body.result.content.length) {
            this.listData = res.body.result.content.map((item: any) => ({
              ...item,
              date: this.plugins.formatDateWithType(item.date, 'YYYYMMDD', 'DD/MM/YYYY'),
              isHighlight: false
            }))
          } else {
            this.listData = []
          }
        }
      }
    )
  }
  searchStatistic() {
    const params = {
      page: 0,
      size: 100000,
      filter: this.filter(),
      sort: ['id', 'asc']
    }
    this.apiService.getOption(this.REQUEST_URL, params, '').subscribe(
      (res: HttpResponse<any>) => {
        if(res.body.code === 200) {
          if(res.body.result.content.length) {
            this.listData = this.listData.map(item => ({
              ...item,
              isHighlight: false
            }))
            const data = res.body.result.content
            data.forEach(ele => {
              const index = this.listData.findIndex(a => ele.date === +moment(a.date, 'DD/MM/YYYY').format('YYYYMMDD') && a.value == ele.value)
              if(index > -1) {
                this.listData[index].isHighlight = false
              } else {
                this.listData[index].isHighlight = true
                console.log(this.listData[index])
              }
            })
          }
        }
      }
    )
  }
  filter() {
    const arr = []
    arr.push('id>0')
    if(this.quantity) arr.push(`value==${this.quantity}`)
    if(this.startDate) arr.push(`date>=${+moment(this.startDate).format('YYYYMMDD')}`)
    if(this.endDate) arr.push(`date<=${+moment(this.endDate).format('YYYYMMDD')}`)
    return arr.join(';')
  }
}