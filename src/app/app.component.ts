import { Component, OnInit, ViewChild } from '@angular/core';
import { FormComponent } from './form/form.component';
import { Thought } from './models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  @ViewChild(FormComponent)
  form!: FormComponent;

  thought!: Thought;

  canShare: boolean = false;

  ngOnInit(): void {
    this.canShare = !!navigator.share;
  }

  share(t: Thought): void {
    console.log(t);
    this.thought = t;
    const data: any = {
      title: 'Share a thought',
      text: t.thought,

      //url: 'https://www.google.com',
    };
    navigator
      .share(data)
      .then((result) => alert('Shared'))
      .catch((error) => alert(`Error: ${error.message}`));
  }

  getThought(t: Thought) {
    console.log(t);
    this.thought = t;
  }

  ngAfterViewInit() {
    this.form.value = this.thought;
  }

  clear(): void {
    this.form.value = null;
  }
}
