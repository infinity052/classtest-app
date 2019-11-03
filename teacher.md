<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <link rel="stylesheet" href="css/icons.css">
    <link rel="stylesheet" href="css/design.css">
    
    <script src="js/models/questionmodel.js"></script>
    <script src="utils/utils.js"></script>
    <script src="js/models/questionoperations.js"></script>
 
    <script src="js/models/serveroperations.js"></script>
    <script src="js/controllers/ctrl.js"> </script>
</head>
<body>
  <div class="container">  <h1 class="alert-warning text-center">Teacher's Portal
    </h1></div>
    <div class="form-group container"><label for="">Question id</label><input class="form-control" id="id" type="text" readonly required></div>
    <div class="form-group container"><label for="">Question</label><textarea class="form-control" cols="30" rows="5" id="question" required></textarea></div>
    <div class="form-group container"><label for="">Option A</label><input class="form-control" id="optionA" type="text" required></div>
    <div class="form-group container"><label for="">Option B</label><input class="form-control" id="optionB" type="text"required></div>
    <div class="form-group container"><label for="">Option C</label><input class="form-control" id="optionC" type="text"required></div>
    <div class="form-group container"><label for="">Option D</label><input class="form-control" id="optionD" type="text" required></div>
    <div class="form-group container"><label for="">Right Answer</label><br><input class="" id="rans1" type="radio" name="rightanswer" value="Option A" checked> Option A<br>
        <input class="" id="rans2" type="radio" name="rightanswer" value="Option B"> Option B<br>
        <input class="" id="rans3" type="radio" name="rightanswer" value="Option C"> Option C<br>
        <input class="" id="rans4" type="radio" name="rightanswer" value="Option D"> Option D<br>
    </div>
    <div class="form-group container"><label for="">Score</label>   <strong><label class="form-group" fontfor="" id="scorePrint"></label></strong><input id="score" class="form-control" type="range" min="1" max="10" value="1" onchange="updateScore(this.value)">
    
    </div>
    <div class="container">
        <button class="btn btn-primary" id="add">Add</button>
        <button class="btn btn-danger" id="clearall">Clear Fields</button>
        <button class="btn btn-danger" id="delete">Delete</button>
        <button class="btn btn-success " id="save">Save</button>
        <button class="btn btn-warning" id="update">Update</button>
        <button class="btn btn-secondary" id="showDialog">Search</button>
        <button class="btn btn-secondary" id="sort">Sort</button> 
       
        <button class="btn btn-warning" id="load">Load</button>
        <button class="btn btn-danger" id="clearstorage">Clear Storage</button>       
      
        <button class="btn btn-success" id="savetoserver">Finish</button>
        
    </div>
    <br>
    <div id="sortClass" class="hide">
    <div class="container form-group"><label for="">Sort By</label> <select name="Sort" id="sortSelect"><option value="question">Questions</option>
        <option value="score">Scores</option> <option value="id">Id</option></select>  <button id="actualSort" class="btn btn-secondary sortButton">Sort</button></div>
    </div>
    <table class="table container">
        <thead class="thead-dark">
            <tr>
                <th>Id</th>
                <th>Question</th>
                <th>OptionA</th>
                <th>OptionB</th>
                <th>OptionC</th>
                <th>OptionD</th>
                <th>Right Answer</th>
                <th>Score</th>
                <th>Operations</th>
            </tr>
        </thead>
        <tbody id="questions">

        </tbody>
    </table>

    <div>
        <dialog id="dialog"> 

            <div class = "container dialog">
                <label>Search Preference</label>
                <select name="Search" id="searchPreference">
                    <option value="id">ID</option>
                    <option value="name">Name</option>
                    <option value="score">Score</option>
                </select>
            </div>
            <br>
            <div><label for="">Enter Key</label><br><textarea name="searchkey" id="key" cols="30" rows="5"></textarea></div>
            <button class="btn btn-success" id="search">Search</button>
            <button class="btn btn-warning" id="cancelSearch">Cancel</button>
        </dialog>
    </div>

</body>
</html>
