import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'IAMFrontend';
  cards=[
    {
      id_number:"245687",
      title_name:"NDE bearing distressed",
      subtitle_name:"Distilation Tower Plant/Coker Unit",
      tag_name:"High Risk"
    
      },
      {
        id_number:"245687",
      title_name:"RCA Name",
      subtitle_name:"Distilation Tower Plant/Coker Unit",
      tag_name:"High Risk"

      }
  ]
 
  

  

}
