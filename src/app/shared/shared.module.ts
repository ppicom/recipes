import { NgModule } from "@angular/core";
import { DropdownDirective } from "./dropdown.directive";
import { SpinnerComponent } from "./spinner/spinner.component";

@NgModule({
  declarations: [
    SpinnerComponent,
    DropdownDirective
  ],
  exports: [
    SpinnerComponent,
    DropdownDirective
  ]
})
export class SharedModule { }