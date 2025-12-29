package com.project.controller;

import com.project.model.Poll;
import com.project.service.PollService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/polls")
public class PollController {

    private final PollService pollservice;

    public PollController(PollService pollService) {
        this.pollservice = pollService;
    }

    @PostMapping
    public Poll createPoll(@RequestBody Poll poll){
        return pollservice.createPoll(poll);
    }
}
