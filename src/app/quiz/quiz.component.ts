import { Component, OnInit, HostBinding } from '@angular/core';
import { QuizService } from '../Shared/Service/quiz.service';
import { DomSanitizer } from '@angular/platform-browser';
import { QuestionModal } from '../Shared/modal/question.modal';
import { Router } from '@angular/router';
import { MatRadioChange } from '@angular/material/radio';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {

  selectedAnswer: number = null;
  isLoading: Boolean = false;

  constructor(public quizService: QuizService, public sanitizer: DomSanitizer, public router: Router) { }

  ngOnInit(): void {
    this.quizService.qnProgress = 0;
    this.quizService.seconds = 0;
    this.getQuizData();
    // this.quizService.addData({ answer: 0, imageName: " ", options: ["True", "False"], question: "Is 'undefined' a data type in javascript?" });
  }

  public get valueAsStyle(): any {
    return this.sanitizer.bypassSecurityTrustStyle(`--progress-bar: ${this.getProgressValue}%`);
  }

  // Check prev available
  public get checkPrev(): Boolean {
    if (this.quizService.qnProgress - 1 >= 0) {
      return true;
    }
    return false;
  }

  // Check next available
  public get checkNext(): Boolean {
    if (this.quizService.questionData[this.quizService.qnProgress].participantAnswer >= 0) {
      return true;
    }
    return false;
  }

  // Get Progress Value
  public get getProgressValue() {
    const progressValue = (this.quizService.qnProgress + 1) * (100 / this.quizService.questionData.length);
    return progressValue;
  }

  // Check if the radio is select or not
  // isRadioChecked(index: number) {
  //   if (this.quizService.questionData[this.quizService.qnProgress].participantAnswer === index) {
  //     return true;
  //   }
  //   return false;
  // }

  // To filter the data
  filterData(id, data) {
    return {
      id: id,
      answer: data.answer,
      imageName: data.imageName,
      options: data.options,
      question: data.question,
      participantAnswer: -1
    }
  }

  // Getting quiz data
  getQuizData() {
    this.isLoading = true;
    this.quizService.getData().subscribe(
      res => {
        this.isLoading = false;
        const filteredData: QuestionModal[] = res.map(response => {
          return this.filterData(response.payload.doc.id, response.payload.doc.data());
        })
        this.quizService.questionData = filteredData;
        this.startTimer();
      },
      err => {
        this.isLoading = false;
        console.log(err);
      }
    );
  }

  radioChange(event: MatRadioChange) {
    this.quizService.questionData[this.quizService.qnProgress].participantAnswer = event.value;
  }

  // Start timer
  startTimer() {
    this.quizService.timer = setInterval(() => {
      this.quizService.seconds++;
    }, 1000)
  }

  // Submit answer or click next
  clickNextBtn(id) {
    if (this.checkNext) {
      this.quizService.qnProgress++;
      if (this.quizService.questionData.length == this.quizService.qnProgress) {
        clearInterval(this.quizService.timer);
        this.router.navigate(['/result']);
        return;
      }
    }
  }

  // Prev question
  clickPrevBtn() {
    if (!this.checkPrev) {
      return;
    }
    this.quizService.qnProgress--;
  }

}
