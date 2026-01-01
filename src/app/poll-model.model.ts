export interface OptionVote {
    voteOption : string;
    voteCount: number
}


export interface PollModel {

    id: number;
    question:string;
    options: OptionVote[];
}