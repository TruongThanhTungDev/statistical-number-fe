import { Injectable } from "@angular/core";
import { MessageService } from "primeng/api";

@Injectable({ providedIn: 'root' })
export class ToastService {
  constructor(private messageService: MessageService) {}

  success(message: string) {
    this.messageService.add({
      severity: 'success',
      summary: 'Thành công',
      detail: message
    });
  }
  info(message: string) {
    this.messageService.add({ severity: 'info', summary: 'Thông báo', detail: message, });
  }
  warning(message: string) {
    this.messageService.add({ severity: 'warn', summary: 'Cảnh báo', detail: message });
  }
  error(message: string) {
    this.messageService.add({ severity: 'error', summary: 'Lỗi', detail: message });
  }
}