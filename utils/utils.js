function *idCounter(){
    var id=0;
    while(true){
        id++;
        yield id;
    }
}
var studentValues={
    testStarted: false,
    index: 0,
}