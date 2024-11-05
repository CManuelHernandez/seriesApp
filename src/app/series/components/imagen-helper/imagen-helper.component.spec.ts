import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagenHelperComponent } from './imagen-helper.component';

describe('ImagenHelperComponent', () => {
  let component: ImagenHelperComponent;
  let fixture: ComponentFixture<ImagenHelperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImagenHelperComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImagenHelperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
