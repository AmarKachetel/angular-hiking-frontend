import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditRandoComponent } from './add-edit-rando.component';

describe('AddEditRandoComponent', () => {
  let component: AddEditRandoComponent;
  let fixture: ComponentFixture<AddEditRandoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditRandoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditRandoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
