import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { Axios } from "axios";

@Injectable({
    providedIn: 'root'
})
export class LoginService {
    private loginUrl = `${environment.baseurl}/login`;

    constructor(private axios: Axios) { }

    login(email: string, password: string) {
        const body = { email, password };
        return this.axios.request({
            method: "POST",
            url: this.loginUrl,
            data: body
        });
    }
}