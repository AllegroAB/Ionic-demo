import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {

  public form  : FormGroup;
  public images: any = [];
  public users: any = [];
  public cc: any = [];
  public searchTerm: string;
  public subject: string;
  public msg: string;
  public sentTime: Date;
  public sentItems: any = [];

  public toList: any = [];

  public show: Boolean;
  public showList: Boolean;
  public attachment: Boolean;

  public contacts: any = [{Id:1,FirstName:"Billy", LastName:"Keily", Email:"billy@invisionapp.com", Avatar:"../assets/billy.png"},
  {Id:2,FirstName:"Matte", LastName:"Vickers", Email:"matt@invisionapp.com", Avatar:"../assets/matt.png"},
  {Id:3,FirstName:"Manatee", LastName:"Sweater", Email:"manatee@invisionapp.com", Avatar:"../assets/manatee.png"}];
  
  public files : any = [{Id:1, Name:"File1", File:"../assets/billy.png"}];

  constructor(private emailComposer: EmailComposer, private navCtrl: NavController, private imagePicker: ImagePicker) { 
    this.showList = false;
    this.show = false;
    this.attachment = false;
  }

  ngOnInit() {
  }

   // method to pick photo from gallery
  attachFile(){ 
    this.attachment = true;
    this.imagePicker.getPictures({
    }).then( results =>{
      for(let i=0; i < results.length;i++){
        this.images.push(results[i]);
      };
    });
  }

  // assigns selected contact in the "To:" field
  assignContact(user){
    this.searchTerm = "";
    this.toList.push(user);
    this.show = true;
    this.showList = false;
    this.sentTime = new Date();
  }

  // remove assigned contact
  removeContact(){
    this.toList.splice(-1,1);
    if(this.toList.length >= 1)
      this.show = true;
    else
      this.show = false;
  }

  // send mail to the recipients
  sendMail(){
    this.sentItems.push({
      from:JSON.parse(localStorage.getItem("user")),
      to:this.toList,
      subject:this.subject,
      attachments:this.attachment == true ? this.files : null,
      message: this.msg,
      cc:this.cc,
      time:new Date()
    });
    
    // saving the mail contents locally
    localStorage.setItem("sent",JSON.stringify(this.sentItems));
    if(this.sentItems.subject != "" || this.sentItems.subject != null){
      this.navCtrl.navigateForward('/folder/Inbox');
    }
  }

  // search and filter contacts
  contactSearch(ev: CustomEvent) {
    const val = ev.detail.value;
  
    if (val && val.trim() !== '') {
      this.users = this.contacts.filter(a => {
        this.showList = true;
        return a.Email.toLowerCase().indexOf(val.trim().toLowerCase()) > -1;
      });
    }
    else
      this.showList = false;
  }
}


