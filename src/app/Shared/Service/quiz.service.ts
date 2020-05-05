import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserModal } from '../modal/user.modal';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { QuestionModal } from '../modal/question.modal';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  readonly quizDataUrl = "./assets/data/quiz-data.json";
  readonly rootUrl = "http://localhost:4200";
  questionData: QuestionModal[] = [];
  seconds: number;
  timer;
  qnProgress: number;
  correctAnsCount: number = 0;

  constructor(private http: HttpClient, private fireStore: AngularFirestore, public router: Router) {
  }

  // Timer 
  displayTimeElapsed() {
    const hours = Math.floor(this.seconds / 3600) < 10 ? '0' + Math.floor(this.seconds / 3600) : Math.floor(this.seconds / 3600);
    const minutes = Math.floor((this.seconds / 60) % 60) < 10 ? '0' + Math.floor((this.seconds / 60) % 60) : Math.floor((this.seconds / 60) % 60);
    const seconds = Math.floor(this.seconds % 60) < 10 ? '0' + Math.floor(this.seconds % 60) : Math.floor(this.seconds % 60);
    return `${hours} : ${minutes} : ${seconds}`;
  }

  getData() {
    return this.fireStore.collection('quizData').snapshotChanges();
  }

  createUser(value: UserModal) {
    return this.fireStore.collection('userData').add(value);
  }

  addData(value) {
    this.fireStore.collection('quizData').add(value);
  }

  sendResult(userId: string, resultData: any) {
    return this.fireStore.collection('userData').doc(userId).update({ "resultData": resultData });
  }

  signOut() {
    localStorage.clear();
    clearInterval(this.timer);
    this.router.navigate(['/']);
  }
}
