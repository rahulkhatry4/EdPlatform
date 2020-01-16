import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApitalkComponent } from './apitalk.component';

describe('ApitalkComponent', () => {
  let component: ApitalkComponent;
  let fixture: ComponentFixture<ApitalkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApitalkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApitalkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
