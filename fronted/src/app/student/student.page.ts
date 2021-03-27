import {Component, Input, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {ModalController} from "@ionic/angular";
import {Student, StudentService} from "../services/student.service";

@Component({
  selector: 'app-student',
  templateUrl: './student.page.html',
  styleUrls: ['./student.page.scss'],
})
export class StudentPage implements OnInit {

  @Input() student: Student;
  isUpdate = false;
  data = {
    first_name: '',
    last_name: '',
    address: '',
    phone: 0,
    class: '',
  };
  constructor(private service: StudentService,private modalCrtl: ModalController) { }

  ngOnInit() {
    console.log(this.student);
    if(this.student){
      this.isUpdate=true;
      this.data=this.student;
    }
  }

  onSubmit(form: NgForm){
    const student = form.value;
    if(this.isUpdate){
      this.service.update(student, this.student.id).subscribe(response=>{
        student.id=this.student.id;
        this.modalCrtl.dismiss(student, 'updated');
      });
    } else {
      this.service.create(student).subscribe(response =>{
        this.modalCrtl.dismiss(response,"created");
      });
    }


  }

  closeModal(){
    this.modalCrtl.dismiss(null, 'closed');
  }

}
