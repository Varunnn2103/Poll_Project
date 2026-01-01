import { Component, OnInit } from '@angular/core';
import { PollService } from '../poll-service';
import { OptionVote, PollModel } from '../poll-model.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-poll',
  standalone: true, // Ensure standalone if using modern Angular
  imports: [CommonModule, FormsModule],
  templateUrl: './poll.html',
  styleUrl: './poll.css',
})
export class Poll implements OnInit {
  
  newPoll: any = {
    question: '',
    options: [
      { voteOption: '', voteCount: 0 },
      { voteOption: '', voteCount: 0 }
    ]
  };

  polls: PollModel[] = [];

  constructor(private pollService: PollService) {}

  ngOnInit(): void {
    this.loadPolls();
  }

  loadPolls() {
    this.pollService.getPolls().subscribe({
      next: (data) => this.polls = data,
      error: (error) => console.error("Error Fetching the Polls:", error)
    });
  }
  addOption() {
    this.newPoll.options.push({ voteOption: '', voteCount: 0 });
  }

  createPoll() {
    if (!this.newPoll.question.trim()) return;

    this.pollService.createPoll(this.newPoll).subscribe({
      next: (createdPoll) => {
        this.polls.push(createdPoll);
        this.resetPoll();
      },
      error: (error) => {
        console.error("Check if your Backend is running on port 8080!", error);
      }
    });
  }

  resetPoll() {
    this.newPoll = {
      question: '',
      options: [
        { voteOption: '', voteCount: 0 },
        { voteOption: '', voteCount: 0 }
      ]
    };
  }

  trackByIndex(index: number): number {
    return index;
  }

  calculatePercentage(voteCount: number, options: OptionVote[]) {
    const totalVotes = options.reduce((sum, option) => sum + option.voteCount, 0);
    return totalVotes > 0 ? (voteCount / totalVotes * 100) : 0;
  }

  vote(pollId: number, optionIndex: number) {
    this.pollService.vote(pollId, optionIndex).subscribe({
      next: () => {
        const poll = this.polls.find(p => p.id === pollId);
        if (poll) {
          poll.options[optionIndex].voteCount += 1;
        }
      },
      error: (error) => console.error("Voting error:", error)
    });
  }
}