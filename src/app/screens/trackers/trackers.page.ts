import {Component} from '@angular/core';
import {App} from '../../app';
import {StringUtils} from '../../utils/string-utils';
import {Locale} from '../../locale/locale';
import {FileIo} from '../../io/file-io';
import {ActionSheetController} from '@ionic/angular';
import {Modal} from '../modal';

@Component({
  selector: 'app-trackers',
  templateUrl: 'trackers.page.html'
})
export class TrackersPage {
  get app() { return App; }
  get stringUtils() { return StringUtils; }

  /**
   * Text used to filter tracker by its name.
   */
  public search: string = '';

  /**
   * Open action sheet with options to edit the tracker.
   */
  public openActionSheet: Function = () => {
    let controller = new ActionSheetController();
    controller.create({
      header: Locale.get('options'),
      buttons: [
        {
          text: Locale.get('import'),
          icon: 'download',
          handler: () => {
            FileIo.read((result) => {
              try {
                // @ts-ignore
                let tracker = JSON.parse(result);
                App.trackers.push(tracker);
                App.store();
              } catch (e) {
                Modal.alert(Locale.get('error'),  Locale.get('errorImport'));
              }
            }, '.json');

          }
        }
      ]
    }).then((actionSheet) => {
      actionSheet.present();
    });
  };

  /**
   * Update the search term used.
   *
   * @param event DOM event.
   */
  public onSearch(event) {
    this.search = event.target.value;
  }
}
