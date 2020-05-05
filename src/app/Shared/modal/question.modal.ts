export class QuestionModal {
    constructor(
        public id: string,
        public answer: number,
        public imageName: string,
        public options: string[],
        public question: string,
        public participantAnswer: number) { }
}