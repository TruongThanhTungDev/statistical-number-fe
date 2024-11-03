import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';
import { HttpClientModule } from '@angular/common/http';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
@NgModule({
  imports: [CommonModule, FormsModule, HttpClientModule, InputTextModule, ButtonModule, ProgressSpinnerModule],
  declarations: [LoginComponent],
  exports: [LoginComponent],
  bootstrap: [LoginComponent]
})
export class LoginModule {}
