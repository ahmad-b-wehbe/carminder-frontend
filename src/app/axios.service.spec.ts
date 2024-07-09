import { TestBed } from '@angular/core/testing';

import { AxiosService } from './axios.service';

describe('AxiosService', () => {
  let service: AxiosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AxiosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have a request method', () => {
    expect(service.request).toBeDefined();
  });

  it('should have a request method that returns a promise', () => {
    expect(service.request('GET', 'http://localhost:8080/', {})).toBeInstanceOf(Promise);
  });

  it('should have a request method that returns a promise that resolves to an object', () => {
    service.request('GET', 'http://localhost:8080/', {}).then(response => {
      expect(typeof response).toBe('object');
    });
  });
});
