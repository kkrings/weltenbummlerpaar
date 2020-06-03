/**
 * Unit tests for image carousel component
 * @packageDocumentation
 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';

import { ImageCarouselComponent } from './image-carousel.component';
import { MockImageDirective } from '../../shared/test-utils';


describe('ImageCarouselComponent', () => {
  let component: ImageCarouselComponent;
  let fixture: ComponentFixture<ImageCarouselComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NgbCarouselModule
      ],
      declarations: [
        ImageCarouselComponent,
        MockImageDirective
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageCarouselComponent);
    component = fixture.componentInstance;

    component.imageList = [{
      _id: '0',
      description: 'some description',
      createdAt: (new Date()).toISOString(),
      updatedAt: (new Date()).toISOString()
    }, {
      _id: '1',
      description: 'some description',
      createdAt: (new Date()).toISOString(),
      updatedAt: (new Date()).toISOString()
    }];

    fixture.detectChanges();
  });

  it('should render images', () => {
    const slides = fixture.debugElement.queryAll(By.css('.carousel-item'));
    expect(slides.length).toEqual(component.imageList.length);
  });

  it('should render image\'s index', () => {
    const index = fixture.debugElement.query(
        By.css('.carousel-item.active small.text-muted'));

    expect(index.nativeElement.textContent).toMatch(
      `1/${component.imageList.length}`);
  });

  it('should render image\'s description', () => {
    const caption = fixture.debugElement.query(
        By.css('.carousel-item.active .figure-caption'));

    expect(caption.nativeElement.textContent).toEqual(
        component.imageList[0].description); });
});
