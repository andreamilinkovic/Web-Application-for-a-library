import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IstorijatComponent } from './istorijat.component';

describe('IstorijatComponent', () => {
  let component: IstorijatComponent;
  let fixture: ComponentFixture<IstorijatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IstorijatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IstorijatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
