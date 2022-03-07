import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SinglePageComponent } from './component/single-page/single-page.component';
import { AuthGuard } from './guard/auth.guard';
import { AdminComponent } from './page/admin/admin.component';
import { DataBeritaComponent } from './page/admin/berita/data-berita/data-berita.component';
import { InputBeritaComponent } from './page/admin/berita/input-berita/input-berita.component';
import { DashboardComponent } from './page/admin/dashboard/dashboard.component';
import { HomeComponent } from './page/admin/home/home.component';
import { KeluhanWargaComponent } from './page/admin/keluhan-warga/keluhan-warga.component';
import { AuthComponent } from './page/auth/auth.component';
import { KeluhanComponent } from './page/keluhan/keluhan.component';
import { PortalComponent } from './page/portal/portal.component';

const routes: Routes = [
    { path: "", component: PortalComponent },
    { path: 'berita/', component: SinglePageComponent },
    { path: 'berita/:data', component: SinglePageComponent },
    {
        path: "admin", component: AdminComponent,
        children: [
            { path: 'login', component: AuthComponent },
            {
                path: 'dashboard', component: DashboardComponent,
                canActivate: [AuthGuard],
                children: [
                    { path: 'home', component: HomeComponent },
                    { path: 'input-berita', component: InputBeritaComponent },
                    { path: 'data-berita', component: DataBeritaComponent },
                    { path: 'detail-berita/', component: SinglePageComponent },
                    { path: 'detail-berita/:data', component: SinglePageComponent },
                    { path: 'input-iklan', component: DataBeritaComponent },
                    { path: 'input-popular-posts', component: DataBeritaComponent },
                    { path: 'data-keluhan-warga', component: KeluhanWargaComponent },
                ]
            },
        ]
    },
    { path: 'input-keluhan', component: KeluhanComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
