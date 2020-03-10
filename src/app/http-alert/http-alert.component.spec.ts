/**
 * Unit tests for alert component
 * @packageDocumentation
 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AlertModule } from 'ngx-bootstrap/alert';

import { AlertComponent } from './alert.component';


describe('AlertComponent', () => {
  let component: AlertComponent;
  let fixture: ComponentFixture<AlertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AlertModule.forRoot()
      ],
      declarations: [
        AlertComponent
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertComponent);
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
