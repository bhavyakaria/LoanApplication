import { zip } from 'rxjs';

export class CustomValidator {

   /**
    * Contains regex for checking valid PAN Number
    * 
    * @param panNumber 
    */
   static panNumberValidator(panNumber): any {
      if (panNumber.pristine) {
         return null;
      }

      const PAN_NUMBER_REGEX = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/;
      panNumber.markAsTouched();
      if(PAN_NUMBER_REGEX.test(panNumber.value)) {
         return null;
      }
      return {
         invalidPanNumber: true
      }
   }

   /**
    * Contains regex for checking valid Mobile Number
    * 
    * @param mobileNumber 
    */
   static mobileNumberValidator(mobileNumber): any {
      if (mobileNumber.pristine) {
         return null;
      }

      const MOBILE_NUMBER_REGEX = /^[6-9]\d{9}$/;
      mobileNumber.markAsTouched();
      if(MOBILE_NUMBER_REGEX.test(mobileNumber.value)) {
         return null;
      }
      return {
         invalidMobileNumber: true
      }
   }

}