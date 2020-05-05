import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { QuizService } from 'src/app/Shared/Service/quiz.service';
import { UserModal } from 'src/app/Shared/modal/user.modal';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  formGroup: FormGroup;
  isLoading: Boolean = false;

  constructor(private quizService: QuizService, public route: Router) { }

  ngOnInit(): void {
    this.initReactiveForm();
  }

  get form() {
    return this.formGroup.controls;
  }

  initReactiveForm() {
    this.formGroup = new FormGroup({
      'username': new FormControl('', [Validators.required]),
      'email': new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")])
    })
  }

  submitForm() {
    const userData: UserModal = {
      username: this.form.username.value,
      email: this.form.email.value
    }
    this.isLoading = true;
    this.quizService.createUser(userData)
      .then(res => {
        const userDetail = {
          id: res.id,
          name: userData.username,
          email: userData.email
        }
        localStorage.clear();
        localStorage.setItem("userData", JSON.stringify(userDetail));
        this.route.navigate(['/quiz']);
        this.isLoading = false;
      })
      .catch(err => {
        this.isLoading = false;
        console.log(err.message);
      });
  }

}
