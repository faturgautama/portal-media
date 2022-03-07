import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

    @Input("navbar-brand") navbarBrand: string;
    @Input("navbar-menu") navbarMenu: any = [];
    @Input("isAdmin") isAdmin: boolean = true;
    @Input("isHidden") isHidden: boolean = false;

    @Output("onClickBars") onClickBars = new EventEmitter<any>();

    constructor(private router: Router, private authService: AuthService) { }

    ngOnInit(): void {
    }

    onOpenSidebar(args: any) {
        this.onClickBars.emit(args);
    }

    onNavigatePage(args: any, child: any) {
        if (child.Url == "Logout" && child.Action == "Logout") {
            this.authService.Logout();
        } else {
            this.router.navigateByUrl(child.Url);
        }
    }

    onOpenMenuNavbar(menu: any) {
        this.router.navigateByUrl(menu.Url);
    }
}
