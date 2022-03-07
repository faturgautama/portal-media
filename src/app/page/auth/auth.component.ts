import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthResponseData, AuthService } from 'src/app/service/auth.service';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

    authenticationMode: boolean = true;
    error: string = null;
    isLoading: boolean = false;

    constructor(private router: Router, private authService: AuthService) { }

    ngOnInit(): void {
    }

    onSwitchMode() {
        this.authenticationMode = !this.authenticationMode;
    }

    onSubmitForm(form: NgForm) {
        if (!form.valid) {
            return;
        }

        let username = form.value.email;
        let password = form.value.password;

        this.isLoading = true;

        let authObservable: Observable<AuthResponseData>;

        authObservable = this.authService.Login(username, password);

        authObservable.subscribe((_user) => {
            this.isLoading = false;

            this.router.navigateByUrl('admin/dashboard/home');

        }, (pesanError) => {
            console.log(pesanError);

            this.isLoading = false;
            this.error = pesanError;
        });

        form.reset();
    }

    onHideErrorMessage() {
        return this.error = null;
    }
}
