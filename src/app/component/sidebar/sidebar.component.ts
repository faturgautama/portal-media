import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

    @Input("isSidebarOpen") isSidebarOpen: boolean;
    @Input("sidebarHeader") sidebarHeader: string;
    @Input("sidebarMenu") sidebarMenu: any = [];

    constructor(private router: Router,
        private authService: AuthService) { }

    ngOnInit(): void {
    }

    onNavigatePage(item: any) {

        if (item.Url == "Logout" && item.Action == "Logout") {
            this.authService.Logout();
        } else {
            this.router.navigateByUrl(item.Url);
        }

        setTimeout(() => {
            this.isSidebarOpen = true;
        }, 100);
    }

}
