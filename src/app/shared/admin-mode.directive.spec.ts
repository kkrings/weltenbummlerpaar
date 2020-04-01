/**
 * Unit tests for admin mode directive
 * @packageDocumentation
 */

import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { async, TestBed } from '@angular/core/testing';

import { AdminModeDirective } from './admin-mode.directive';
import { AuthService } from './auth.service';


/**
 * Dummy admin mode component
 */
@Component({
  template: '<div appAdminMode>Dummy admin mode component</div>'
})
class AdminModeComponent {}


describe('AdminModeDirective', () => {
  it('should hide element if no admin user is logged in', async(() => {
    // no admin user is logged in
    const mockAuthService: Partial<AuthService> = {
      isLoggedIn: false
    };

    TestBed.configureTestingModule({
      declarations: [
        AdminModeComponent,
        AdminModeDirective
      ],
      providers: [
        {provide: AuthService, useValue: mockAuthService}
      ]
    }).compileComponents();

    const fixture = TestBed.createComponent(AdminModeComponent);
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
        AdminModeComponent,
        AdminModeDirective
      ],
      providers: [
        {provide: AuthService, useValue: mockAuthService}
      ]
    }).compileComponents();

    const fixture = TestBed.createComponent(AdminModeComponent);
    fixture.detectChanges();

    const div = fixture.debugElement.query(By.css('div'));
    expect(div.nativeElement.classList).not.toContain('d-none');
  }));
});
