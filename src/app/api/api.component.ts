import { Component, Input, OnInit } from '@angular/core';
import { Result } from '../interfaces/api.interface';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-api',
  templateUrl: './api.component.html',
  styleUrls: ['./api.component.css']
})
export class ApiComponent implements OnInit {

  personajes!: Result[];
  previous: any = false;
  next: any = true;
  pages!: any;
  paginacion: any[] = [];
  @Input() pageChange!: any;
  busqueda: string = '';
  
  page = 1;
  pageSize = 12;

  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.getPersonajes();
    console.log(this.personajes);
    
  }

  getPersonajes( pages:string = '0', name = ''){
    this.personajes = [];
    this.paginacion = [];
    this.apiService.getCharacter( pages, name ).subscribe(
      data => {
        this.personajes = data.results;
        this.previous = data.info.prev;
        this.next = data.info.next;
        this.pages = data.info.pages;

        for (let i = 1; i <= data.results.length; i++) {
          this.paginacion.push({
            page: i,
            url: `https://rickandmortyapi.com/api/character?page=${i}`
          });
        }
        
      },
      error => {
        console.log( error );
        
      }
    );
  }

  peticion( page_number:string, url:string ){
    this.getPersonajes( page_number );
  }

  peticionUrl( url:string ){
    console.log( url );
    
  }

  click(){
    // setTimeout(() => {
    //   this.getPersonajes( this.page.toString() );
    // }, 200);
  }

  buscarPersonaje(){
    this.getPersonajes( '0',this.busqueda);
    // this.apiService.getSingleCharacter( this.busqueda ).subscribe(
    //   data => {
    //     console.log( data );
        
    //   },
    //   error => {
    //     console.log( error );
        
    //   }
    // );
    
  }

}
