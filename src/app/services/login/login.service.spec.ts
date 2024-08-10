import { TestBed } from "@angular/core/testing";
import { LoginService } from "./login.service";
import axios from 'axios';
import { environment } from "../../../environments/environment";

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("LoginService", () => {
    let loginService: LoginService;

    beforeEach(() => {
        TestBed.configureTestingModule({providers: [LoginService]});
        loginService = TestBed.inject(LoginService);
    });

    it('should be created', () => {
        expect(loginService).toBeTruthy();
    });

    it('should call axios with the correct URL and data', async () => {
        const email = 'test@example.com';
        const password = 'password123';
        const response = { data: { token: 'mockToken' } };

        mockedAxios.request.mockResolvedValue(response);

        const result = await loginService.login(email, password);

        expect(mockedAxios.request).toHaveBeenCalledWith({
            method: 'POST',
            url: `${environment.baseurl}/login`,
            data: { email, password },
        });
        expect(result).toEqual(response);
    });

    it('should handle axios errors', async () => {
        const email = 'test@example.com';
        const password = 'password123';
        const errorMessage = 'Network Error';

        mockedAxios.request.mockRejectedValue(new Error(errorMessage));

        await expect(loginService.login(email, password)).rejects.toThrow(errorMessage);
    });
});
