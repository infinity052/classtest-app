class Questions{
    constructor(id,question,optionA,optionB,optionC,optionD,rans,score){
        this.id=id;
        this.question=question;
        this.optionA=optionA;
        this.optionB=optionB;
        this.optionC=optionC;
        this.optionD=optionD;
        this.rans=rans;
        this.score=score;
        this.isMarked=false;
        }
        toggle(){
            this.isMarked=!this.isMarked;
        }
}