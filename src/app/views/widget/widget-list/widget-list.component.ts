import { Component, OnInit } from '@angular/core';
import {User} from '../../../models/user.model.client';
import {Website} from '../../../models/website.model.client';
import {Page} from '../../../models/page.model.client';
import {WebsiteService} from '../../../services/website.service.client';
import {UserService} from '../../../services/user.service.client';
import {PageService} from '../../../services/page.service.client';
import {ActivatedRoute, Router} from '@angular/router';
import {Widget} from '../../../models/widget.model.client';
import {WidgetService} from '../../../services/widget.service.client';
import {DomSanitizer, SafeResourceUrl, SafeStyle, SafeUrl} from '@angular/platform-browser';
import {Observable} from 'rxjs';
import {SharedService} from '../../../services/shared.service.client';

@Component({
  selector: 'app-widget-list',
  templateUrl: './widget-list.component.html',
  styleUrls: ['./widget-list.component.css']
  })
export class WidgetListComponent implements OnInit {

  user: User = new User('', '', '', '', '', '');
  website: Website = new Website('', '', '', '');
  page: Page = new Page('', '', '', '');
  widgets: Widget[] = [];
  styleValue: SafeStyle;
  videoUrl: SafeResourceUrl;

  constructor(private webService: WebsiteService, private userService: UserService, private sanitizer: DomSanitizer,
              private pageService: PageService, private widgetService: WidgetService, private route: ActivatedRoute,
              private router: Router, private sharedService: SharedService) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.userService.findUserById(this.sharedService.user._id).subscribe(
          (user: any) => {
            this.user = new User(user._id, user.username, user.password, user.firstName, user.lastName, user.email);
          }
      );
      this.webService.findWebsiteById(params['websiteId']).subscribe(
          (website: any) => {
            this.website = new Website(website._id, website.name, website.developerId, website.description);
          }
      );
      this.pageService.findPageById(params['pageId']).subscribe(
          (page: any) => {
            this.page = new Page(page._id, page.name, page.websiteId, page.description);
          }
      );
      this.widgetService.findWidgetsByPageId(params['pageId']).subscribe(
          (widgets: any[]) => {
              for(var i = 0; i < widgets.length; i++) {
                  const widget = widgets[i];
                  const newWid = new Widget(widget._id, widget.type, widget.pageId,
                      widget.size, widget.text, widget.width, widget.url, widget.name, widget.formatted, widget.rows, widget.placeholder);
                  this.widgets.push(newWid);
              }
          }
      );
    });
  }

  checkStyle(value: string) {
    this.styleValue = this.sanitizer.bypassSecurityTrustStyle(value);
    return this.styleValue;
  }

  checkVideoUrl(url: string) {




    this.videoUrl =
        this.sanitizer.bypassSecurityTrustResourceUrl(url);
    return this.videoUrl;
  }

    reorderItems(indexes) {
        this.widgetService.reorderWidget(this.page.pageId, indexes.startIndex, indexes.endIndex).subscribe(
            (widgets: any[]) => {
                this.router.navigate(['/profile/website/' + this.website.websiteId
                + '/page/' + this.page.pageId + '/widget']);
            }
        );
    }


}
