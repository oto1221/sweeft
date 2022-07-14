import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, AfterViewInit {
  
  @ViewChildren('theLastList', { read: ElementRef })
  theLastList!: QueryList<ElementRef>;
  totalPages!: number;
  currentPage: number = 1;

  observer: any;
  router: any;

  constructor(private service:UsersService) { }
  ngAfterViewInit() {
    this.theLastList?.changes.subscribe((d) => {
      console.log(d);
      if (d.last) this.observer.observe(d.last.nativeElement);
    });
  }

  data:any = []
  ngOnInit(): void {
    this.Getuser();
    this.intersectionObserver();
  }
  Getuser(){
    this.service.GetUsers(this.currentPage).subscribe(res => {
      //this.data = res.list
      this.totalPages = res.pagination.pageSize;
      console.log(this.totalPages);
      res.list.forEach((element: any) => {
        this.data.push(element);
      });
    })
  }

  intersectionObserver() {
    let options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    };
    this.observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        if (this.currentPage < this.totalPages) {
          this.currentPage++;
          console.log(this.currentPage);
          
          
          this.Getuser();
        }
      }
    }, options);
  }
  userDetails(id: any) {
    this.router.navigate([`details/${id}`]);
    
  }
}
