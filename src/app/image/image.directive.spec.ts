/**
 * Unit tests for image directive
 * @packageDocumentation
 */

import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageDirective } from './image.directive';
import { Image } from './image.model';
import { environment } from '../../environments/environment';


/**
 * Dummy image component
 */
@Component({
  template: '<a [appImage]="image"><img [appImage]="image"></a>'
})
class ImageComponent {
  /**
   * Mock image
   */
  image: Image = {
    _id: '0',
    description: 'This is a mock image.',
    createdAt: (new Date()).toISOString(),
    updatedAt: (new Date()).toISOString()
  };
}


describe('ImageDirective', () => {
  let fixture: ComponentFixture<ImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        ImageComponent,
        ImageDirective
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageComponent);
    fixture.detectChanges();
  });

  it('img\'s src property should be set to the image\'s URL', () => {
    const img = fixture.debugElement.query(By.css('img'));
    const src = img.nativeElement.getAttribute('src');
    expect(src).toMatch(`${environment.baseurl}/images/0.jpg`);
  });

  it('img\'s alt property should be set to the image\'s filename', () => {
    const img = fixture.debugElement.query(By.css('img'));
    const alt = img.nativeElement.getAttribute('alt');
    expect(alt).toMatch('0.jpg');
  });

  it('a\'s href property should be set to the image\'s URL', () => {
    const atag = fixture.debugElement.query(By.css('a'));
    const href = atag.nativeElement.getAttribute('href');
    expect(href).toMatch(`${environment.baseurl}/images/0.jpg`);
  });
});
