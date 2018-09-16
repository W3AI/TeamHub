import { PipeTransform, Pipe } from "@angular/core";

import { NewVentureComponent } from "./new-venture/new-venture.component";

// Pipe Template to apply on Context & Entity strings
// Should also make updates to Contexts & Transformation Classes 
// ToDo: Create Contexts & Transformation Classes <<<---------<<<< !!!

let newContext = '';

@Pipe({
    name: 'shorten'
})
export class ShortenPipe implements PipeTransform {

    transform(value: any, param1: number) {

        
        // conditional - if condition => apply transformation
        if ( (value != undefined ) && (value.length > param1) ) {

            // update conttext string
            newContext = value.substr(0, param1) + ' ...';
 
            // NewVentureComponent.contexts = newContext + ' cool stuff';
            // contexts += value;
            // console.log(contexts);

            // apply transformation and return
            return newContext;
        }
        return value;

    }

}