/**
 * Unit tests for spinner component
 * @packageDocumentation
 */

import { async, ComponentFixture, TestBed, } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { SpinnerComponent } from './spinner.component';


describe('SpinnerComponent', () => {
  let component: SpinnerComponent;
  let fixture: ComponentFixture<SpinnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SpinnerComponent
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpinnerComponent);
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
