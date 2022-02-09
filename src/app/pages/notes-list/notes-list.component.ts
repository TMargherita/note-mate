import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Note } from 'src/app/shared/note.module';
import { NotesService } from 'src/app/shared/notes.service';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.scss'],
  animations: [
    trigger('itemAnim',[
      // entry animation
      transition('void => *', [
        // set inital state
        style({
          height: 0,
          opacity: 0,
          transform: 'scale(0.85)',
          'margin-bottom': 0,
          // expand out oadding properties
          paddingTop: 0,
          paddingBottom: 0,
          paddingLeft: 0,
          paddingRight: 0
        }),
        // we first want to animate the spacing (which include height and margin)
        animate('50ms', style({
          // * it measn the height of element
          height: '*',
          'margin-bottom': '*',
          paddingTop: '*',
          paddingBottom: '*',
          paddingLeft: '*',
          paddingRight: '*'
        })),
        animate(80)
      ]),
      transition('* => void', [
        // scale up 
        animate(50, style({
          transform: 'scale(1.05)'
        })),
        // scale down to normal size while fading out
        animate(50, style({
          transform: 'scale(1)',
          opacity: 0.75
        })),
        // scale down and fade out
        animate('120ms ease-out', style({
          
          transform: 'scale(0.68)',
          opacity: 0
        })),
        // then animate  spacing
        animate('150ms ease-out', style({
          height: 0,
          // expand out oadding properties
          paddingTop: 0,
          paddingBottom: 0,
          paddingLeft: 0,
          paddingRight: 0,
          'margin-bottom': 0,
        }))
      ])
    ]),
    trigger('listAnim', [
      transition('* => *', [
        query(':enter', [
          style({
            opacity: 0,
            height: 0
          }),
          stagger(100, [
            animate('0.2s ease-out')
          ])
        ], {
          optional: true
        })
       
      ])
    ])
  ]
})
export class NotesListComponent implements OnInit {

  notes: Note[] = new Array<Note>();
  filteredNotes: Note[] = new Array<Note>();
  noteCountObj: any;

  constructor(private notesService: NotesService) { }

  ngOnInit(): void {
    //  we want to retrieve all notes from NotesService
    this.notes = this.notesService.getAll();
    this.filteredNotes = this.notes;
  }

  deleteNote(id: number) {
    this.notesService.delete(id);
  }

  filter(query: string) {
    query = query.toLowerCase().trim();
    let allRes: Note[] = new Array<Note>();
    // split up the search query into individual words
    // split on spaces
    let terms: string[] = query.split(''); 
    // remove duplicate search terms
    terms = this.removeDuplicates(terms);
    // compile all relevant results from all results
    terms.forEach(term => {
      let results: Note[] = this.relevantNotes(term);
      // append results to all results
      allRes = [...allRes, ...results];
    });

    // all results include duplicate notes
    // a particular notes can be the result of many search
    // we don't want to show many times
    // we first must remove duplicates
    let uniqueRes = this.removeDuplicates(allRes);
    this.filteredNotes = uniqueRes;
  }

  removeDuplicates(arr: Array<any>): Array<any> {
    let uniqueRes: Set<any> = new Set<any>();

    // loop through input array and add the items
    arr.forEach(e => uniqueRes.add(e));

    return Array.from(uniqueRes)
  }

  relevantNotes(query: string): Array<Note> {
    query = query.toLowerCase().trim();
    let relevantNotes = this.notes.filter( note => {
      if(note.title && note.title.toLowerCase().includes(query)) {
        return true;
      }
      if(note.body && note.body.toLowerCase().includes(query)) {
        return true;
      }

        return false;
    })

    return relevantNotes
  }

  
  
}
