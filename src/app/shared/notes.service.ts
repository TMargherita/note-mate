import { Injectable } from '@angular/core';
import { Note } from './note.module';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  notes: Note[] = new Array<Note>();

  constructor() { }

  // get all notes 
  getAll() {
    return this.notes;
  }
  // get Method
  get(id: number) {
    // id = index of the array
    return this.notes[id];
  }

  // get id method
  getId(note: Note) {
    return this.notes.indexOf(note);
  }

  // add note
  add(note: Note) {
    // this method will add a note to the notes array and return the id of the note
    // the id = index

    let newLength = this.notes.push(note);
    let index = newLength -1;
    return index;
  }

  // update id
  update(id: number, title: string, body: string) {
    let note = this.notes[id];
    note.title = title;
    note.body = body;
  }

  // delete note and rmeove from array with slice
  delete(id: number) {
    this.notes.splice(id, 1);
  }
}
