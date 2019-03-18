import {Injectable} from '@angular/core';
import {Widget} from '../models/widget.model.client';

@Injectable()
export class WidgetService {

  widgets: Widget[] = [
    new Widget('123', 'HEADER', '321', '2', 'GIZMODO'),
    new Widget('234', 'HEADER', '321', '4', 'Lorem ipsum'),
    new Widget('456', 'IMAGE', '321', '2', 'text', '100%',
        'ttp://lorempixel.com/400/200/'),
    new Widget('678', 'HTML', '321', '4', '<p>Lorem ipsum</p>'),
    new Widget('789', 'YOUTUBE', '321', '2', 'text', '100%', 'https://youtu.be/AM2Ivdi9c4E')
  ];


  createWidget(pageId: string, widget: Widget) {
    this.widgets.push(widget);
  }

  findWidgetsByPageId(pageId: string) {
    const resultSet = [];
    for (const i in this.widgets) {
      if (this.widgets[i].pageId === pageId) {
        resultSet.push(this.widgets[i]);
      }
    }
    return resultSet;
  }

  findWidgetById(widgetId: string) {
    for (const i in this.widgets) {
      if (this.widgets[i]._id === widgetId) {
        return this.widgets[i];
      }
    }
  }

  updateWidget(widgetId: string, widget: Widget) {
    for (const i in this.widgets) {
      if (this.widgets[i]._id === widgetId) {
        switch (widget.widgetType) {
          case 'HEADING':
            this.widgets[i].pageId = widget.pageId;
            this.widgets[i].size = widget.size;
            this.widgets[i].text = widget.text;
            return true;
          case 'IMAGE':
            this.widgets[i].pageId = widget.pageId;
            this.widgets[i].width = widget.width;
            this.widgets[i].url = widget.url;
            return true;
          case 'HTML':
            this.widgets[i].pageId = widget.pageId;
            this.widgets[i].text = widget.text;
            return true;
          case 'YOUTUBE':
            this.widgets[i].pageId = widget.pageId;
            this.widgets[i].width = widget.width;
            this.widgets[i].url = widget.url;
            return true;
        }
      }
    }
    return false;
  }

  deleteWidget(widgetId: string) {
    for (const i in this.widgets) {
      if (this.widgets[i]._id === widgetId) {
        const j = +i;
        this.widgets.splice(j, 1);
      }
    }
  }
}
