package com.project.service;


import com.project.model.Poll;
import com.project.repository.PollRepository;
import org.springframework.stereotype.Service;

@Service
public class PollService {

    private final PollRepository pollRepository;

    public PollService(PollRepository pollRepository) {
        this.pollRepository = pollRepository;
    }

    public Poll createPoll(Poll poll) {
        return pollRepository.save(poll);
    }
}
