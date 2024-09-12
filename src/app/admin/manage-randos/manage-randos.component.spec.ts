import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageRandosComponent } from './manage-randos.component';

describe('ManageRandosComponent', () => {
  let component: ManageRandosComponent;
  let fixture: ComponentFixture<ManageRandosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageRandosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageRandosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
