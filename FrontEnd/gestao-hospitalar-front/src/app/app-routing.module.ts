import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './components/signin/signin.component';
// import { AuthGuard } from './core/guard/auth.guard';

const routes: Routes = [
  { 
    path: '', 
    component: SigninComponent, 
    // canActivate: [AuthGuard]
  },
  { 
    path: 'signin', 
    component: SigninComponent,
    // canActivate: [AuthGuard]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
