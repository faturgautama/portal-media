import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Admin } from '../model/admin.model';
import { StorageEncryptionService } from './storage-encryption.service';

export interface AuthResponseData {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    httpHeaders: any = new HttpHeaders();

    user: BehaviorSubject<Admin>;

    public currentUser: Observable<Admin>;

    private tokenExpirationTimer: any;

    constructor(private http: HttpClient,
        private router: Router,
        private storageEncryptionService: StorageEncryptionService) {

        this.httpHeaders = this.httpHeaders.set('Content-Type', 'Application/json');

        this.user = new BehaviorSubject<Admin>(JSON.parse(localStorage.getItem('userData')));
        this.currentUser = this.user.asObservable();
    }

    Login(email: string, password: string) {
        return this.http.post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBfHTpi0JfpkS8R61r08x-LQ6yYNIZ3M5o',
            {
                email: email + "@email.com",
                password: password,
                returnSecureToken: true,
            }
        ).pipe(
            catchError(this.handlingError),
            tap((resData) => {
                this.handlingAuth(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
            })
        )
    }

    Logout() {
        this.user.next(null);

        this.router.navigateByUrl('admin/login');

        this.storageEncryptionService.removeItem('userData');

        if (this.tokenExpirationTimer) {
            clearTimeout(this.tokenExpirationTimer);
        }
        this.tokenExpirationTimer = null;
    }

    autoLogin() {
        const userData: {
            email: string;
            id: string;
            _token: string;
            _tokenExpDate: string;
        } = JSON.parse(this.storageEncryptionService.getItem('userData'));

        if (!userData) {
            return;
        } else {
            const loadedUser = new Admin(
                userData.email,
                userData.id,
                userData._token,
                new Date(userData._tokenExpDate)
            );

            if (loadedUser._token) {
                this.user.next(loadedUser);

                const expDuration = new Date(userData._tokenExpDate).getTime() - new Date().getTime();

                this.autoLogout(expDuration);
            }
        }
    }

    autoLogout(expirationDuration: number) {
        this.tokenExpirationTimer = setTimeout(() => {
            this.Logout();
        }, expirationDuration);
    }

    private handlingAuth(email: string, userId: string, token: string, expiresIn: number) {
        const expiredDate = new Date(new Date().getTime() + expiresIn * 1000);

        const user = new Admin(email, userId, token, expiredDate);
        this.user.next(user);

        this.autoLogout(expiresIn * 1000);

        this.storageEncryptionService.setItem('userData', JSON.stringify(user));
    }

    private handlingError(errorResponse: HttpErrorResponse) {
        let pesanError = 'An Unknown Error Occured!';

        if (!errorResponse.error || !errorResponse.error.error) {
            return throwError(pesanError);
        }
        switch (errorResponse.error.error.message) {
            case 'EMAIL_EXISTS':
                pesanError = 'Maaf, Email Ini Sudah Terdaftar';
                break;
            case 'EMAIL_NOT_FOUND':
                pesanError = 'Maaf, Email Ini Belum Terdaftar';
                break;
            case 'INVALID_PASSWORD':
                pesanError = 'Oops... Password yg Anda Masukkan Salah';
                break;
        }
        return throwError(pesanError);
    }

}
