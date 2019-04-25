import { PipeTransform, Pipe } from '@angular/core';
import { userSchema } from '../models/app.usrshema.model';
@Pipe({
    name: 'usrsrch'
})
export class PipeFilter implements PipeTransform {
    transform(userdta: userSchema[], searchpipe: string) {
        if (!userdta || !searchpipe) {
            return userdta;
        }
        return userdta.filter(userSchema => userSchema.FullName.FirstName.toLocaleLowerCase().indexOf(searchpipe.toLocaleLowerCase()) !== -1);
    }
}
