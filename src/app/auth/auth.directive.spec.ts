/**
 * Unit tests for admin mode directive
 * @packageDocumentation
 */

import { Component } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { AuthDirective } from './auth.directive';
import { AuthService } from './auth.service';


/**
 * Dummy authentication component
 */
@Component({
  template: '<div appAuth></div>'
})
class AuthComponent {}


describe('AuthDirective', () => {
  it('should hide element if no admin user is logged in', async(() => {
    // no admin user is logged in
    const mockAuthService: Partial<AuthService> = {
      isLoggedIn: false
    };

    TestBed.configureTestingModule({
      declarations: [
        AuthComponent,
        AuthDirective
      ],
      providers: [
        {provide: AuthService, useValue: mockAuthService}
      ]
    }).compileComponents();

    const fixture = TestBed.createComponent(AuthComponent);
    fixture.detectChanges();

    const div = fixture.debugElement.query(By.css('div'));
    expect(div.nativeElement.classList).toContain('d-none');
  }));

  it('should show element if admin user is logged in', async(() => {
    // admin user is logged in
    const mockAuthService: Partial<AuthService> = {
      isLoggedIn: true
    };

    TestBed.configureTestingModule({
      declarations: [
        AuthComponent,
        AuthDirective
      ],
      providers: [
        {provide: AuthService, useValue: mockAuthService}
      ]
    }).compileComponents();

    const fixture = TestBed.createComponent(AuthComponent);
    fixture.detectChanges();

    const div = fixture.debugElement.query(By.css('div'));
    expect(div.nativeElement.classList).not.toContain('d-none');
  }));
});
