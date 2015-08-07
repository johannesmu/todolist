//to do list
//globals

//list of tasks
var TaskList = [];

$(document).ready(
	function(){
		//when button clicked create new task if input
		//is not empty
		$("#add-button").on("click",function(){
			getInput();
		});
        //check keypress on devices
        //when enter is pressed, create task
        $("#input").on("keypress",function(e){
            if(e.keyCode == 13){
                getInput();
            }
        });
		$("#the-list").on("click",function(event){
			var itemid=event.target.id;
			if($(event.target).hasClass("done")){
				$(event.target).addClass("active").removeClass("done");
                updateTask(itemid,"active");
			}
			else{
				$(event.target).addClass("done");
                updateTask(itemid,"done");
			}
		});
	}
);
//get value of input
function getInput(){
    //get value of input
    var taskinput = $("#input").val();
    //if input is not empty
    if(taskinput!=""){
        //create task
        createTask(taskinput);
        //clear input
        clearInput();
    }
}
function createTask(name){
	var date = new Date();
	var task = new Object();
	task.id = date.getTime();
	task.name = name;
	task.status = "active";
	TaskList.push(task);
	renderTasks();
	//return task;
}
function clearInput(){
	$("#input").val("");
	$("#input").focus();
}
function renderTasks(){
	//remove all list items from list
	$("#the-list>li").remove();
    sortTasks(TaskList);
	for(i=0;i<TaskList.length;i++){
		var listitem = document.createElement("li");
		$(listitem).attr("id",TaskList[i].id);
		$(listitem).attr("class",TaskList[i].status);
		$(listitem).html(TaskList[i].name);
		$("#the-list").append(listitem);
	}
}

function updateTask(id,status){
    for(i=0;i<TaskList.length;i++){
        if(TaskList[i].id==id){
           TaskList[i].status = status;
        }
    }
    renderTasks();
}

function sortTasks(arr){
    //sort array so done items move to the bottom
    arr.sort(function(a,b){
        if(a.status < b.status) return -1;
        if(a.status > b.status) return 1;
        return 0;
    });
}
function saveTasks(arr){
    tasks = JSON.stringify(TaskList);
    try{
        window.localStorage.setItem("tasks",tasks);
    }
    catch(err){
        showAlet("we are sorry an error has occured");
    }
}

function loadTasks(arr){
    try{
        t = window.localStorage.getItem("tasks");
    }
	catch(err){
		showAlert("we are sorry an error has occured");
	}
}

function showAlert(alert){
	$("#message").addClass("open").html(alert);
	timer = setTimeout(function(){
		$("#message").html("").removeClass("open");
	},3000);
}