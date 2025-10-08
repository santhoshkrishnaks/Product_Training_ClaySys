const input=document.getElementById("userinput")as HTMLInputElement;
function display(message:string):void{
    if(input.value==='0'){
        input.value=message;
    }
    else{
    input.value+=message;
    }
}
function reset():void{
    input.value="0";
}
function calculate():void{
    try{
    input.value=eval(input.value);
    if(input.value=='Infinity'){
        throw new Error("Failed");
    }
    }
    catch(e){
        input.value="Math Error";
        setTimeout(()=>input.value="",1000);
    }
}