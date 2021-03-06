import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators } from '@angular/forms';
import { from } from 'rxjs';
import { DataService } from '../data.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-emi-calculator',
  templateUrl: './emi-calculator.component.html',
  styleUrls: ['./emi-calculator.component.scss']
})
export class EmiCalculatorComponent implements OnInit {

  rForm: FormGroup;
  formData: any;
  loanAmount: number;
  loanTenure: number;
  interestRate = 30;
  emi = null;

  constructor(private fb: FormBuilder, private dataService: DataService, private router: Router) {
    this.rForm = fb.group({
      'loanAmount': [null, Validators.required],
      'loanTenure': [null, Validators.required],
      'tenureType': ['Month', Validators.required]
    });
  }

  ngOnInit() {

    // calculated EMI with updated loan tenure
    this.getLoanTenure().valueChanges.subscribe( val => {
      this.calculateEmi();
    });

    // calculated EMI with updated loan amount
    this.getLoanAmount().valueChanges.subscribe( val => {
      this.calculateEmi();
    });
    
    // logic for converting loan tenure in month and year
    this.getTenureType().valueChanges.subscribe( val => {
      
      if (val === 'Year') {
        this.rForm.patchValue({
          loanTenure: this.getLoanTenure().value/12,
        });
      } else {
        this.rForm.patchValue({
          loanTenure: this.getLoanTenure().value*12,
        });
      }
    });
  }

  /**
   * Calculating EMI using formula:
   * EMI = [P * R * (1 + R)^N] / [(1 + R)^N - 1]
   * P = Principle
   * R = Rate Of Interest
   * N = Loan Tenure
   * 
   * numerator = [P * R * (1 + R)^N]
   * denominator = [(1 + R)^N - 1]
   */
  calculateEmi() {

    const rate = this.interestRate / (12 * 100);
    let term;
    if (this.getTenureType().value === 'Year') {
      term = this.getLoanTenure().value * 12;
    } else {
      term = this.getLoanTenure().value;
    }
    const numerator = this.getLoanAmount().value * rate * Math.pow((1 + rate), term);
    const denominator = Math.pow((1 + rate), term) - 1;

    this.emi = numerator/denominator;
  }

  /**
   * On clicking Apply button, move to Customer Details page with data(Used Service for passing data)
   */
  applyForLoan() {
    const data = {
      loanAmount: this.getLoanAmount(),
      loanTenure: this.getLoanTenure()
    }
    this.dataService.sendCalculatedEmiData(data);
    this.router.navigate(['/customer-details']);
  }



  /** Getters */
  getLoanAmount() {
    return this.rForm.get('loanAmount');
  }

  getLoanTenure() {
    return this.rForm.get('loanTenure');
  }

  getTenureType() {
    return this.rForm.get('tenureType');
  }

}
