import { AbstractControl} from "@angular/forms";
import { isError } from 'util';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

export function valusrname(controls : AbstractControl)
{

    if(controls && (controls.value !== null || controls.value !== undefined || controls.value !== ""))
    {
        const regex = new RegExp('^[ \t\n]*$');
        if(regex.test(controls.value))
        {
            
            return{
                
                isError:true
            }
        }
    }

   return null;
}