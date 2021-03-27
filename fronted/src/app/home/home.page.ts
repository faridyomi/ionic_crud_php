import {Component, OnInit} from '@angular/core';
import {Student, StudentService} from "../services/student.service";
import {AlertController, ModalController} from "@ionic/angular";
import {StudentPage} from "../student/student.page";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  students: Student[];

  constructor(private service:StudentService, private alertCtrl: AlertController, private modalCtrl:ModalController) {

  }

  ngOnInit(): void {
    this.service.getAll().subscribe(response =>{
      this.students = response;
    })
  }

  addStudent(){
    this.modalCtrl.create({
      component: StudentPage
    }).then(modal =>{
      modal.present();
      return modal.onDidDismiss();
    }).then(({data, role})=>{
      if(role === 'created'){
        this.students.push(data);
      }
    });
  }

  removeStudent(id:string){
    this.alertCtrl.create({
      header: 'Delete',
      message: 'Are you sure ?',
      buttons: [{
        text: 'Yes',
        handler: () => {
          this.service.remove(id).subscribe(()=>{
              this.students = this.students.filter(std => std.id !== id);
            }
          );
        }
      },
      {text : 'No'}
      ]
    }).then(alertEl => alertEl.present());

  }

  editStudent(student:Student){
    this.modalCtrl.create({
      component: StudentPage,
      componentProps: { student }
    }).then(modal =>{
      modal.present();
      return modal.onDidDismiss();
    }).then(({data, role})=>{
      this.students=this.students.filter(std =>{
        if(data.id === std.id){
          return data;
        }
        return std;
      })
    });
  }
}
