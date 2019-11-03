var studentDom={
    nextbtn: document.querySelector("#nextbtn"),
    countdown: document.querySelector('#countdown'),
    startendbtn: document.querySelector('#starttest'),
    header: document.querySelector("#header"),
    content: document.querySelector("#content"),
    options: document.querySelector('#options'),
}
var countdown={
    end: false,
    
    start(){
        var time=60;
        var interval=setInterval(decr,1000);
        function decr(){
            time--;
            studentDom.countdown.innerText=time+" seconds left";
            if(!countdown.end){ 
              if(time<=0){
            
            clearInterval(interval);
            fetchScore(studentValues.index);
            if(studentValues.index!=serverOperations.fetchedArray.length-1){
            printQuestion(++studentValues.index);}
        else{
            finish();
        }}}

        else{
            clearInterval(interval);
            studentDom.countdown.innerText="";
        }
      
    
        
    }
 
   
}};