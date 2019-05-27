import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators } from '@angular/forms';
import { from } from 'rxjs';
import { DataService } from '../data.service';
import { CustomValidator } from '../Validations';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.scss']
})
export class CustomerDetailComponent implements OnInit {

  cusForm: FormGroup;
  customerName: string;
  customerMobileNumber: number;
  customerPanNumber: string;
  customerEmailId: string;
  customerSalary: number;
  customerAddress: string;
  loanAmount: number;
  loanTenure: number;
  submitted = false;

  constructor(private fb: FormBuilder, private dataService: DataService) {
    this.cusForm = fb.group({
      'customerName': [null, Validators.required],
      'customerMobileNumber': [null, [Validators.required, Validators.minLength(10)]],
      'customerPanNumber': [null, [Validators.required, CustomValidator.panNumberValidator]],
      'customerEmailId': [null, [Validators.required, Validators.email]],
      'customerSalary': [null, Validators.required],
      'customerAddress': [null, Validators.required],
      'loanAmount': [null, Validators.required],
      'loanTenure': [null, Validators.required],
      'tenureType': ['Month', Validators.required]
    });
  }

  ngOnInit() {

    const emiData = this.dataService.getCalculatedEmiData();
    if (emiData != null) {
      this.cusForm.patchValue({
        loanAmount: emiData['loanAmount'].value,
        loanTenure: emiData['loanTenure'].value
      });
    }

    
    this.getTenureType().valueChanges.subscribe( val => {
      
      if (val === 'Year') {
        this.cusForm.patchValue({
          loanTenure: this.getLoanTenure().value/12,
        });
      } else {
        this.cusForm.patchValue({
          loanTenure: this.getLoanTenure().value*12,
        });
      }
    });
  }

  /**
   * Sending form data to the provided email address
   * 
   * @param data 
   */
  submitLoanApplication(data) {
    
    const emailJS = window['Email'];
    emailJS.send({
      Host : "smtp.elasticemail.com",
      Username : "themugglebornpotter@gmail.com",
      Password : "INSERT_PASSWORD_HERE",
      To : data['customerEmailId'],
      From : "themugglebornpotter@gmail.com",
      Subject : "Your Loan Application Data",
      Body : data
  }).then(
    message => {
      this.submitted = true;
    });
  }

  /** Getters */
  // convenience getter for easy access to form fields
  get f() { return this.cusForm.controls; }

  getCustomerName() {
    return this.cusForm.get('customerName');
  }

  getCustomerMobileNumber() {
    return this.cusForm.get('customerMobileNumber');
  }

  getCustomerPanNumber() {
    return this.cusForm.get('customerPanNumber');
  }

  getCustomerEmailId() {
    return this.cusForm.get('customerEmailId');
  }

  getCustomerSalary() {
    return this.cusForm.get('customerSalary');
  }

  getCustomerAddress() {
    return this.cusForm.get('customerAddress');
  }

  getLoanAmount() {
    return this.cusForm.get('loanAmount');
  }

  getLoanTenure() {
    return this.cusForm.get('loanTenure');
  }

  getTenureType() {
    return this.cusForm.get('tenureType');
  }

}
