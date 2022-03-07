import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AuthService } from './service/auth.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { NumericTextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { RichTextEditorModule } from '@syncfusion/ej2-angular-richtexteditor';

import { environment } from 'src/environments/environment';

import { AppComponent } from './app.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { SinglePageComponent } from './component/single-page/single-page.component';
import { SingleCardComponent } from './component/single-card/single-card.component';
import { SingleCardReadMoreComponent } from './component/single-card-read-more/single-card-read-more.component';
import { SocialLinksComponent } from './component/social-links/social-links.component';
import { RecentPostComponent } from './component/recent-post/recent-post.component';
import { NewsletterComponent } from './component/newsletter/newsletter.component';
import { SidebarComponent } from './component/sidebar/sidebar.component';
import { ErrorPageComponent } from './component/error-page/error-page.component';
import { CategoryPageComponent } from './component/category-page/category-page.component';
import { FooterComponent } from './component/footer/footer.component';
import { CarouselComponent } from './component/carousel/carousel.component';
import { AdminComponent } from './page/admin/admin.component';
import { AuthComponent } from './page/auth/auth.component';
import { PortalComponent } from './page/portal/portal.component';
import { DashboardComponent } from './page/admin/dashboard/dashboard.component';
import { HomeComponent } from './page/admin/home/home.component';
import { InputBeritaComponent } from './page/admin/berita/input-berita/input-berita.component';
import { DataBeritaComponent } from './page/admin/berita/data-berita/data-berita.component';
import { LoadingComponent } from './component/loading/loading.component';

import { FirebaseTokenInterceptor } from './interceptor/firebase.interceptor';
import { WhatsappFloatingComponent } from './component/whatsapp-floating/whatsapp-floating.component';
import { IklanComponent } from './page/admin/iklan/iklan.component';
import { KeluhanComponent } from './page/keluhan/keluhan.component';
import { KeluhanWargaComponent } from './page/admin/keluhan-warga/keluhan-warga.component';

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        SinglePageComponent,
        SingleCardComponent,
        SingleCardReadMoreComponent,
        SocialLinksComponent,
        RecentPostComponent,
        NewsletterComponent,
        SidebarComponent,
        ErrorPageComponent,
        CategoryPageComponent,
        FooterComponent,
        CarouselComponent,
        AdminComponent,
        AuthComponent,
        PortalComponent,
        DashboardComponent,
        HomeComponent,
        InputBeritaComponent,
        DataBeritaComponent,
        LoadingComponent,
        WhatsappFloatingComponent,
        IklanComponent,
        KeluhanComponent,
        KeluhanWargaComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        NgbModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFirestoreModule,
        AngularFireStorageModule,
        NumericTextBoxModule,
        HttpClientModule,
        RichTextEditorModule
    ],
    providers: [
        AuthService,
        { provide: HTTP_INTERCEPTORS, useClass: FirebaseTokenInterceptor, multi: true },

    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
