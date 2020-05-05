import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './Auth/auth/auth.component';
import { QuizComponent } from './quiz/quiz.component';
import { ResultComponent } from './result/result.component';
import { AuthGaurd } from './Auth/auth.gaurd';
import { NotAuthGaurd } from './Auth/notAuth.gaurd';


const routes: Routes = [
  { path: '', component: QuizComponent, canActivate: [AuthGaurd] },
  { path: 'register', component: AuthComponent, canActivate: [NotAuthGaurd] },
  { path: 'quiz', component: QuizComponent, canActivate: [AuthGaurd] },
  { path: 'result', component: ResultComponent, canActivate: [AuthGaurd] },
  { path: '**', component: AuthComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
