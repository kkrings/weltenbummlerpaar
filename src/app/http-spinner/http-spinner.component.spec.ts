/**
 * Unit tests for spinner component
 * @packageDocumentation
 */

import { async, ComponentFixture, TestBed, } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { HttpSpinnerComponent } from './http-spinner.component';


describe('HttpSpinnerComponent', () => {
  let component: HttpSpinnerComponent;
  let fixture: ComponentFixture<HttpSpinnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HttpSpinnerComponent
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HttpSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be hidden by default', () => {
    expect(component.showSpinner).toBeFalsy();
    const element = fixture.debugElement.query(By.css('.spinner-grow'));
    expect(element).toBeNull();
  });

  it('should be rendered', () => {
    component.showSpinner = true;
    fixture.detectChanges();
    const element = fixture.debugElement.query(By.css('.spinner-grow'));
    expect(element).toBeDefined();
    expect(element.nativeElement.textContent).toContain('Loading');
  });
});
