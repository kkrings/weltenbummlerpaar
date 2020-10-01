/**
 * Unit tests for authentication modal component
 * @packageDocumentation
 */

import {
  ComponentFixture, TestBed, waitForAsync
} from '@angular/core/testing';

import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { NgbAlertModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { AuthModalComponent } from './auth-modal.component';
import { AuthService } from '../auth.service';

import {
  MockNgbActiveModal, asyncData, asyncError
} from '../../shared/test-utils';


describe('AuthModalComponent', () => {
  let component: AuthModalComponent;
  let fixture: ComponentFixture<AuthModalComponent>;

  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['login']);

    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        NgbAlertModule
      ],
      declarations: [
        AuthModalComponent
      ],
      providers: [
        {provide: NgbActiveModal, useClass: MockNgbActiveModal},
        {provide: AuthService, useValue: authServiceSpy}
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('#close should close modal', () => {
    const modal: NgbActiveModal = TestBed.inject(NgbActiveModal);
    spyOn(modal, 'close');
    component.close();
    expect(modal.close).toHaveBeenCalled();
  });

  it('close button in modal\'s header should trigger #close', () => {
    const button = fixture.debugElement.query(By.css('.modal-header button'));
    spyOn(component, 'close');
    button.triggerEventHandler('click', null);
    expect(component.close).toHaveBeenCalled();
  });

  it('close button in modal\'s header should be disabled', () => {
    component.showSpinner = true;
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('.modal-header button'));
    expect(button.nativeElement.disabled).toBeTrue();
  });

  it('close button in modal\'s footer should trigger #close', () => {
    const button = fixture.debugElement.query(
        By.css('.modal-footer button.btn.btn-danger'));

    spyOn(component, 'close');
    button.triggerEventHandler('click', null);
    expect(component.close).toHaveBeenCalled();
  });

  it('close button in modal\'s footer should be disabled', () => {
    component.showSpinner = true;
    fixture.detectChanges();

    const button = fixture.debugElement.query(
        By.css('.modal-footer button.btn.btn-danger'));

    expect(button.nativeElement.disabled).toBeTrue();
  });

  it('#username should match entered username', () => {
    const username = 'admin';
    const usernameInput = fixture.debugElement.query(By.css('#username'));
    usernameInput.nativeElement.value = username;
    usernameInput.nativeElement.dispatchEvent(new Event('input'));
    expect(component.username.value).toEqual(username);
  });

  it('should not render username\'s validation error', () => {
    const error = fixture.debugElement.query(By.css('#username + div'));
    expect(error).toBeNull();
  });

  it('should render username\'s validation error', () => {
    component.username.markAsTouched();
    fixture.detectChanges();
    const error = fixture.debugElement.query(By.css('#username + div'));
    expect(error).not.toBeNull();
  });

  it('should render username\'s validation error', () => {
    component.username.markAsDirty();
    fixture.detectChanges();
    const error = fixture.debugElement.query(By.css('#username + div'));
    expect(error).not.toBeNull();
  });

  it('#password should match entered password', () => {
    const password = 'admin';
    const passwordInput = fixture.debugElement.query(By.css('#password'));
    passwordInput.nativeElement.value = password;
    passwordInput.nativeElement.dispatchEvent(new Event('input'));
    expect(component.password.value).toEqual(password);
  });

  it('should not render password\'s validation error', () => {
    const error = fixture.debugElement.query(By.css('#password + div'));
    expect(error).toBeNull();
  });

  it('should render password\'s validation error', () => {
    component.password.markAsTouched();
    fixture.detectChanges();
    const error = fixture.debugElement.query(By.css('#password + div'));
    expect(error).not.toBeNull();
  });

  it('should render password\'s validation error', () => {
    component.password.markAsDirty();
    fixture.detectChanges();
    const error = fixture.debugElement.query(By.css('#password + div'));
    expect(error).not.toBeNull();
  });

  it('#onSubmit should login user and close modal', waitForAsync(() => {
    component.loginFailedMessage = 'This is a mock alert message.';
    component.adminLoginForm.setValue({username: 'admin', password: 'admin'});

    const authService = TestBed.inject(AuthService) as
        jasmine.SpyObj<AuthService>;

    authService.login.and.returnValue(asyncData(true));

    const modal: NgbActiveModal = TestBed.inject(NgbActiveModal);
    spyOn(modal, 'close');

    component.onSubmit();

    expect(component.loginFailedMessage).toEqual('');
    expect(component.showSpinner).toBeTrue();

    fixture.whenStable().then(() => {
      expect(component.showSpinner).toBeFalse();
      expect(modal.close).toHaveBeenCalled();
    });
  }));

  it('#onSubmit should set alert message', waitForAsync(() => {
    component.adminLoginForm.setValue({username: 'admin', password: 'admin'});

    const authService = TestBed.inject(AuthService) as
        jasmine.SpyObj<AuthService>;

    authService.login.and.returnValue(asyncData(false));

    component.onSubmit();

    fixture.whenStable().then(() => {
      expect(component.loginFailedMessage).not.toEqual('');
    });
  }));

  it('#onSubmit should set alert message', waitForAsync(() => {
    component.adminLoginForm.setValue({username: 'admin', password: 'admin'});

    const authService = TestBed.inject(AuthService) as
        jasmine.SpyObj<AuthService>;

    const alertMessage = 'This is a mock alert message.';
    authService.login.and.returnValue(asyncError(alertMessage));

    component.onSubmit();

    fixture.whenStable().then(() => {
      expect(component.showSpinner).toBeFalse();
      expect(component.loginFailedMessage).toEqual(alertMessage);
    });
  }));

  it('submit button should be disabled', () => {
    const button = fixture.debugElement.query(
        By.css('.modal-footer button.btn.btn-primary'));

    expect(button.nativeElement.disabled).toBeTrue();
  });

  it('submit button should not be disabled', () => {
    const usernameInput = fixture.debugElement.query(By.css('#username'));
    usernameInput.nativeElement.value = 'admin';
    usernameInput.nativeElement.dispatchEvent(new Event('input'));

    const passwordInput = fixture.debugElement.query(By.css('#password'));
    passwordInput.nativeElement.value = 'admin';
    passwordInput.nativeElement.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    const button = fixture.debugElement.query(
        By.css('.modal-footer button.btn.btn-primary'));

    expect(button.nativeElement.disabled).toBeFalse();
  });

  it('submit button should be hidden', () => {
    component.showSpinner = true;
    fixture.detectChanges();

    const button = fixture.debugElement.query(
        By.css('.modal-footer button.btn.btn-primary'));

    expect(button.nativeElement.hidden).toBeTrue();
  });

  it('should not render spinner', () => {
    const spinner = fixture.debugElement.query(By.css('.spinner-border'));
    expect(spinner).toBeNull();
  });

  it('should render spinner', () => {
    component.showSpinner = true;
    fixture.detectChanges();
    const spinner = fixture.debugElement.query(By.css('.spinner-border'));
    expect(spinner).not.toBeNull();
  });

  it('should not render alert message', () => {
    const ngbAlert = fixture.debugElement.query(By.css('ngb-alert'));
    expect(ngbAlert).toBeNull();
  });

  it('should render alert message', () => {
    const alertMessage = 'This is a mock alert message';
    component.loginFailedMessage = alertMessage;
    fixture.detectChanges();
    const ngbAlert = fixture.debugElement.query(By.css('ngb-alert'));
    expect(ngbAlert.nativeElement.textContent).toMatch(alertMessage);
  });
});
