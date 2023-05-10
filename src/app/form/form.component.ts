import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Thought } from '../models';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  thoughtsForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  @Input()
  thought: Thought | null = null;

  @Input()
  canShare!: boolean;

  @Output()
  sendThought = new EventEmitter<Thought>();

  ngOnInit(): void {
    this.thoughtsForm = this.createNewForm(this.thought);
  }

  get value(): Thought | null {
    return this.thoughtsForm.value as Thought;
  }

  set value(t: Thought | null) {
    this.thought = t;
    this.thoughtsForm = this.createNewForm(t);
  }

  private createNewForm(t: Thought | null): FormGroup {
    return this.fb.group({
      thought: this.fb.control<string>(
        !!t ? t.thought : '',
        Validators.required
      ),
    });
  }

  invalidForm(): boolean {
    return this.thoughtsForm.invalid || !this.canShare;
  }

  invalidField(field: string): boolean {
    return (
      !!this.thoughtsForm.get(field)?.invalid &&
      !!this.thoughtsForm.get(field)?.dirty
    );
  }

  share() {
    const t = this.thoughtsForm.value as Thought;
    this.sendThought.emit(t);
  }
}
