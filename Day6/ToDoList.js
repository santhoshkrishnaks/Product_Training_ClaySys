const addbutton=document.getElementById("addbtn");
const usertask=document.getElementById("task");
const parentul=document.getElementById("lists");
addbutton.onclick=addtask;
parentul.onclick=deletetask;


function create(task){
    const li=document.createElement("li");
    const input=document.createElement("input");
    input.type="checkbox";
    const p=document.createElement("p");
    p.textContent=task;
    const div=document.createElement("div");
    div.className="delbtn";
    div.textContent="Delete";
    li.appendChild(input);
    li.appendChild(p);
    li.appendChild(div);
    return li;
}
function addtask(){
    let task=usertask.value;
    usertask.value="";
    if(task===""||task===null){
        return;
    }
    else{
        const li=create(task);
        const hr=document.createElement("hr");
        parentul.appendChild(li);
        parentul.appendChild(hr);
    }
}
function deletetask(e){
    if(e.target.className==="delbtn"){
        const li=e.target.closest('li');
        const hr=li.nextElementSibling;
        if(li)li.remove();
        if (hr && hr.tagName === 'HR') hr.remove();
    }
}
