/**
 * Unit tests for HTTP alert message component
 * @packageDocumentation
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NgbAlert, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

import { HttpAlertMessageComponent } from './http-alert-message.component';
import { AlertType } from '../alert.model';

describe('HttpAlertMessageComponent', () => {
  let component: HttpAlertMessageComponent;
  let fixture: ComponentFixture<HttpAlertMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgbAlertModule],
      declarations: [HttpAlertMessageComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HttpAlertMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should not render alert message if alert type is none', () => {
    expect(component.showAlert).toBeFalse();
    const ngbAlert = fixture.debugElement.query(By.directive(NgbAlert));
    expect(ngbAlert).toBeNull();
  });

  it('should render alert message if alert type is client', () => {
    component.alertType = AlertType.client;
    fixture.detectChanges();
    expect(component.showAlert).toBeTrue();
    expect(component.clientSideError).toBeTrue();
    expect(component.serverSideError).toBeFalse();
    expect(component.permissionDenied).toBeFalse();
    const ngbAlert = fixture.debugElement.query(By.directive(NgbAlert));
    expect(ngbAlert).not.toBeNull();
  });

  it('should render alert message if alert type is server', () => {
    component.alertType = AlertType.server;
    fixture.detectChanges();
    expect(component.showAlert).toBeTrue();
    expect(component.clientSideError).toBeFalse();
    expect(component.serverSideError).toBeTrue();
    expect(component.permissionDenied).toBeFalse();
    const ngbAlert = fixture.debugElement.query(By.directive(NgbAlert));
    expect(ngbAlert).not.toBeNull();
  });

  it('should render alert message if alert type is permission', () => {
    component.alertType = AlertType.permission;
    fixture.detectChanges();
    expect(component.showAlert).toBeTrue();
    expect(component.clientSideError).toBeFalse();
    expect(component.serverSideError).toBeFalse();
    expect(component.permissionDenied).toBeTrue();
    const ngbAlert = fixture.debugElement.query(By.directive(NgbAlert));
    expect(ngbAlert).not.toBeNull();
  });
});
