import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {HttpResponseModel} from "../models/httpResponse.model";
import {HttpResponse} from "../Enums/http-response.enum";
import {animate, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
  animations: [
   trigger('fade', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate(100, style({opacity: 1}))
      ]),
     transition('* => void', [
        style({ opacity: 1 }),
        animate(1000, style({opacity: 0}))
      ])
    ])
  ]
})
export class ToastComponent implements OnInit, OnChanges {
  @Input() status: HttpResponseModel;

  color: string;
  httpResponse = HttpResponse;
  timeout;

  constructor() {
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.status.currentValue) {
      this.autoClose();
    }
  }

  private autoClose() {
    this.timeout = setTimeout(() => {
      this.close();
    }, 5000);
  }

  close() {
    this.status = null;
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
  }

}
