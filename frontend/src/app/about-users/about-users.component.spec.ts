import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutUsersComponent } from './about-users.component';

describe('AboutUsersComponent', () => {
  let component: AboutUsersComponent;
  let fixture: ComponentFixture<AboutUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutUsersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
