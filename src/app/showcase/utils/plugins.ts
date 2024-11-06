import moment from 'moment';
export class Plugins {
  formatDate(date: any) {
    return date ? moment(date).format('DD/MM/YYYY - HH:mm:ss') : '';
  }
  formatDateWithType(date: any, type: any, result: any) {
    return date ? moment(date, type).format(result) : '';
  }
  calcVolume(width: number = 1, height: number = 1, length: number = 1) {
    const widthAvai = width ? width : 1;
    const heightAvai = height ? height : 1;
    const lengthAvai = length ? length : 1;
    return widthAvai * heightAvai * lengthAvai;
  }
  calculateScrollHeight(height = 0) {
    const fixedHeight = 78 + 206 + height;
    const viewportHeight = window.innerHeight;
    const calculatedHeight = viewportHeight - fixedHeight;
    return `${calculatedHeight}px`;
  }
}