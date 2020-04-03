/**
 * Authentication directive
 * @packageDocumentation
 */

import { Directive, DoCheck, ElementRef, Renderer2 } from '@angular/core';

import { AuthService } from './auth.service';


/**
 * Authentication directive
 *
 * This attribute directive can be used to show or hide a HTML element
 * depending on if an admin user is logged in or not, respectively.
 */
@Directive({
  selector: '[appAuth]'
})
export class AuthDirective implements DoCheck {
  /**
   * Construct the authentication directive.
   *
   * @param renderer
   *   Used to add or remove 'd-none' class to or from `element`, respectively.
   * @param element
   *   Holds a reference to the HTML element this attribute directive is
   *   applied to.
   * @param authService
   *   Service for checking if an admin user is logged in
   */
  constructor(
    private renderer: Renderer2,
    private element: ElementRef,
    private authService: AuthService
  ) {
    // do not show element by default
    this.renderer.addClass(this.element.nativeElement, 'd-none');
  }

  /**
   * In each life cycle, check if an admin user is logged in. If an admin user
   * is logged in, show the HTML element this attribute is applied to,
   * otherwise hide it.
   */
  ngDoCheck(): void {
    if (this.authService.isLoggedIn) {
      this.renderer.removeClass(this.element.nativeElement, 'd-none');
    } else {
      this.renderer.addClass(this.element.nativeElement, 'd-none');
    }
  }
}
