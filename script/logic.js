// Project Class
class Project
{
    constructor(name, id)
    {
        this.name = name;
        this.id = id;
    }

    // Display
    displayProject()
    {
        console.log("Name: " + this.name + ", ID: " + this.id);
    }
}

// Person Class
class Person
{
    constructor(id, firstname, surname, email, username, profilePic)
    {
        this.id = id;
        this.firstname = firstname;
        this.surname = surname;
        this.email = email;
        this.username = username;
        this.profilePic = profilePic;
    }
}

// Ticket Class
class Ticket
{
    constructor(id, summary, details, identified, dateID, projectName, personName, status = "open", priority, targetResDate, actualResDate = null, resolutionSumm = "")
    {
        this.id = id,
        this.summary = summary,
        this.details = details,
        this.identified = identified,
        this.dateID = dateID,
        this.project = setProject(projectName),
        this.assigned = setPerson(personName),
        this.status = status,
        this.priority = priority,
        this.targetResDate = targetResDate,
        this.actualResDate = actualResDate,
        this.resolutionSumm = resolutionSumm
    }
}

// Creation of project objects
const project1 = new Project("omega", "omg");
const project2 = new Project("alpha", "alp");
const project3 = new Project("beta", "bet");

// Make Map of projects so that we don't need a case for every project when setting the project.
let projects = new Map
([
    [project1.name, project1],
    [project2.name, project2],
    [project3.name, project3]
])

// Creation of People
const person1 = new Person(001, "emile", "Fourie", "emileFourie@gmail.com", "Emile4Rie", "web-dev-1.png");
const person2 = new Person(002, "tamaryn", "Nell", "tamNell@gmail.com", "TimTam6198", "web-dev-2.png");
const person3 = new Person(003, "ruhan", "Potgieter", "ruhanPotgieter@gmail.com", "Potter4131", "web-dev-3.png");
const person4 = new Person(004, "damon", "Hattingh", "damonHattingh@gmail.com", "DaRealRobinDamon", "web-dev-4.png");

// Make Map of people so that we don't need a case for every person when setting the person.
let people = new Map
([
    [person1.firstname, person1],
    [person2.firstname, person2],
    [person3.firstname, person3],
    [person4.firstname, person4]
])

function store()
{ 
    submitticket();
    // alert("running")
    //stores items in the localStorage
    
    let key = 0;
    // alert("B4 Loop")
    if(localStorage.length == 0)
    {
        key = 1;
    }
    else
    {
        key = localStorage.length + 1;
    }
    var summary = document.getElementById("summ").value;
    var details = document.getElementById('details').value;
    var user = document.getElementById('identifier').value;
    var dateID = document.getElementById('dateID').value;
    var projectName = document.getElementById('projName').value;
    var personName = document.getElementById('DevName').value;
    var status = document.getElementById('status').value;
    var priority = document.getElementById('selectPriority').value;
    var targetDate = document.getElementById('targetDate').value;
    // alert("B4 Ticket");
    let ticket = new Ticket(key, summary, details, user, dateID, projectName, personName, status, priority, targetDate);
    
    //converting object to string
    // alert("B4 Save")
    window.localStorage.setItem(key, JSON.stringify(ticket));
    // alert(localStorage.length);
}

function editTicket()
{
    // edit ticket
    showpopupedit();
    let key = document.getElementById("edit").value;
    let record = window.localStorage.getItem(key);
    let ticket = JSON.parse(record);
    let proj = ticket.project;
    let dev = ticket.assigned;

    document.getElementById("editSumm").value = ticket.summary;
    document.getElementById("editDetails").value = ticket.details;
    document.getElementById("editIdentifier").value = ticket.identified;
    document.getElementById("editDateID").value = ticket.dateID;

    document.getElementById("editProject").value = proj.name;
    document.getElementById("editPerson").value = dev.firstname;

    document.getElementById("editStatus").value = ticket.status;
    document.getElementById("editPriority").value = ticket.priority;
    document.getElementById("editTargetDate").value = ticket.targetResDate;
    document.getElementById("editActualDate").value = ticket.actualResDate;
    document.getElementById("editResSumm").value = ticket.resolutionSumm;
}

function saveTicket()
{
    // save edited ticket
    submiteditticket();
    let key = document.getElementById("edit").value;
    let record = window.localStorage.getItem(key);
    let ticket = JSON.parse(record);

    // get edited details
    ticket.summary = document.getElementById('editSumm').value;
    ticket.details = document.getElementById('editDetails').value;
    ticket.identified = document.getElementById('editIdentifier').value;
    ticket.dateID = document.getElementById('editDateID').value;
    ticket.project = setProject(document.getElementById('editProject').value);
    ticket.assigned = setPerson(document.getElementById('editPerson').value);
    ticket.status = document.getElementById('editStatus').value;
    ticket.priority = document.getElementById('editPriority').value;
    ticket.targetResDate = document.getElementById('editTargetDate').value;
    ticket.actualResDate = document.getElementById('editActualDate').value;
    ticket.resolutionSumm = document.getElementById('editResSumm').value;

    // delete current local storage item
    localStorage.removeItem(key);

    // add updated ticket to local storage
    window.localStorage.setItem(key,JSON.stringify(ticket));
}

function setProject(projectName)
{
    // set project object
    
    try
    {
        if(projectName != null && isNaN(projectName))
        {
            let proj = projectName.toLowerCase();
            // map of projects
            if(projects.has(proj))
            {
                return projects.get(proj);
            }
            else
            {
                throw "The project entered doesn't exist, please edit the ticket and add a valid project.";
            }
        }
        else
        {
            throw "The project entered was incorrect, please edit the ticket and add a valid project.";
        }
    }
    catch (e)
    {
        alert(e);
        return null;
    }
}

function setPerson(personName)
{
    // assign person object
    try
    {
        if(personName != null && isNaN(personName))
        {
            // alert("The name is: " + personName);
            if(people.has(personName))
                {
                    return people.get(personName);
                }
                else
                {
                    throw "The person entered doesn't exist, please edit the ticket and add a valid person.";
                }
        }
        else
        {
            throw "The person entered was incorrect, please edit the ticket and add a valid person.";
        }
    }
    catch (e)
    {
        alert(e);
        return null;
    }
}

// Remove specific ticket
function removeItem()
{ //deletes item from localStorage
    var key = document.getElementById('removeKey').value; //gets key from user
    localStorage.removeItem(key) //passes key to the removeItem method
    console.log("remove items");
}

// Clear all tickets
function clearStorage()
{ //clears the entire localStorage
    localStorage.clear()
    console.log("clear records");
}

function retrieveRecords()
{ 
    
    //retrieves items in the localStorage
    var key = document.getElementById('retrieveKey').value; //gets key from user
    console.log("retrieve records");
    var records = window.localStorage.getItem(key); //searches for the key in localStorage
    var p = document.createElement("p");
    var infor = document.createTextNode(records);
    // alert("TypeOf: " + typeof infor);
    p.appendChild(infor);
    
    var element = document.getElementById("output");
    element.appendChild(p);
}

function showAllRecords() 
{
    // alert(localStorage.length);
    for (var i = 0; i < localStorage.length; i++) 
    {
        let key = localStorage.key(i); //records
    
        let records = window.localStorage.getItem(key);

        console.log((JSON.parse(records).summary))
        var outerContainer = document.createElement("div");
        outerContainer.classList.add('ticket_item');

        var statusContainer;
        
        if (JSON.parse(records).status == 'open') {
            statusContainer = document.getElementById("open");
        }
        else if (JSON.parse(records).status == 'resolved')
            statusContainer = document.getElementById("resolved");
        else {
            statusContainer = document.getElementById("overdue");
        }
        outerContainer.innerHTML += '<h2 class="ticket_title">' + (JSON.parse(records).summary) + '</h2>';
        statusContainer.appendChild(outerContainer);

        // Details 
        var details = '<div class="row"><div class="col-6"><div class="row label_title">Description:</div></div><div class="col-6"><div class="row input">' + (JSON.parse(records).details) + '</div></div></div>';
        outerContainer.innerHTML += details;

        // identified 
        var identified = '<div class="row"><div class="col-6"><div class="row label_title">Identified:</div></div><div class="col-6"><div class="row input">' + (JSON.parse(records).identified) + '</div></div></div>';
        outerContainer.innerHTML += identified;

        // dateID 
        var dateID = '<div class="row"><div class="col-6"><div class="row label_title">Date:</div></div><div class="col-6"><div class="row input">' + (JSON.parse(records).dateID) + '</div></div></div>';
        outerContainer.innerHTML += dateID;

            // project 
            var project = '<div class="row"><div class="col-6"><div class="row label_title">project:</div></div><div class="col-6"><div class="row input">' + (JSON.parse(records).project.name) + '</div></div></div>';
            outerContainer.innerHTML += project;

            var projectid = '<div class="row"><div class="col-6"></div><div class="col-6"><div class="row input">' + (JSON.parse(records).project.id) + '</div></div></div>';
            outerContainer.innerHTML += projectid;
    

        //assigned

        var outerSubsection = document.createElement("div");
        outerSubsection.classList.add('row', 'subsection');

        outerSubsection.innerHTML += '<div class="col-12 subsection_heading">Assigned to: </div>';

        var name = '<div class="col-6"><div class="row label_title">Name:</div></div><div class="col-6"><div class="row input">' + (JSON.parse(records).assigned.firstname) + ' ' + (JSON.parse(records).assigned.surname) + '</div></div>';
        outerSubsection.innerHTML += name;

        var email = '<div class="col-6"><div class="row label_title">Email:</div></div><div class="col-6"><div class="row input">' + (JSON.parse(records).assigned.email) + '</div></div>';
        outerSubsection.innerHTML += email;

        var username = '<div class="col-6"><div class="row label_title">Username:</div></div><div class="col-6"><div class="row input">' + (JSON.parse(records).assigned.username) + '</div></div>';
        outerSubsection.innerHTML += username;

        outerContainer.appendChild(outerSubsection);

        // status 
        var status = '<div class="row"><div class="col-6"><div class="row label_title">Status:</div></div><div class="col-6"><div class="row input">' + (JSON.parse(records).status) + '</div></div></div>';
        outerContainer.innerHTML += status;

        // priority 
        var priority = '<div class="row"><div class="col-6"><div class="row label_title">Priority:</div></div><div class="col-6"><div class="row input">' + (JSON.parse(records).priority) + '</div></div></div>';
        outerContainer.innerHTML += priority;

        // targetResDate 
        var targetResDate = '<div class="row"><div class="col-6"><div class="row label_title">Target Resolution Date:</div></div><div class="col-6"><div class="row input">' + (JSON.parse(records).targetResDate) + '</div></div></div>';
        outerContainer.innerHTML += targetResDate;

       
        
    }    
}

window.onload =function()
{ //ensures the page is loaded before functions are executed.
    document.getElementById("submitButton").onclick = store
    document.getElementById("clearButton").onclick = clearStorage
    document.getElementById("removeButton").onclick = removeItem
    document.getElementById("retrieveButton").onclick = retrieveRecords
    document.getElementById("retrieveAllButton").onclick = showAllRecords
    document.getElementById("editButton").onclick = editTicket
    document.getElementById("saveButton").onclick = saveTicket

    
}
