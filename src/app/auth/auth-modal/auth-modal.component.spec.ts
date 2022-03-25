/**
 * Unit tests for authentication modal component
 * @packageDocumentation
 */

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import {
  NgbActiveModal,
  NgbAlert,
  NgbAlertModule,
} from '@ng-bootstrap/ng-bootstrap';

import { AuthModalComponent } from './auth-modal.component';
import { AuthService } from '../auth.service';
import { AlertType } from '../../http-alert/alert.model';

import * as testUtils from '../../test-utils/test-utils.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

describe('AuthModalComponent', () => {
  let component: AuthModalComponent;
  let fixture: ComponentFixture<AuthModalComponent>;

  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['login']);

    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        NgbAlertModule,
        FontAwesomeModule,
        testUtils.TestUtilsModule,
      ],
      declarations: [AuthModalComponent],
      providers: [
        { provide: NgbActiveModal, useClass: testUtils.MockNgbActiveModal },
        { provide: AuthService, useValue: authServiceSpy },
      ],
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

  it("close button in modal's header should trigger #close", () => {
    const button = fixture.debugElement.query(By.css('.modal-header button'));
    spyOn(component, 'close');
    button.triggerEventHandler('click', null);
    expect(component.close).toHaveBeenCalled();
  });

  it("close button in modal's header should be disabled", () => {
    component.showSpinner = true;
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('.modal-header button'));
    expect(button.nativeElement.disabled).toBeTrue();
  });

  it("close button in modal's footer should trigger #close", () => {
    const button = fixture.debugElement.query(
      By.css('.modal-footer button.btn.btn-danger')
    );
    spyOn(component, 'close');
    button.triggerEventHandler('click', null);
    expect(component.close).toHaveBeenCalled();
  });

  it("close button in modal's footer should be disabled", () => {
    component.showSpinner = true;
    fixture.detectChanges();
    const button = fixture.debugElement.query(
      By.css('.modal-footer button.btn.btn-danger')
    );
    expect(button.nativeElement.disabled).toBeTrue();
  });

  it('#username should match entered username', () => {
    const username = 'admin';
    const usernameInput = fixture.debugElement.query(By.css('#username'));
    usernameInput.nativeElement.value = username;
    usernameInput.nativeElement.dispatchEvent(new Event('input'));
    expect(component.username.value).toEqual(username);
  });

  it("should not render username's validation error", () => {
    const error = fixture.debugElement.query(
      By.css('#username-validation-error')
    );
    expect(error).toBeNull();
  });

  it("should render username's validation error", () => {
    component.username.markAsTouched();
    fixture.detectChanges();
    const error = fixture.debugElement.query(
      By.css('#username-validation-error')
    );
    expect(error).not.toBeNull();
  });

  it("should render username's validation error", () => {
    component.username.markAsDirty();
    fixture.detectChanges();
    const error = fixture.debugElement.query(
      By.css('#username-validation-error')
    );
    expect(error).not.toBeNull();
  });

  it('#showPassword should be false after initialization', () => {
    expect(component.showPassword).toBeFalse();
  });

  it('#toggleShowPassword should invert #showPassword', () => {
    const showPassword = component.showPassword;
    component.toggleShowPassword();
    expect(component.showPassword).toEqual(!showPassword);
  });

  it('#password should be of type password', () => {
    component.showPassword = false;
    fixture.detectChanges();
    const passwordInput = fixture.debugElement.query(By.css('#password'));
    expect(passwordInput.nativeElement.type).toEqual('password');
  });

  it('#password should be of type text', () => {
    component.showPassword = true;
    fixture.detectChanges();
    const passwordInput = fixture.debugElement.query(By.css('#password'));
    expect(passwordInput.nativeElement.type).toEqual('text');
  });

  it('should render #passwordNotShownIcon', () => {
    component.showPassword = false;
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('#password + button'));
    expect(button.nativeElement.textContent).toEqual('Passwort anzeigen');
  });

  it('should render #passwordShownIcon', () => {
    component.showPassword = true;
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('#password + button'));
    expect(button.nativeElement.textContent).toEqual('Passwort nicht anzeigen');
  });

  it('#toggleShowPassword should have been called', () => {
    spyOn(component, 'toggleShowPassword');
    const button = fixture.debugElement.query(By.css('#password + button'));
    button.triggerEventHandler('click', null);
    expect(component.toggleShowPassword).toHaveBeenCalled();
  });

  it('#password should match entered password', () => {
    const password = 'admin';
    const passwordInput = fixture.debugElement.query(By.css('#password'));
    passwordInput.nativeElement.value = password;
    passwordInput.nativeElement.dispatchEvent(new Event('input'));
    expect(component.password.value).toEqual(password);
  });

  it("should not render password's validation error", () => {
    const error = fixture.debugElement.query(
      By.css('#password-validation-error')
    );
    expect(error).toBeNull();
  });

  it("should render password's validation error", () => {
    component.password.markAsTouched();
    fixture.detectChanges();
    const error = fixture.debugElement.query(
      By.css('#password-validation-error')
    );
    expect(error).not.toBeNull();
  });

  it("should render password's validation error", () => {
    component.password.markAsDirty();
    fixture.detectChanges();
    const error = fixture.debugElement.query(
      By.css('#password-validation-error')
    );
    expect(error).not.toBeNull();
  });

  it('#onSubmit should login user and close modal', waitForAsync(() => {
    component.loginFailed = true;
    component.httpAlert.alertType = AlertType.server;
    component.adminLoginForm.setValue({
      username: 'admin',
      password: 'admin',
    });

    const authService = TestBed.inject(
      AuthService
    ) as jasmine.SpyObj<AuthService>;
    authService.login.and.returnValue(testUtils.asyncData(true));

    const modal: NgbActiveModal = TestBed.inject(NgbActiveModal);
    spyOn(modal, 'close');

    component.onSubmit();

    expect(component.loginFailed).toBeFalse();
    expect(component.showSpinner).toBeTrue();
    expect(component.httpAlert.alertType).toEqual(AlertType.none);

    fixture.whenStable().then(() => {
      expect(component.showSpinner).toBeFalse();
      expect(modal.close).toHaveBeenCalled();
    });
  }));

  it('#onSubmit should set login failed', waitForAsync(() => {
    component.adminLoginForm.setValue({
      username: 'admin',
      password: 'admin',
    });

    const authService = TestBed.inject(
      AuthService
    ) as jasmine.SpyObj<AuthService>;
    authService.login.and.returnValue(testUtils.asyncData(false));

    component.onSubmit();

    fixture.whenStable().then(() => expect(component.loginFailed).toBeTrue());
  }));

  it('#onSubmit should set HTTP alert', waitForAsync(() => {
    component.adminLoginForm.setValue({
      username: 'admin',
      password: 'admin',
    });

    const authService = TestBed.inject(
      AuthService
    ) as jasmine.SpyObj<AuthService>;

    const alertType = AlertType.server;
    authService.login.and.returnValue(testUtils.asyncError(alertType));

    component.onSubmit();

    fixture.whenStable().then(() => {
      expect(component.showSpinner).toBeFalse();
      expect(component.httpAlert.alertType).toEqual(alertType);
    });
  }));

  it('submit button should be disabled', () => {
    const button = fixture.debugElement.query(
      By.css('.modal-footer button.btn.btn-primary')
    );
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
      By.css('.modal-footer button.btn.btn-primary')
    );
    expect(button.nativeElement.disabled).toBeFalse();
  });

  it('submit button should be hidden', () => {
    component.showSpinner = true;
    fixture.detectChanges();
    const button = fixture.debugElement.query(
      By.css('.modal-footer button.btn.btn-primary')
    );
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

  it('should not render login failed message', () => {
    const ngbAlert = fixture.debugElement.query(By.directive(NgbAlert));
    expect(ngbAlert).toBeNull();
  });

  it('should render login failed message', () => {
    component.loginFailed = true;
    fixture.detectChanges();
    const ngbAlert = fixture.debugElement.query(By.directive(NgbAlert));
    expect(ngbAlert).not.toBeNull();
  });

  it('should not render HTTP alert message', () => {
    const httpAlert = fixture.debugElement.query(
      By.directive(testUtils.MockHttpAlertMessageComponent)
    );
    expect(httpAlert).toBeNull();
  });

  it('should render HTTP alert message', () => {
    component.httpAlert.alertType = AlertType.server;
    fixture.detectChanges();
    const httpAlert = fixture.debugElement.query(
      By.directive(testUtils.MockHttpAlertMessageComponent)
    );
    expect(httpAlert).not.toBeNull();
  });
});
