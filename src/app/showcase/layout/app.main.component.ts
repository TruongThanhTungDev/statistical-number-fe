import { ViewportRuler } from '@angular/cdk/scrolling';
import { Component, CUSTOM_ELEMENTS_SCHEMA, HostListener, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './app.main.component.html',
  styleUrls: ['app.main.component.scss']
})
export class AppMainComponent implements OnInit{
  screenWidth: number;

  constructor(private viewportRuler: ViewportRuler) {}

  ngOnInit(): void {
    this.screenWidth = this.viewportRuler.getViewportSize().width;

    // Subscribe to viewport change
    this.viewportRuler.change().subscribe(() => {
      this.screenWidth = this.viewportRuler.getViewportSize().width;
    });
  }
}
