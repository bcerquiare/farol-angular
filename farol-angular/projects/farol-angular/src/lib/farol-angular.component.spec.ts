import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FarolAngularComponent } from './farol-angular.component';

describe('FarolAngularComponent', () => {
  let component: FarolAngularComponent;
  let fixture: ComponentFixture<FarolAngularComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FarolAngularComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FarolAngularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
