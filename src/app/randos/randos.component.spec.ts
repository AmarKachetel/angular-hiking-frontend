import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RandosComponent } from './randos.component';

describe('RandosComponent', () => {
  let component: RandosComponent;
  let fixture: ComponentFixture<RandosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RandosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RandosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
