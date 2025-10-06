let students=[];
let dis=false;
const addbtn=document.getElementById("addbtn");
const ol=document.getElementById("list");
const div=document.getElementById("lists");
const avgbtn=document.getElementById("avgbtn");
const disbtn=document.getElementById("disbtn");
addbtn.onclick=addstudent;
disbtn.onclick=display;
avgbtn.onclick=average;


function addstudent(){
    let name=document.getElementById("studentname").value.trim();
    let grade=parseFloat(document.getElementById("studentgrade").value);
    document.getElementById("studentname").value="";
    document.getElementById("studentgrade").value="";
    if(name==null||name===""){
        window.alert("Enter the name of student");
    }
    else if(valid(grade)){
        students.push({name:name,grade:grade});
        const li=document.createElement("li");
        li.textContent=name+"-"+grade;
        ol.appendChild(li);
    }
    else{
        window.alert("Enter the grade between 0 to 100");
    }
}
function valid(grade){
    if(grade>=0&&grade<=100){
        return true;
    }
    else{
        return false;
    }
}
function display(){
    dis=!dis;
    if(dis){
        div.style.display="block";
    }
    else{
    div.style.display="none";
    }
}
function average(){
    let total;
    let result;
    if(students.length>0){
    total=students.reduce((sum,s)=>sum+s.grade,0);
    result=(total/students.length).toFixed(2);
    }
    else{
        result="Average Grade: No data Available";
    }
    document.getElementById("result").textContent=`Average Grade: ${result}`;
}