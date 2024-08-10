import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import axios from 'axios';

@Injectable({
    providedIn: 'root'
})
export class LoginService {
    private loginUrl = `${environment.baseurl}/login`;

    async login(email: string, password: string) {
        const body = { email, password };
        return await axios.request({
            method: "POST",
            url: this.loginUrl,
            data: body
        });
    }
}