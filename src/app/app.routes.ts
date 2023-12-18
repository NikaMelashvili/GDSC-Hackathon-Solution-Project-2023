import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { ArticleComponent } from './article/article.component';
import { SigneinComponent } from './signein/signein.component';
import { AboutComponent } from './about/about.component';
import { FishmanComponent } from './fishman/fishman.component';
import { PeopleComponent } from './people/people.component';
import { GameComponent } from './game/game.component';
import { ProfilepageComponent } from './profilepage/profilepage.component';
export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'article', component: ArticleComponent },
    { path: 'signein', component: SigneinComponent },
    { path: 'about', component: AboutComponent },
    { path: 'fishman', component: FishmanComponent },
    { path: 'people', component: PeopleComponent },
    { path: 'game', component: GameComponent },
    { path: 'profilepage', component: ProfilepageComponent },
];

@NgModule({
    imports:[RouterModule.forRoot(routes)
        
    ],
    exports:[RouterModule]
})
export class AppRoutingModule{

}