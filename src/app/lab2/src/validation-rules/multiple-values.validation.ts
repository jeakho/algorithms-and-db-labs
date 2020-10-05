import { AbstractControl, ValidatorFn } from '@angular/forms';


export function nodeValuesValidator(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
        const allowed = /^[-\d, ]*$/.test(control.value);
        return !allowed ? {invalidNodeValuesInput: {value: control.value}} : null;
    };
}