import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "../service/auth.service";
import { StorageEncryptionService } from "../service/storage-encryption.service";

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

    constructor(private authService: AuthService,
        private router: Router,
        private storageEncryptionService: StorageEncryptionService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        const currentUser = JSON.parse(this.storageEncryptionService.getItem("userData"));

        if (currentUser) {
            return true;
        }

        this.router.navigate(['admin/login'], { queryParams: { returnUrl: state.url } });

        return true;
    }
}