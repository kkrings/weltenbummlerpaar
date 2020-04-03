/**
 * Image directive
 * @packageDocumentation
 */

import {
  Directive, OnInit, Input, ElementRef, Renderer2
} from '@angular/core';

import { Image } from './image.model';
import { ImageService } from './image.service';


/**
 * Image directive
 *
 * This attribute directive can be used to set the 'src' 'alt', and 'href'
 * properties of an HTML element given an image object. The 'src' and 'href'
 * properties will be set to the image's URL; the 'alt' property will be set to
 * the image's filename.
 */
@Directive({
  selector: '[appImage]'
})
export class ImageDirective implements OnInit {
  /**
   * Image object
   */
  @Input('appImage') image: Image;

  /**
   * Construct the image directive.
   *
   * @param renderer
   *   Used to set the 'src', 'alt', and 'href' properties.
   * @param element
   *   Holds a reference to the HTML element this attribute directive is
   *   applied to.
   */
  constructor(
      private renderer: Renderer2,
      private element: ElementRef) { }

  /**
   * Initialize the image directive.
   *
   * Set the 'src', 'alt', and 'href' properties of the HTML element this
   * attribute directive is applied to.
   */
  ngOnInit(): void {
    this.renderer.setProperty(
        this.element.nativeElement, 'src',
        ImageService.getImageUrl(this.image));

    this.renderer.setProperty(
        this.element.nativeElement, 'alt', `${this.image._id}.jpg`);

    this.renderer.setProperty(
        this.element.nativeElement, 'href',
        ImageService.getImageUrl(this.image));
  }
}
