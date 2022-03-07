import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

    navbarMenu: any = [];

    sidebarMenu: any = [];
    isSidebarOpen: boolean = true;

    constructor() {
        this.navbarMenu = [
            {
                Id: 1, NamaMenu: "Home", Url: "admin/dashboard/home",
            },
            {
                Id: 2, NamaMenu: "Berita", Child: [
                    { ChildId: 1, NamaMenu: "Input Berita", Url: "admin/dashboard/input-berita" },
                    { ChildId: 2, NamaMenu: "Data Berita", Url: "admin/dashboard/data-berita" },
                ]
            },
            {
                Id: 3, NamaMenu: "Iklan", Child: [
                    { ChildId: 3, NamaMenu: "Input Iklan", Url: "admin/dashboard/input-berita" },
                    { ChildId: 4, NamaMenu: "Data Iklan", Url: "admin/dashboard/data-berita" },
                ]
            },
            {
                Id: 4, NamaMenu: "Keluhan Warga", Child: [
                    { ChildId: 5, NamaMenu: "Data Keluhan Warga", Url: "admin/dashboard/data-keluhan-warga" },
                ]
            },
            {
                Id: 5, NamaMenu: "Profile", Child: [
                    { ChildId: 6, NamaMenu: "Logout", Url: "Logout", Action: "Logout" }
                ]
            },
        ];

        this.sidebarMenu = [
            { Id: 1, NamaMenu: "Input Berita", Url: "admin/dashboard/input-berita" },
            { Id: 2, NamaMenu: "Input Iklan", Url: "admin/dashboard/input-iklan" },
            { Id: 3, NamaMenu: "Input Popular Posts", Url: "admin/dashboard/input-popular-posts" },
            { Id: 4, NamaMenu: "Logout", Url: "Logout", Action: "Logout" },
        ];
    }

    ngOnInit(): void {
    }

    onOpenSidebar(args: any) {
        this.isSidebarOpen = !this.isSidebarOpen;
    }
}
