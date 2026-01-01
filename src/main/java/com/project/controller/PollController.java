package com.project.controller;

import com.project.Vote;
import com.project.model.Poll;
import com.project.service.PollService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/polls")
@CrossOrigin(origins = "http://localhost:4200/")
public class PollController {

    private final PollService pollservice;

    public PollController(PollService pollService) {
        this.pollservice = pollService;
    }

    @PostMapping
    public Poll createPoll(@RequestBody Poll poll){
        return pollservice.createPoll(poll);
    }

    @GetMapping
    public List<Poll> getAllPolls(){
        return pollservice.getAllPolls();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Poll> getPollById(@PathVariable Long id){
        return pollservice.getPollById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/vote")
    public void vote(@RequestBody Vote vote){
        pollservice.vote(vote.getPollId(), vote.getOptionIndex());
    }
}
