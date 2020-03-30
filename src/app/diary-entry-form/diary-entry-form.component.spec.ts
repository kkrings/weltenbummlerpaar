import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiaryEntryFormComponent } from './diary-entry-form.component';

describe('DiaryEntryFormComponent', () => {
  let component: DiaryEntryFormComponent;
  let fixture: ComponentFixture<DiaryEntryFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiaryEntryFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiaryEntryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
