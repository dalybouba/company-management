import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { modaliteDePaiement } from 'src/app/models/modaliteDePaiement.model';
import { SocieteService } from 'src/app/services/societe.service';

@Component({
  selector: 'app-modalite-paiement',
  templateUrl: './modalite-paiement.component.html',
  styleUrls: ['./modalite-paiement.component.css']
})
export class ModalitePaiementComponent implements OnInit {
modePaiement:modaliteDePaiement[];
modePaiementB:boolean=false;
ID:any;
modePaiements:modaliteDePaiement;
modaliteDePaiementForm:FormGroup
searchableList: any;
searchText: string = "";
searchTerm: string;
page = 1;
pageSize = 5;
collectionSize: number;
currentRate = 8

  constructor(
    private societeServices:SocieteService,
    private activatedRoute:ActivatedRoute,
    private formBuilder: FormBuilder,
    private router:Router,
    ) { }

  ngOnInit(): void {
    this.societeServices.findModaliteDePaiement().subscribe(
      data=>{
        this.modePaiement=data;
      }
    );
this.ID=this.activatedRoute.snapshot.paramMap.get('ID')
this.societeServices.findNumeromodaliteDePaiement(this.ID).subscribe(
  data=>{
this.modePaiements=data;
  }
);

this.modaliteDePaiementForm=this.formBuilder.group({
  Code:[''],
  Intitule:[''],
  Description:[]
});

  }


  currentSection = 'section1';
  onSectionChange(sectionId: string) {
    this.currentSection = sectionId;
  }

  scrollTo(section) {
    document.querySelector('#' + section)
    .scrollIntoView();
  }

  creat(){
   // this.router.navigate([`settings/company/modaliteDePaiement`]);
    this.ID=false;
return this.modePaiementB=true;
  }

  edit(ID:number){
    //this.router.navigate([`devise/${Numero}`]);
    this.router.navigateByUrl('settings/company/paymentmethods', { skipLocationChange: true }).then(() => {
      this.router.navigate([`settings/company/paymentmethods/${ID}`]);
  }); 

  }
  validateEdit(){
    console.log(this.modePaiements)
    this.societeServices.updatemodaliteDePaiement(this.modePaiements).subscribe(
      (data)=>{
        console.log(data);
        this.router.navigate([`settings/company/paymentmethods`]);
      }
    );

  }


  validateCreat(modaliteDePaiement:any){

    this.societeServices.creatmodaliteDePaiement(modaliteDePaiement).subscribe(
      ()=>{
        this.router.navigate([`settings/company/paymentmethods`]);
        return this.modePaiementB=false;
      }
    );
  }
  
  delete(id: string) {
    if(confirm("Are you sure to delete "+id)){
    this.societeServices.deletemodaliteDePaiement(id).subscribe(res => {
      if (res) {
        this.societeServices.findModaliteDePaiement().subscribe(
          data=>{
            this.modePaiement=data;
           
          }
          
        );
      }
    })}}

}
