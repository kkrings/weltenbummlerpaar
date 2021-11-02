/**
 * Unit tests for image carousel component
 * @packageDocumentation
 */

import { Injectable } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
  NgbCarouselConfig,
  NgbCarouselModule,
} from '@ng-bootstrap/ng-bootstrap';

import { ImageCarouselComponent } from './image-carousel.component';
import { TestUtilsModule } from '../../test-utils/test-utils.module';

/**
 * Turn off image carousel's animations for testing.
 */
@Injectable()
class NoAnimationsConfig extends NgbCarouselConfig {
  public get animation() {
    return false;
  }
}

describe('ImageCarouselComponent', () => {
  let component: ImageCarouselComponent;
  let fixture: ComponentFixture<ImageCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgbCarouselModule, TestUtilsModule],
      declarations: [ImageCarouselComponent],
      providers: [{ provide: NgbCarouselConfig, useClass: NoAnimationsConfig }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageCarouselComponent);
    component = fixture.componentInstance;

    component.imageList = [
      {
        _id: '0',
        description: 'some description',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        _id: '1',
        description: 'some description',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];

    fixture.detectChanges();
  });

  it('should render images', () => {
    const slides = fixture.debugElement.queryAll(By.css('.carousel-item'));
    expect(slides.length).toEqual(component.imageList.length);
  });

  it("should render first image's index", () => {
    expect(component.imageNum).toEqual(1);
    const index = fixture.debugElement.query(By.css('small.text-muted'));
    expect(index.nativeElement.textContent).toMatch(
      `${component.imageNum}/${component.imageList.length}`
    );
  });

  it("should render second image's index", () => {
    const nextButton = fixture.debugElement.query(
      By.css('.carousel-control-next')
    );
    nextButton.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(component.imageNum).toEqual(2);
    const index = fixture.debugElement.query(By.css('small.text-muted'));
    expect(index.nativeElement.textContent).toMatch(
      `${component.imageNum}/${component.imageList.length}`
    );
  });

  it("should render image's description", () => {
    const caption = fixture.debugElement.query(
      By.css('.carousel-item.active .figure-caption')
    );
    expect(caption.nativeElement.textContent).toEqual(
      component.imageList[0].description
    );
  });
});
