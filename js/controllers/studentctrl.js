
window.addEventListener('load', init);
function init(){
    if(firebase){
    fetchData();
    bindEvents();}
    else
    {
        alert("This project needs firebase to run. Please insert your firebase database configuration.");
    }
}
function bindEvents(){
    studentDom.startendbtn.addEventListener('click',decide);
    studentDom.nextbtn.addEventListener('click',function(){
        
        fetchScore(studentValues.index);
        printQuestion(++studentValues.index);
    });
}
function decide(){
    if(studentValues.testStarted){
        finish();
    }
    else{
        startTest();
    }
}
function fetchData(){
  
 serverOperations.fetch();
}
function fetched(){
    
document.querySelector('#quescount').innerText=serverOperations.fetchedArray==null?0:serverOperations.fetchedArray.length;
document.querySelector('#totaltime').innerText=(serverOperations.fetchedArray==null?0:serverOperations.fetchedArray.length)+" minutes ";
}

function startTest(){
    if(serverOperations.fetched){
            studentValues.testStarted=true;
            studentDom.startendbtn.addEventListener('click',finish);
            document.querySelector('#starttest').className="hide";
            studentDom.header.className='questionHeader';
            document.querySelector('#questionback').className="alert-danger container ";
            document.querySelector('#break').className="show container right";
            var btn=document.querySelector('#starttest');
            btn.innerText="Finish";
            btn.className="btn btn-danger show";
            printQuestion(0);
         
    }
    else{
        alert('You have a slow internet. Please wait');
    }
}


function fetchScore(index){
    for(let i=1;i<5;i++){
        let ans=document.querySelector('#rans'+i);
      
        if(ans.checked){
            serverOperations.fetchedArray[index].yourAnswer=ans.value;
        }
    }
}

function render(index){
    var currentQuestion = serverOperations.fetchedArray[index];
    studentDom.header.innerText="Question No. "+(index+1);
    studentDom.content.innerText=currentQuestion.question;
    studentDom.options.className="container padding show"
    document.querySelector('#r1').innerText=currentQuestion.optionA;
    document.querySelector('#r2').innerText=currentQuestion.optionB;
    document.querySelector('#r3').innerText=currentQuestion.optionC;
    document.querySelector('#r4').innerText=currentQuestion.optionD;
   
    studentDom.nextbtn.className="btn btn-success marginright ";  
    if(index==serverOperations.fetchedArray.length-1){
        studentDom.nextbtn.className="hide";
    }  
 
   
}
function printQuestion(index){
    
        
    render(index);
    countdown.start();}
    



function finish(){
    fetchScore(studentValues.index);
    countdown.end=true;
    studentDom.header.innerText="Result";
    
    studentDom.content.innerHTML="You have successfully finished the test <br> Your Score is "+calcScore();
    studentDom.nextbtn.className="hide";
    studentDom.options.className="hide";
    studentDom.startendbtn.className="hide";
    
}
  
function calcScore(){
    var score=0;
    serverOperations.fetchedArray.forEach(question=>{
       
        
        if(question.yourAnswer==question.rans){
            score+=parseInt(question.score);
        }
    });
    return score;
}