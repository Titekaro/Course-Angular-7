import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-bar-rating',
  templateUrl: './bar-rating.component.html',
  styleUrls: ['./bar-rating.component.scss']
})
export class BarRatingComponent implements OnInit, OnChanges {
  @Input() score: number;
  @Input() color: string;
  @Input() isRating = false;
  @Output() rating = new EventEmitter<number>();

  iconDirectoryUrl = 'assets/icons/';
  filledStars: any[];
  emptyStars: any[];
  starsMax = 5;
  selectedScore = false;

  constructor() {
  }

  ngOnInit() {
    if (!this.score) {
      this.emptyStars = Array(this.starsMax);
      return;
    }
    this.getStars(this.score);
  }

  ngOnChanges(changes: SimpleChanges) {
    if(!changes.score.currentValue) {
      this.removeActiveStars();
    }
  }

  private getStars(score: number) {
    this.filledStars = Array(score);
    if (score < this.starsMax) {
      this.emptyStars = Array(this.starsMax - score);
    }
  }

  private onRate(rating: number) {
    this.selectedScore = true;
    this.score = rating + 1;
    this.rating.emit(this.score);
  }

  private highlightStars(index: number) {
    if (this.score) {
      this.selectedScore = false;
      this.removeActiveStars();
    }
    this.getActiveStars(index);
  }

  private resetStars() {
    if (this.selectedScore && this.score) {
      return;
    }
    this.removeActiveStars();
    if (this.score) {
      this.highlightStars(this.score - 1);
    }
  }

  private getActiveStars(index: number) {
    const stars = Array.from(document.getElementsByClassName('icon-star'));
    stars.forEach((star, i) => {
      if (i < index + 1) {
        star.classList.add('active');
      }
    });
  }

  private removeActiveStars() {
    const stars = Array.from(document.getElementsByClassName('icon-star active'));
    stars.forEach(star => {
      star.classList.remove('active');
    });
  }

}
