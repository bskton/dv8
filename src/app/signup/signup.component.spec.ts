import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { AuthService } from '../auth/auth.service';
import { MaterialModule } from '../material.module';
import { SignupComponent } from './signup.component';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;

  beforeEach(async(() => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['logout']);
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        FormsModule,
        MaterialModule
      ],
      declarations: [
        SignupComponent
      ],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain input field for email', () => {
    const signupElement: HTMLElement = fixture.nativeElement;
    const input = signupElement.querySelector('input[type=email]');
    expect(input.textContent).toEqual('');
  });

  it('should contain input field for password', () => {
    const signupElement: HTMLElement = fixture.nativeElement;
    const input = signupElement.querySelector('input[type=password]');
    expect(input.textContent).toEqual('');
  });
});
