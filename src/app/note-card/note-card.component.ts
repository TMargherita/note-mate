import { Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-note-card',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.scss']
})
export class NoteCardComponent implements OnInit {

  @Input() title!: string;
  @Input() body!: string;

  @Input() link: any;
  @Output('delete') deleteEVent: EventEmitter<void> = new EventEmitter<void>();
  
  @ViewChild('truncator', {static: true}) 
  truncator!: ElementRef;
  @ViewChild('bodyText', { static: true })
  bodyText!: ElementRef;
  
  constructor(private renderer : Renderer2) { }

  ngOnInit(): void {
    // workout if there is a text overflow -> if it's not then hide truncator

    let style = window.getComputedStyle(this.bodyText.nativeElement, null);
    let viewableHeight = parseInt(style.getPropertyValue("height"), 10);

      // if there is a text overflow, show the fade out truncator
    if(this.bodyText.nativeElement.scrollHeight > viewableHeight) {
      this.renderer.setStyle(this.truncator.nativeElement, 'display', 'block');
    } else {
      //  else (there is no text overflow), hide truncator
      this.renderer.setStyle(this.truncator.nativeElement, 'display', 'none');
    }
    
  }

  onXButtonClick() {
    this.deleteEVent.emit();
  }

}
