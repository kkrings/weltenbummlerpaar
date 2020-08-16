import {
  Directive, ElementRef, forwardRef, HostListener, Renderer2
} from '@angular/core';

import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';


@Directive({
  // tslint:disable-next-line:directive-selector
  selector: 'input[type=file]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FileValueAccessorDirective),
      multi: true
    }
  ]
})
export class FileValueAccessorDirective implements ControlValueAccessor {

  @HostListener('change', ['$event.target.files'])
  onChange: (_: any) => void;

  @HostListener('blur')
  onTouched: () => void;

  constructor(
    private renderer: Renderer2,
    private element: ElementRef) { }

  writeValue(value: any): void {
    this.renderer.setProperty(this.element.nativeElement, 'value', value);
  }

  registerOnChange(fn: (_: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
}
