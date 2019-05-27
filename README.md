# LoanApplication

An EMI calculator application created with the help of reactive forms.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.3.9.

## Building the project
1. Replace the password in `customer-details.component.ts` with one provided in mail.
2. Do an npm install
3. Run `ng serve -o` for a dev server. Navigate to `http://localhost:4200/`.

## Complete Flow
1. Created the project using the below command:
`ng new ApplicationName --style=scss --routing`

2. For creating components:
`ng g c EmiCalculator/CustomerDetails`

3. For Service(Used to pass data from one component to another)
`ng g s Data`

## Validations
1. Basic required and valid email id validation added.
2. Mobile Number(Indian) and PAN Number validation added using regex.




