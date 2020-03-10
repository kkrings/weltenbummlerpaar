/**
 * Unit tests for http-alert.component
 * @packageDocumentation
 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AlertModule } from 'ngx-bootstrap/alert';

import { HttpAlertComponent } from './http-alert.component';


describe('HttpAlertComponent', () => {
  let component: HttpAlertComponent;
  let fixture: ComponentFixture<HttpAlertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AlertModule.forRoot()
      ],
      declarations: [
        HttpAlertComponent
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HttpAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be hidden if alert message is undefined', () => {
    const element = fixture.debugElement.nativeElement;
    expect(element.querySelector('div')).toBeNull();
  });

  it('should render alert message', () => {
    const testMessage = 'This is a test alert message.';

    component.alertMessage = testMessage;
    fixture.detectChanges();

    const element = fixture.debugElement.nativeElement;
    expect(element.querySelector('alert').textContent).toMatch(testMessage);
  });
});
