import { Directive } from '@angular/core';
import { NG_VALIDATORS, AbstractControl, Validator } from '@angular/forms';

@Directive({
  selector: '[appPassMatch]',
  providers: [{provide: NG_VALIDATORS,
               useExisting: PassMatchDirective,
               multi: true}]
})
export class PassMatchDirective implements Validator {

  validate(c: AbstractControl): {[key: string]: any} | null {
    // console.log(c.errors);
    let val = c.value;
    let pass = c.root.get("password").value;
    if (val != pass) {
      return {passMatch: "Passwords must match!"};
    }
    return null;
  }

}
