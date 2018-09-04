import { PipeTransform, Pipe } from "@angular/core";

// Pipe Template to apply on Context & Entity strings

let newContext = '';

@Pipe({
    name: 'shorten'
})
export class ShortenPipe implements PipeTransform {

    transform(contextString: any, param1: number) {

        
        // conditional - if condition => apply transformation
        if (contextString.length > param1) {

            // update conttext string
            newContext = contextString.substr(0, param1) + ' ...';

            // apply transformation and return
            return newContext;
        }
        return contextString;

    }

}