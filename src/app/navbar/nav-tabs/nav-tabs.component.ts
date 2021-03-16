import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-nav-tabs',
  templateUrl: './nav-tabs.component.html',
  styleUrls: ['./nav-tabs.component.scss']
})
export class NavTabsComponent implements OnInit {
  @Input() links;
  @Input() routerlink: string;

  constructor() {
  }

  ngOnInit() {
  }

}
