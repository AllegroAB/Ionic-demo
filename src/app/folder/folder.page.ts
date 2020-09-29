import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;
  public inbox: Boolean;
  public others: Boolean;
  public unread: Boolean;
  public user: string;
  public sentItems : any;
  public inbox : any = [];

  constructor(private activatedRoute: ActivatedRoute, private photoViewer: PhotoViewer, private navCtrl: NavController) {
    this.unread = true; 
    this.getSentItems();
  }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
    // checking the route for Inbox to show items specific to that and hiding the rest
    if(this.folder == "Inbox"){
      this.inbox = true;
      this.others = false;
    }
    else{
      this.inbox = false;
      this.others = true; 
    }
  }

  // get the user and the mail list from local storage
  getSentItems(){
    this.user = JSON.parse(localStorage.getItem("user"));
    this.sentItems = JSON.parse(localStorage.getItem("sent"));
  }

  // image viewer
  showAttachment(url, name){
    this.photoViewer.show(url, name, {share: false});
  }

  // placeholder method to get inbox items
  getInbox(){
    this.inbox = JSON.parse(localStorage.getItem("sent"));
  }

  // thread to show the selected message
  showThread(item){
    localStorage.setItem("message",JSON.stringify(item));
    this.navCtrl.navigateForward('sent');
  }

}
