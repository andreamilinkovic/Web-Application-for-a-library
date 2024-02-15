import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutBooksComponent } from './about-books.component';

describe('AboutBooksComponent', () => {
  let component: AboutBooksComponent;
  let fixture: ComponentFixture<AboutBooksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutBooksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutBooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
