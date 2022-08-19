import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { DxFormModule } from 'devextreme-angular/ui/form';
import { DxLoadIndicatorModule } from 'devextreme-angular/ui/load-indicator';
import notify from 'devextreme/ui/notify';
import { AuthService } from '../../../services';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent {
  loading = false;
  formData: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.formData = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$'
          ),
        ],
      ],
    });
  }

  async onSubmit(e: Event) {
    e.preventDefault();
    this.loading = true;

    const result = await this.authService.logIn(
      this.formData.get('email')?.value,
      this.formData.get('password')?.value
    );
    if (!result.isOk) {
      this.loading = false;
      notify(result.message, 'error', 2000);
    }
  }
}
@NgModule({
  imports: [CommonModule, RouterModule, DxFormModule, DxLoadIndicatorModule, ReactiveFormsModule],
  declarations: [LoginFormComponent],
  exports: [LoginFormComponent],
})
export class LoginFormModule {}
