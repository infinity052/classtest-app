

var questionOperations={
    questionObjects: [], 

    add(questionObject){
        this.questionObjects.push(questionObject)
    },

    delete(){
         this.questionObjects = this.questionObjects.filter(ele=>ele['isMarked']==false);
        },
    
    mark(id){
        
        var obj = this.searchId(id);
        obj.toggle();
       }
    ,
    searchId(id){
        return this.questionObjects.find(ele=>ele['id']==id);
    
    },
    searchScore(score){
        return this.questionObjects.filter(ele=>ele.score==score);
    },

    searchName(keyword){
      var arr = this.questionObjects.filter(ele=>ele.question.search(keyword)!=-1);
      return arr;
    },
    
    update(){

    },

    save(){
        
        if(localStorage.questions!=""){
        var arr= JSON.parse(localStorage.questions);
        var lastId=arr[arr.length-1].id;
        this.questionObjects.forEach(ele=>{
            lastId++;
            ele.id=lastId;
            arr.push(ele);
        });
        localStorage.questions=JSON.stringify(arr);}
        else{
            localStorage.questions=JSON.stringify(this.questionObjects);
        }
    },

    load(){
        if(localStorage.question==""){
            alert("No records to load");
        }
        return localStorage.questions;
    },
    currentId: idCounter(),
    sort(key){
        if(key=="question"){
            this.questionObjects.sort((a,b)=>(a.question).localeCompare(b.question));
        }
        else if(key=="score"){
            this.questionObjects.sort((a,b)=>a.score-b.score); 
        }
        else
        {
            this.questionObjects.sort((a,b)=>a.id-b.id);  
        }
    }
};



