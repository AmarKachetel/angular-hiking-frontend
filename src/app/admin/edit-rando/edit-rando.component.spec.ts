import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRandoComponent } from './edit-rando.component';

describe('EditRandoComponent', () => {
  let component: EditRandoComponent;
  let fixture: ComponentFixture<EditRandoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditRandoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditRandoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
