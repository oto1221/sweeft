import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit,AfterViewInit {
  data:any = []
  user:any = []
  id: number = this.activatedrouter.snapshot.params['id'];
  saveduser:any = []
  @ViewChildren('theLastList', { read: ElementRef })
  theLastList!: QueryList<ElementRef>;
  totalPages!: number;
  currentPage: number = 1;
  friendid:any = [];
  observer: any;
  router: any;
  constructor(private activatedrouter: ActivatedRoute,private service:UsersService, private r:Router) { }

  ngOnInit(): void {

    this.Getuserbyid(this.id);
    this.GetFriends(this.id);
   
    
    this.intersectionObserver();
  }
  ngAfterViewInit() {
    this.theLastList?.changes.subscribe((d) => {
      console.log(d);
      if (d.last) this.observer.observe(d.last.nativeElement);
    });
  }

  Getuserbyid(id:number){
    this.service.GetUserById(id).subscribe(res => {
      this.user = res
      this.friendid.push(id)
      let obj = {
        prefix:res.prefix,
        name:res.name,
        lastName:res.lastName,
        id:res.id
      }
      this.saveduser.push(obj)
      console.log(this.saveduser);
      
    })
  }
  GetFriends(id:any){
    this.service.GetUserFriends(this.currentPage,id).subscribe(res => {
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
          
          
          this.GetFriends(this.id);
        }
      }
    }, options);
  }
  userDetails(id: any) {
    
    this.r.navigate([`/details/${id}`]); 
    this.Getuserbyid(id);
    this.data.splice(0)
    this.GetFriends(id)
    
  }
  
      
    
  
}
