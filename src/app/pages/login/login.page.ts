import { alertOutline, eyeOffOutline, eyeOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalController } from '@ionic/angular';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonInput,
  IonButton,
  IonIcon,
} from '@ionic/angular/standalone';
import { AuthentificationService } from 'src/app/core/services/authentification.service';
import { TranslateModule } from '@ngx-translate/core';
import {
  LoginRequestError,
  LoginRequestSuccess,
} from 'src/app/core/interfaces/login';
import { Router } from '@angular/router';
import { PasswordLostComponent } from 'src/app/shared/modal/password-lost/password-lost.component';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    IonIcon,
    IonItem,
    IonList,
    IonTitle,
    IonInput,
    IonHeader,
    IonButton,
    IonToolbar,
    IonContent,
    FormsModule,
    CommonModule,
    TranslateModule,
    ReactiveFormsModule,
  ],
})
export class LoginPage {
  error: string = '';
  submitForm: boolean = false;
  password: string = '';
  showPassword: boolean = false;
  private modalCtl = inject(ModalController);
  private router = inject(Router);
  private serviceAuth = inject(AuthentificationService);
  private localStore = inject(LocalStorageService);

  form: FormGroup = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$'),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });
  constructor() {
    addIcons({
      'alert-circle-outline': alertOutline,
      'eye-off-outline': eyeOffOutline,
      'eye-outline': eyeOutline,
    });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  // ngOnInit() {}

  onSubmit() {
    this.error = '';
    if (this.form.valid) {
      this.submitForm = true;
      /*const data = this.serviceAuth.login(
        this.form.value.email,
        this.form.value.password
      );*/

      this.serviceAuth.login(this.form.value.email,this.form.value.password).subscribe(
        {
          next: (data)=>{
            console.log('login successful',data);
            const success = data as LoginRequestSuccess;
            this.localStore.setItem('user', success.user);
            this.localStore.setItem('token', success.token);
            this.router.navigateByUrl('/home');
          } ,
          error: (err: any) => {
            const errordata = err.error as LoginRequestError;
            console.error('Login failed',errordata);
            this.error = errordata?.message ?? '';
          }
        }
      )
    }
  }
  async onPasswordLostModal() {
    const modal = await this.modalCtl.create({
      cssClass: 'password-modal',
      component: PasswordLostComponent,
    });
    modal.present();
  }
}