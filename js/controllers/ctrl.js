window.addEventListener('load',init);
function init(){

    setId();
    bindEvents();
   
}
function setId(){
    document.querySelector('#id').value=questionOperations.currentId.next().value;
}
function bindEvents(){
    document.querySelector('#add').addEventListener('click',tableUpdate);
    document.querySelector('#delete').addEventListener('click',deleteElements);
    document.querySelector('#save').addEventListener('click',save);
    document.querySelector('#load').addEventListener('click',load);
    document.querySelector('#showDialog').addEventListener('click',checkSearch());
    document.querySelector('#cancelSearch').addEventListener('click',cancelSearch);
    document.querySelector('#search').addEventListener('click',search);
    document.querySelector('#update').addEventListener('click',update);
    document.querySelector('#sort').addEventListener('click',showHideSort);
    document.querySelector('#actualSort').addEventListener('click',sort);
    document.querySelector('#clearall').addEventListener('click',clearAll);
    document.querySelector('#savetoserver').addEventListener('click',saveToServer);
    document.querySelector('#clearstorage').addEventListener('click',clearStorage);

}
function clearStorage(){
    localStorage.questions="";
    alert("Done");
}
function deleteElements(){
    questionOperations.delete();
    
    renderTable();
    if(questionOperations.questionObjects.length==0){
        questionOperations.currentId=idCounter();
        setId();   
    }
}


function renderTable(){
    document.querySelector("#questions").innerHTML='';
    questionOperations.currentId=idCounter();
    
    let arr=questionOperations.questionObjects;
    if(arr!=0 || arr.length!=0){
    let newArray=[];
    
    
    if(arr instanceof Array){
    for(let obj of arr){
        obj.id=questionOperations.currentId.next().value;
        newArray.push(obj);
        printTable(obj);
    }}
    else
    {printTable(arr);
        newArray.push(arr);
    }
    questionOperations.questionObjects=newArray;
    setId();
}
}
function save(){
    if(localStorage){
    questionOperations.save();
    alert("Records Saved");
    questionOperations.questionObjects=[];
    clearAll();
    renderTable();
    setId();
    
}
    else{
        alert("Your browser does not support local storage");
    }
}

function load(){
    if(localStorage){
if(localStorage.questions!=""){
if(confirm('Before loading, have you saved all the previous data?')){
    alert('Load process will overwrite the realtime questions table. Please do not attempt to save the table after loading as it will save the new table along with the old table. Please click Clear Storage button before saving');
    questionOperations.questionObjects=[];
    var json = questionOperations.load();
var arr = JSON.parse(json);

for(object of arr){
    
    var question = new Questions(object.id,object.question,object.optionA,object.optionB,object.optionC,object.optionD,object.rans,object.score);
    
    questionOperations.questionObjects.push(question);

}

renderTable();
setId();
}}
else{
    alert("No records to load");
}
    }
    else{
        alert("Sorry your browser does not support this feature");  
    }
}




function tableUpdate(){
    var question = new Questions();
   
    for(let key in question){
        if(key=='isMarked'){
            continue;
        }
        if(key=='rans'){
            question[key]=getRightAnswer();
            continue;
        }
        question[key]=document.querySelector("#"+key).value;
        
    }
    questionOperations.add(question);
    printTable(question);
    setId();
}

function printTable(questionObject){

    var tbody=document.querySelector('#questions');
    var tr= tbody.insertRow();
    var index=0;
    for(let key in questionObject){
      if(key=='isMarked'){
          continue;
      }
        var td = tr.insertCell(index);
   
        td.innerText=questionObject[key];
        index++;
        
    }
    var operations = tr.insertCell(index);
    operations.appendChild(returnImage("http://icons.iconarchive.com/icons/papirus-team/papirus-status/256/user-trash-full-icon.png",questionObject.id,toggleMark));
    operations.appendChild(returnImage("https://image.flaticon.com/icons/png/128/126/126483.png",questionObject.id,edit));
    
}
function update(){
    var id = document.querySelector('#id').value;
    var index = questionOperations.questionObjects.findIndex(ele=>ele.id==id);
    var question = new Questions();
        for(let key in question){
            if(key=='isMarked'){
                continue;}
            if(key=='rans'){
                question[key]=getRightAnswer();
                continue;
            }
            
            question[key]=document.querySelector('#'+key).value;
        }
        questionOperations.questionObjects[index]=question;
       
        renderTable();
        alert('Table Updated');
    
}
function updateScore(val){
    document.querySelector("#scorePrint").innerText=val;
}
function returnImage(path,qid,fn){
    var img = document.createElement('img');
    img.src=path;
    img.className="icon";
    img.setAttribute('qid',qid);
    img.addEventListener('click',fn);
    return img;
}
function getRightAnswer(){
    let arr=[];
    for(let i=0;i<4;i++){
        arr.push(document.querySelector("#rans"+(i+1)));
    }
    arr=arr.filter(ele=>ele.checked==true);
    return arr[0].value;

}

function edit(){
    var id = this.getAttribute('qid');
    var object = questionOperations.searchId(id);
    for(let key in object){
        if(key=="isMarked"){
            continue;
        }
        if(key=='rans'){
            continue;
        }
        document.querySelector('#'+key).value=object[key];
    }
    
}

function toggleMark(){
   questionOperations.mark(this.getAttribute('qid'));
    var tr=this.parentNode.parentNode;
    tr.classList.toggle("alert-danger"); 
}

function showDialog(){
    var dialog = document.querySelector("#dialog");
    dialog.showModal();
    
}
function cancelSearch(){
    var dialog = document.querySelector("#dialog");
    dialog.close();
}
function checkSearch(){
    var searched=false;
    var fn= function(){
        searched=!searched;
        if(searched==false)
        {
            renderTable();
        }
        else
        {showDialog();}
       
    }
    return fn;
}

function search(){
   
    var searchPreference = document.querySelector("#searchPreference").value;
    var key = document.querySelector("#key").value;
    if(key!="")
    {
    var result;
    if(searchPreference=="id"){
        result = questionOperations.searchId(key);
       
    }
    if(searchPreference=="score"){
        result = questionOperations.searchScore(key);
    }
    if(searchPreference=="name"){
        result = questionOperations.searchName(key);
        
    }
    printResult(result);}
    cancelSearch();
     
}

function printResult(arr){
    document.querySelector("#questions").innerHTML='';
    if(arr!=0 || arr.length!=0){
    if(arr instanceof Array){
        arr.forEach(ele=>printTable(ele));
    }
        else
        printTable(arr);
 
    }
}
function showHideSort(){
document.querySelector("#sortClass").classList.toggle('show');
}
function sort(){
    let key=document.querySelector("#sortSelect").value;
    questionOperations.sort(key);
    renderTable();
    showHideSort();
}

function clearAll(){
    document.querySelectorAll("input").forEach(ele=>{
        if(ele.id!="id"){
            ele.value="";
        }
    })
    document.querySelector("#score").value=1;   
    updateScore(1);
    document.querySelector('#question').value="";
}

function saveToServer(){
    if(confirm('Are you sure you want to save these records on the server?')){
    alert('Data save in progress. Please check that you are connected to the internet and do not press the button again to prevent multiple saves');
    var promise= serverOperations.save();
    promise.then(data=>{alert('Data has been saved')
    questionOperations.questionObjects=[];
    
    renderTable();
    setId();
    clearAll();
    
    
    }).catch('Some error occured please try again later');
    }

}




//  function finish()