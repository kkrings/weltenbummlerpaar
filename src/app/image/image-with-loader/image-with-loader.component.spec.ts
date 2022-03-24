/**
 * Unit tests for image with loader component
 * @packageDocumentation
 */

import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { MockImageDirective } from '../../test-utils/test-utils.module';
import { ImageWithLoaderComponent } from './image-with-loader.component';

describe('ImageWithLoaderComponent', () => {
  let component: ImageWithLoaderComponent;
  let fixture: ComponentFixture<ImageWithLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImageWithLoaderComponent, MockImageDirective],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageWithLoaderComponent);
    component = fixture.componentInstance;
    component.class = 'img img-fluid';
    fixture.detectChanges();
  });

  it('#loading is true after initialization', () => {
    expect(component.loading).toBeTrue();
  });

  it('#loading is false after #imageIsLoaded is called', () => {
    component.imageIsLoaded();
    expect(component.loading).toBeFalse();
  });

  describe('#loading is true', () => {
    beforeEach(() => {
      component.loading = true;
    });

    beforeEach(() => {
      fixture.detectChanges();
    });

    describe('loading image container', () => {
      let imageLoadingContainer: DebugElement;

      beforeEach(() => {
        imageLoadingContainer = fixture.debugElement.query(
          By.css('.image-loading-container')
        );
      });

      it('should have been rendered', () => {
        expect(imageLoadingContainer).not.toBeNull();
      });
    });

    describe('loading image', () => {
      let loadingImage: DebugElement;

      beforeEach(() => {
        loadingImage = fixture.debugElement.query(
          By.css('.image-loading-container > img')
        );
      });

      it('img class should have been applied', () => {
        expect(loadingImage.classes.img).toBeDefined();
      });

      it('img-fluid class should have been applied', () => {
        expect(loadingImage.classes['img-fluid']).toBeDefined();
      });
    });

    describe('input image', () => {
      let inputImage: DebugElement;

      beforeEach(() => {
        inputImage = fixture.debugElement.query(By.css('.d-none'));
      });

      it('should not have been displayed', () => {
        expect(inputImage).not.toBeNull();
      });

      it('img class should have been applied', () => {
        expect(inputImage.classes.img).toBeDefined();
      });

      it('img-fluid class should have been applied', () => {
        expect(inputImage.classes['img-fluid']).toBeDefined();
      });

      describe('load event is fired', () => {
        let imageIsLoadedSpy: jasmine.Spy;

        beforeEach(() => {
          imageIsLoadedSpy = spyOn(component, 'imageIsLoaded');
        });

        beforeEach(() => {
          inputImage.triggerEventHandler('load', null);
        });

        beforeEach(() => {
          fixture.detectChanges();
        });

        it('#imageIsLoaded should have been called', () => {
          expect(imageIsLoadedSpy).toHaveBeenCalled();
        });
      });
    });
  });

  describe('#loading is true', () => {
    beforeEach(() => {
      component.loading = false;
    });

    beforeEach(() => {
      fixture.detectChanges();
    });

    describe('loading image container', () => {
      let imageLoadingContainer: DebugElement;

      beforeEach(() => {
        imageLoadingContainer = fixture.debugElement.query(
          By.css('.image-loading-container')
        );
      });

      it('should not have been rendered', () => {
        expect(imageLoadingContainer).toBeNull();
      });
    });

    describe('input image', () => {
      let inputImage: DebugElement;

      beforeEach(() => {
        inputImage = fixture.debugElement.query(By.css('.d-none'));
      });

      it('should have been displayed', () => {
        expect(inputImage).toBeNull();
      });
    });
  });
});
