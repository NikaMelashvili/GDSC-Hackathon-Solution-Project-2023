import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { SigneinComponent } from './app/signein/signein.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

export const routes: Routes = [
    { path: 'singein', component: SigneinComponent },
];

@NgModule({
  imports:[RouterModule.forRoot(routes)],
  exports:[RouterModule]
})
export class AppRoutingModule{

}