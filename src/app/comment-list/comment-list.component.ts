import {Component, Input, OnInit} from '@angular/core';
import {CommentModel} from "../models/comment.model";

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss']
})
export class CommentListComponent implements OnInit {
  @Input() comments: CommentModel[];
  @Input() order = 'newest';

  constructor() {
  }

  ngOnInit() {
  }

}
