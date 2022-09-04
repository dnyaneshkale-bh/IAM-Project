import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any,filteredString:string,bool:boolean,countCards:number){
  
    countCards=0;
    let newval: any=[];
    if(bool===true)
    {
      value.forEach((v:any) => {
        console.log("in if");
        
        if(v.status==="open")
        newval.push(v);
        countCards++;
        console.log(countCards);
      });
    }
    else
    {
      value.forEach((v:any) => {
        console.log("in else");
        
        if(v.status==="closed")
        newval.push(v);
        countCards++;
        console.log(countCards);
        
        
      });
    }
   
    
    if(newval.length ===0 ||  filteredString==='' )
    return newval;
  // {
    //   rca_id:"245687",
    //   rca_name:"NDE bearing distressed",
    //   facility_name:"Distilation Tower Plant/Coker Unit",
    //   severity:"High Risk",
    //   status:"open"
    
    //   },
 
  const cards=[];
  for (const card of newval) {
    if(card['status']==='open')
    {
      // if(card['rca_id']==filteredString )
      if((card['rca_id']).toString().toUpperCase().includes(filteredString.toUpperCase()) || (card['rca_name']).toString().toUpperCase().includes(filteredString.toUpperCase()) || 
         (card['facility_name']).toString().toUpperCase().includes(filteredString.toUpperCase()) || (card['severity']).toString().toUpperCase().includes(filteredString.toUpperCase()) )
        cards.push(card);
    }
    else
    {
      if((card['rca_id']).toString().toUpperCase().includes(filteredString.toUpperCase()) || (card['rca_name']).toString().toUpperCase().includes(filteredString.toUpperCase()) || 
      (card['facility_name']).toString().toUpperCase().includes(filteredString.toUpperCase()) || (card['severity']).toString().toUpperCase().includes(filteredString.toUpperCase()) )
        cards.push(card); 
    }
    
  }
  return cards;
 }

}
