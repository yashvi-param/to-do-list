let task = document.getElementById("task")
let add = document.getElementById("add")
let tbody = document.getElementById("tbody")



add.addEventListener("click", addTask)


let task_arr = JSON.parse(localStorage.getItem("task_arr")) || []



showTask(task_arr)
function setLocal(ta){
    localStorage.setItem("task_arr", JSON.stringify(ta))
    showTask(task_arr)
}



function sorting(){
  let newArr = task_arr.sort((a,b) => b.pri - a.pri)

 setLocal(newArr)
    
}


let a= 10;
let b = 20;

b = b-a // 20 - 10 == 10
a = b = 20


function addTask(){

    let obj = {
        id: Math.round(Math.random()*1000),
        text : task.value,
        status : false
    }
if(task.name=="")
{
    task_arr.push(obj)
}
else{
  task_arr =  task_arr.map((ele) => {
        if(ele.id == task.name)
        {
            ele.text = task.value;
        }
        return ele;
    })
}
    

showTask(task_arr)
 task.name=""


}


function changeStatus(e){
    task_arr = task_arr.map((ele) => {
            if(ele.id == e)
            {     
                ele.status = !ele.status
            }
            return ele     
    })

    setLocal(task_arr)
}

function deleteTask(e){
   task_arr =  task_arr.filter((ele) => ele.id != e)

   setLocal(task_arr)
}


    function editTask(e)
    {
        console.log(e)
        task.value = e.text;
        task.name=e.id
    }







function showTask(array){

    tbody.innerHTML = ""
    array.map((ele) => { // sleep



           let tr = document.createElement("tr");
            let td_text = document.createElement("td"); 
            let td_status = document.createElement("td"); 
            let td_edit = document.createElement("td"); 
            let td_delete = document.createElement("td"); 
            let btn_edit = document.createElement("button"); 
            let btn_delete = document.createElement("button"); 
            let span = document.createElement("span");



            td_text.textContent = ele.text;
            td_text.className="position-relative"
            btn_edit.innerHTML=  `<i class="ri-edit-2-fill"></i>`
            btn_edit.setAttribute("class","btn btn-primary btn-sm")
            btn_delete.innerHTML=  `<i class="ri-delete-bin-5-line"></i>`
            btn_delete.setAttribute("class", "btn btn-danger btn-sm")

            td_status.textContent = ele.status ? " ✖️not completed" : "✔️completed";

            td_text.append(span)
            td_status.onclick = () => changeStatus(ele.id)
            btn_delete.onclick = () => deleteTask(ele.id);
            btn_edit.onclick = () => editTask(ele)
        


            td_edit.append(btn_edit)
            td_delete.append(btn_delete)
             tr.append(td_text, td_status, td_edit, td_delete)

             if(ele.status)
             {
                 tr.setAttribute("class", 'table-success text-decoration-line-through');
             }
             else{
                tr.setAttribute("class", 'table-warning')
             }
             
        tbody.append(tr)   
        task.value=""      
   })
}
