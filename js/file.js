/*
***The author:Mostafa Shawky
***Email:mostafa.shawky47@mail.ru
***Application Name:
***Task App
*/


//get the variable environment

//get task input
let taskInput = document.querySelector('.input-task');

//get add button
let addBtn = document.querySelector('.btn-add');

//get task container
let taskContainer = document.querySelector('.task-container');

//get delete button
let deleteBtn = document.querySelector(".btn-delete");

//get task count
let taskCount = document.querySelector('.result-tasks');

//get compeleted task 
let taskCompeleted = document.querySelector('.result-compelete');

window.onload = function(){
    
    getLocalstorage(  )

    checkCount()

    checkTaskcontainer(); // check if the taskcontaine is empty to add no task found

    taskInput.focus();
}


addBtn.onclick = function(){ //when click to add button
     
    //check the input is filled
    if( taskInput.value !== '' ){

        checkTaskcontainer()

        //create taskContent element
        let taskContent = document.createElement('div');

        //laydown the className
        taskContent.className = 'task-content';

        //create textNode to taskContent
        let textTask = document.createTextNode( taskInput.value ); 

        //append the taskcontent to taskContainer
        taskContainer.appendChild( taskContent );

        //append textNode taskContent
        taskContent.appendChild( textTask );

        //create deleteButton element
        let deleteButton = document.createElement('span');

        //laydown the class Name
        deleteButton.className = 'btn-delete';

        //create textNode to Delete Button
        let deleteText = document.createTextNode('Delete');

        //append text to delete element
        deleteButton.appendChild( deleteText );

        //apped delete element to taskContent
        taskContent.appendChild( deleteButton );

        //localstorage
        setLocalstorage(taskInput.value);

        //put the count of tasks
        checkCount()

        //empty the input
        taskInput.value = '';

        //focus on input
        taskInput.focus();

    } else { //text Input is field

        //run function show popup
        showpopup();
    }   
}

//delete button
document.addEventListener( 'click', function( event ){

    /*
    ***event( reference to object memebers ) event.target get the element that run the event
    */

    //check if the element has class btn-delete
    if( event.target.classList.contains('btn-delete') ){
        
        let removeTaskcontent = document.querySelector(".task-content");

        removeLocalstorage( removeTaskcontent.innerHTML ) // path the string to remove it from localstorage

        removeTaskcontent.remove();

        //put the count of tasks
        checkCount()

        checkTaskcontainer() //check if task container is empty to add no task added
        
        console.log( taskContainer.children.length )

        taskInput.focus(); 
    }

    //check if the task contain class finish
    if( event.target.classList.contains('task-content') ){

        event.target.classList.toggle('finish');

        checkCount(); //this function check tasks count and compelete count   
    }

    
})

//show popup function
function showpopup( ){

    //get popupOverlay
    let overlay = document.querySelector('.overlay');

    overlay.style.display = 'block';

    //get close icon
    let closeIcon = document.querySelector('.close');

    //this hide the overlay
    closeIcon.addEventListener('click', ()=> overlay.style.display = 'none' );
    
    //when the user click skip button the overlay goint to close
    window.addEventListener( 'keyup',function( event ){

        if( event.keyCode === 27 ){ 

            overlay.style.display = 'none';
        }
    })
}

//function to check if taskcontainer is empty
function checkTaskcontainer(){

    if( taskContainer.childElementCount == 0 ){

        console.log(taskContainer.childElementCount)
        //create taskContent element
        let taskContent = document.createElement('div');
    
        //laydown the className
        taskContent.className = 'no-task';
    
        //append taskcontent to taskContainer
        taskContainer.appendChild( taskContent )
    
        //create textNode to taskContent
        let textTask = document.createTextNode( "There Is No Task Please Add One" ); 
    
        //apped no task text to notTaskcontent
        taskContent.appendChild( textTask );
        
    } else {

        let noTask = document.querySelector('.no-task');

        if( document.body.contains( noTask ) ){

            document.querySelector(".no-task").remove(); 
        }
               
    }
}

// function to laydown the count of tasks and finished
function checkCount(){

    //task count
    taskCount.innerHTML = document.querySelectorAll( '.task-content' ).length;

    //finish task count
    taskCompeleted.innerHTML = document.querySelectorAll('.task-content.finish').length;


}

//function to set localstorage
function setLocalstorage( content ){

    localStorage.setItem( content , 'test');

}  

function getLocalstorage(  ) {
    
  //  for( [key,value] of Object.entries(localStorage) ){
        if( localStorage.length > 0 ){
            
            for( const [key, value] of Object.entries( localStorage ) ){

                //task content element
                let taskContent = document.createElement('div');

                taskContent.className = 'task-content';

                taskContent.appendChild( document.createTextNode( key ) )

                taskContainer.appendChild( taskContent )

                //delete button
                let deleteButton = document.createElement('span');

                deleteButton.className = 'btn-delete';

                deleteButton.appendChild( document.createTextNode( 'Delete' ) )

                taskContent.appendChild( deleteButton );

            }
        }
}

function removeLocalstorage( content ){

        //search for taskcontnet key to remove it from localstorage
        let match = content.match(/[A-z \d \s]*</);

        match = match[0].slice(0, match[0].length -1 )

        localStorage.removeItem(match);
}

