import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private calculatedEmiSource: any;
  
  constructor() { }

  sendCalculatedEmiData(emi: any) {
    this.calculatedEmiSource = emi;
  }

  getCalculatedEmiData(): any {
    return this.calculatedEmiSource;
  }
}
