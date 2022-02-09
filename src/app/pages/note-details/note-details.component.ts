import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Note } from 'src/app/shared/note.module';
import { NotesService } from 'src/app/shared/notes.service';

@Component({
  selector: 'app-note-details',
  templateUrl: './note-details.component.html',
  styleUrls: ['./note-details.component.scss']
})
export class NoteDetailsComponent implements OnInit {

  note: Note = new Note;
  noteId!: number;
  // to check if exist or not
  // to check if exist or not
  new!: boolean;

  constructor(private notesService: NotesService, private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {

    // find out if we are creating or editing an existing one
    // bu checking route param
    this.route.params.subscribe((params: Params) => {
      
      this.note = new Note();
      if(params.id) {
        this.note = this.notesService.get(params.id);
        this.noteId = params.id;
        this.new = false;
      } else {
        this.new = true;
      }
    })

  }


  onSubmit(form: NgForm) {
    // console.log(form);
    if(this.new) {
      // Save the Note with Service
      this.notesService.add(form.value);

    } else {
      // update the note
      this.notesService.update(this.noteId, form.value.title, form.value.body);
    }
    this.router.navigateByUrl('/');
  }

  cancel(){
    this.router.navigateByUrl('/');
  }
}
