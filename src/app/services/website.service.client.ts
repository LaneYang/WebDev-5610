import {Injectable} from '@angular/core';
import {Website} from '../models/website.model.client';
import {HttpClient, HttpResponse} from '@angular/common/http';
import 'rxjs';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable()
export class WebsiteService {
    constructor(private _http: HttpClient) {}

    baseUrl = environment.baseUrl;


    websites = [
        new Website('001', 'Facebook', '001', 'Lorem'),
        new Website('123', 'Google', '001', 'Lorem'),
        new Website('321', 'Youtube', '123', 'Lorem'),
        new Website('456', 'Reddit', '222', 'Lorem')
    ];

    api = {
        'createWebsite' : this.createWebsite,
        'findWebsiteByUser' : this.findWebsiteByUser,
        'findWebsiteById' : this.findWebsiteById,
        'updateWebsite': this.updateWebsite,
        'deleteWebsite': this.deleteWebsite
    };

    createWebsite(userId: string, website: Website) {
        return this._http.post(this.baseUrl + '/api/user/' + userId + '/website', website);
    }

    findWebsiteByUser(userId: string) {
        return this._http.get(this.baseUrl + '/api/user/' + userId + '/website');
    }

    findWebsiteById(websiteId: string) {
        return this._http.get(this.baseUrl + '/api/website/' + websiteId);
    }

    updateWebsite(websiteId: string, website: Website) {
        return this._http.put(this.baseUrl + '/api/website/' + websiteId, website);
    }

    deleteWebsite(websiteId: string) {
        return this._http.delete(this.baseUrl + '/api/website/' + websiteId);
    }































}
