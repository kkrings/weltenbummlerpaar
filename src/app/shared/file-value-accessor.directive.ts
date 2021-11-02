/**
 * File value accessor directive
 * @packageDocumentation
 */

import {
  Directive,
  ElementRef,
  forwardRef,
  HostListener,
  Renderer2,
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

/**
 * File value accessor directive
 *
 * This directive implements the form control value accessor interface and
 * allows to access the file list of an input tag of type 'file'.
 */
@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: 'input[type=file]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FileValueAccessorDirective),
      multi: true,
    },
  ],
})
export class FileValueAccessorDirective implements ControlValueAccessor {
  /**
   * Construct the file accessor directive.
   *
   * @param renderer
   *   Used to set element's value attribute.
   * @param element
   *   Holds a reference to the input tag of type 'file'.
   */
  constructor(private renderer: Renderer2, private element: ElementRef) {}

  /**
   * Holds a reference to the function that should be called when an event of
   * type 'change' occurs. The file list is passed as an argument to this
   * function.
   */
  @HostListener('change', ['$event.target.files'])
  onChange = (_: FileList): void => {};

  /**
   * Holds a reference to the function that should be called when an event of
   * type 'blur' occurs.
   */
  @HostListener('blur')
  onTouched = () => {};

  /**
   * Write the given value to the input tag.
   *
   * @param value
   *   A new value for the input's value attribute
   */
  writeValue(value: string): void {
    this.renderer.setProperty(this.element.nativeElement, 'value', value);
  }

  /**
   * Register the on-change callback function.
   *
   * @param fn
   *   The callback function that is assigned to 'onChange' property.
   */
  registerOnChange(fn: (_: FileList) => void): void {
    this.onChange = fn;
  }

  /**
   * Register the on-touched callback function.
   *
   * @param fn
   *   The callback function that is assigned to 'onTouched' property.
   */
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
}
