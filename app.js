//to do list
//globals

//list of tasks
var TaskList = [];

$(document).ready(
	function(){
		//when button clicked create new task if input
		//is not empty
		$("#add-button").on("click",function(){
			//get value of input
			var taskinput = $("#input").val();
			//if input is not empty
			if(taskinput!=""){
				//create task
				createTask(taskinput);
				//clear input
				clearInput();
			}
		});
		$("#the-list").on("click",function(event){
			var itemid=event.target.id;
			if($(event.target).hasClass("done")){
				$(event.target).addClass("active").removeClass("done");
			}
			else{
				$(event.target).addClass("done");
			}
		});
	}
);

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
	for(i=0;i<TaskList.length;i++){
		var listitem = document.createElement("li");
		$(listitem).attr("id",TaskList[i].id);
		$(listitem).attr("class",TaskList[i].status);
		$(listitem).html(TaskList[i].name);
		$("#the-list").append(listitem);
	}
}
