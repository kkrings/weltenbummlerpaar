/**
 * Unit tests for image directive
 * @packageDocumentation
 */

import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { environment } from '../../environments/environment';
import { ImageDirective } from './image.directive';
import { Image } from './image.model';

/**
 * Dummy image component
 */
@Component({
  template: '<a [appImage]="image"><img [appImage]="image"></a>',
})
class ImageComponent {
  /**
   * Mock image
   */
  image: Image = {
    id: '0',
    description: 'This is a mock image.',
    createdAt: new Date(2022, 2, 10).toISOString(),
    updatedAt: new Date(2022, 2, 10).toISOString(),
  };
}

describe('ImageDirective', () => {
  let component: ImageComponent;
  let fixture: ComponentFixture<ImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImageComponent, ImageDirective],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("img's src property should be set to the image's URL", () => {
    const img = fixture.debugElement.query(By.css('img'));
    const src = img.nativeElement.getAttribute('src');

    expect(src).toEqual(
      `${environment.baseurl}/image-uploads/0.jpg?${component.image.updatedAt}`
    );
  });

  it("img's alt property should be set to the image's filename", () => {
    const img = fixture.debugElement.query(By.css('img'));
    const alt = img.nativeElement.getAttribute('alt');
    expect(alt).toEqual('0.jpg');
  });

  it("a's href property should be set to the image's URL", () => {
    const atag = fixture.debugElement.query(By.css('a'));
    const href = atag.nativeElement.getAttribute('href');
    expect(href).toEqual(`${environment.baseurl}/image-uploads/0.jpg`);
  });

  it("img's src property should be updated", () => {
    component.image.updatedAt = new Date(2022, 2, 11).toISOString();
    fixture.detectChanges();

    const img = fixture.debugElement.query(By.css('img'));
    const src = img.nativeElement.getAttribute('src');

    expect(src).toEqual(
      `${environment.baseurl}/image-uploads/0.jpg?${component.image.updatedAt}`
    );
  });
});
