import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
} from '@angular/core';

@Directive({
  selector: '[appDropdown]',
})
export class DropdownDirective {
  @HostBinding('class.open') open: boolean = false;

  @HostListener('document:click', ['$event']) onClick(event: Event) {
    this.open = this.elementRef.nativeElement.contains(event.target)
      ? !this.open
      : false;
  }

  constructor(private elementRef: ElementRef) {}
}
