import { HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { exhaustMap, take } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { AuthService } from "../service/auth.service";
import { StorageEncryptionService } from "../service/storage-encryption.service";

@Injectable()
export class FirebaseTokenInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService,
        private storageEncryptionService: StorageEncryptionService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler) {
        const userData = JSON.parse(this.storageEncryptionService.getItem("userData"));

        const isKeluhanUrl = request.url.startsWith(environment.firebaseRtdbKeluhanUrl);

        if (!userData || isKeluhanUrl) {
            return next.handle(request);
        } else {
            const modifiedRequest = request.clone({
                params: new HttpParams().set('auth', userData._token)
            })

            return next.handle(modifiedRequest);
        }
    }
}