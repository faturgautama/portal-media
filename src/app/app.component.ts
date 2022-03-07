import { Component, OnInit } from '@angular/core';
import * as AOS from 'aos';
import { AuthService } from './service/auth.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    title = 'PORTAL-MEDIA';

    isSidebarOpen: boolean = true;

    constructor(private authService: AuthService) { }

    ngOnInit() {
        this.authService.autoLogin();

        AOS.init();
    }

    onOpenSidebar(args: any) {
        this.isSidebarOpen = !this.isSidebarOpen;
    }
}
