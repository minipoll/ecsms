import { NgModule } from '@angular/core';

import { HiddenDirective } from './hidden.directive';

@NgModule({
    declarations: [
        HiddenDirective
    ],
    exports: [
        HiddenDirective
    ]
})
export class SharedModule{}
