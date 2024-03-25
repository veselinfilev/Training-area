import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../courses.service';
import { ActivatedRoute, Router } from '@angular/router';
import Course from '../types';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})

export class DetailsComponent implements OnInit {
  course: any;
  courseId: string | null = null;
  isOwner:boolean = false;
  isGuest:boolean = true
  userId:string = '';



  constructor(
    private coursesServices: CoursesService,
    private rout: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.checkUser();

    this.courseId = this.rout.snapshot.paramMap.get('id');
    this.coursesServices.getOneCourse(this.courseId).subscribe((data) => {
      this.course = data as Course;
      this.isOwner = this.course._ownerId === this.userId;
    });
  }

  handelDelete(): void {
    const courseId = this.rout.snapshot.paramMap.get('id');
    this.coursesServices.deleteCourse(courseId).subscribe(
      () => {
        this.router.navigate(['/catalog'])
      },
      error => {
        if(error.error.code = 403){
          alert('You don\'t nave permission to delete this course')
        }else{
          alert(error.error.message);
        }
      }
    );
  }

  handleBuy():void{
    
  }

  checkUser(){
    if(localStorage.getItem('user')){
      this.userId = JSON.parse(localStorage.getItem('user')!)._id;
      this.isGuest = false;
    }
  }
}
