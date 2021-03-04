import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StatsService {

  constructor() {
  }

  /**
   * Return an array with the amount of key present in an array.
   * @param array
   * @param key
   */
  getStats(array, key: string) {
    const res = [];
    array.forEach(item => {
      if (!this[item[key]]) {
        this[item[key]] = [item[key], 0];
        res.push(this[item[key]]);
      }
      this[item[key]][1]++
    });
    return res;
  }
}
