import { zip } from 'rxjs';

export class CustomValidator {

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

}