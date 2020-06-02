/**
 * Unit tests for navigation bar component
 * @packageDocumentation
 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { By } from '@angular/platform-browser';

import { NavbarComponent } from './navbar.component';
import { AuthService } from '../auth/auth.service';
import { DiaryEntry } from '../diary-entry/diary-entry.model';

import { AuthModalComponent } from '../auth/auth-modal/auth-modal.component';

import {
  DiaryEntryFormComponent
} from '../diary-entry/diary-entry-form/diary-entry-form.component';


describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  const testDiaryEntry: DiaryEntry = {
      _id: '0',
      title: 'some title',
      locationName: 'some location',
      body: 'some body',
      images: [],
      tags: [],
      createdAt: (new Date()).toISOString(),
      updatedAt: (new Date()).toISOString()
    };

  beforeEach(async(() => {
    const authServiceSpy = jasmine.createSpyObj(
        'AuthService', ['logout', 'isLoggedIn']);

    const modalServiceSpy = jasmine.createSpyObj('NgbModal', ['open']);

    const mockModal: Partial<NgbModalRef> = {
      result: Promise.resolve(testDiaryEntry)
    };

    TestBed.configureTestingModule({
      declarations: [
        NavbarComponent
      ],
      providers: [
        {provide: AuthService, useValue: authServiceSpy},
        {provide: NgbModal, useValue: modalServiceSpy},
        {provide: NgbModalRef, useValue: mockModal}
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('#openLoginModal should open login modal', () => {
    const modalService = TestBed.inject(NgbModal) as
        jasmine.SpyObj<NgbModal>;

    component.openLoginModal();

    expect(modalService.open).toHaveBeenCalledWith(AuthModalComponent, {
      backdrop: 'static',
      keyboard: false
    });
  });

  it('login button should trigger #openLoginModal', () => {
    const button = fixture.debugElement.query(
        By.css('button.btn.btn-primary'));

    spyOn(component, 'openLoginModal');
    button.triggerEventHandler('click', null);
    expect(component.openLoginModal).toHaveBeenCalled();
  });

  it('login button should be hidden', () => {
    const authService = TestBed.inject(AuthService) as
        jasmine.SpyObj<AuthService>;

    // spyOnProperty does not work, apparently due to a bug in jasmine
    // use this workaround until the bug is fixed
    (authService.isLoggedIn as any) = true;

    const button = fixture.debugElement.query(
        By.css('button.btn.btn-primary'));

    expect(button.nativeElement.hidden).toBeTrue();
  });

  it('#logout should logout user', () => {
    const authService = TestBed.inject(AuthService) as
        jasmine.SpyObj<AuthService>;

    component.logout();
    expect(authService.logout).toHaveBeenCalled();
  });

  it('logout button should trigger #logout', () => {
    const button = fixture.debugElement.query(
        By.css('button.btn.btn-primary.ml-2'));

    spyOn(component, 'logout');
    button.triggerEventHandler('click', null);
    expect(component.logout).toHaveBeenCalled();
  });

  it('should not render logout button', () => {
    const authService = TestBed.inject(AuthService) as
        jasmine.SpyObj<AuthService>;

    // spyOnProperty does not work, apparently due to a bug in jasmine
    // use this workaround until the bug is fixed
    (authService.isLoggedIn as any) = false;

    fixture.detectChanges();

    const button = fixture.debugElement.query(
        By.css('button.btn.btn-primary.ml-2'));

    expect(button).toBeNull();
  });

  it('#openDiaryEntryModal should open diary entry modal', async(() => {
    const modalService = TestBed.inject(NgbModal) as
        jasmine.SpyObj<NgbModal>;

    const modal: NgbModalRef = TestBed.inject(NgbModalRef);
    modalService.open.and.returnValue(modal);

    component.newDiaryEntry.subscribe((diaryEntry: DiaryEntry) => {
      expect(diaryEntry).toEqual(testDiaryEntry);
    });

    component.openDiaryEntryModal();

    expect(modalService.open).toHaveBeenCalledWith(DiaryEntryFormComponent, {
       backdrop: 'static',
       keyboard: false
    });

    modal.result = Promise.resolve(null);

    component.openDiaryEntryModal();

    expect(modalService.open).toHaveBeenCalledWith(DiaryEntryFormComponent, {
       backdrop: 'static',
       keyboard: false
    });
  }));

  it('new diary entry button should trigger #openDiaryEntryModal', () => {
    const button = fixture.debugElement.query(
        By.css('button.btn.btn-secondary'));

    spyOn(component, 'openDiaryEntryModal');
    button.triggerEventHandler('click', null);
    expect(component.openDiaryEntryModal).toHaveBeenCalled();
  });

  it('should not render new diary entry button', () => {
    const authService = TestBed.inject(AuthService) as
        jasmine.SpyObj<AuthService>;

    // spyOnProperty does not work, apparently due to a bug in jasmine
    // use this workaround until the bug is fixed
    (authService.isLoggedIn as any) = false;

    fixture.detectChanges();

    const button = fixture.debugElement.query(
        By.css('button.btn.btn-secondary'));

    expect(button).toBeNull();
  });
});
