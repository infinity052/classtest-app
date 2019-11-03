var serverOperations={

    fetchedArray: [],
    fetched:false
  
    ,save(){
       var arr=JSON.parse(localStorage.questions);
       return firebase.database().ref('/teacher/questions/').set(arr);
    }

, fetch(){
   var arr=[];
   var promise = firebase.database().ref('/teacher/questions/').once('value',snapshot=>arr=snapshot.val());
   promise.then(data=>{this.fetchedArray=arr;
     this.fetched=true;
   fetched();
   }).catch('Error');
}

}