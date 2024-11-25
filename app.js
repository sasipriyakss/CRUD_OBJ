document.addEventListener("DOMContentLoaded",function()
{

const modal= document.querySelector(".modal");
const closeBtn=document.querySelector(".close");

const tableBody=document.getElementById("dataList");

const dataForm=document.getElementById("dataForm");

const nameInput=document.getElementById('nameInput');
const ageInput=document.getElementById("ageInput");
const genderSelect=document.getElementById("genderSelect");

const editForm=document.getElementById('editForm');
const editIndex=document.getElementById('editindex');
const editnameInput=document.getElementById('editInput');
const editageInput=document.getElementById("editAgeInput");
const editgenderSelect=document.getElementById("editGenderSelect");

dataForm.addEventListener("submit",function(e) {
    e.preventDefault();
    const name= nameInput.value.trim();
    const age= parseInt(ageInput.value);
    const gender=genderSelect.value;
    if(name !== "" && !isNaN(age) && gender !== ""){
        const user={
            name:name,
            age:age,
            gender:gender,
        };
        addToLocalStorage(user);
        loadStoredData();
        dataForm.reset();
    }
    else{
        alert("Please Fill all the values");
    }
});

function addToLocalStorage(user){
    const storedData=JSON.parse(localStorage.getItem("myData")) || [];
    storedData.push(user);
    localStorage.setItem("myData",JSON.stringify(storedData));

}

loadStoredData();

editForm.addEventListener("submit",function(e) {
    e.preventDefault();
    const index=editIndex.value.trim();
    const newName= editnameInput.value.trim();
    const newAge= parseInt(editageInput.value);
    const newGender=editgenderSelect.value;
    if(newName !== "" && !isNaN(newAge) && newGender !== ""){
        const storedData=JSON.parse(localStorage.getItem("myData")) || [];
        storedData[index].name=newName;
        storedData[index].age=newAge;
        storedData[index].gender=newGender;
        localStorage.setItem("myData",JSON.stringify(storedData));
        editForm.reset();
        modal.style.display="none";
        loadStoredData();

    }
    else{
        alert("Please Fill all the values");
    }
});






function editData()
{
  const index= this.dataset.index;
  const storedData=JSON.parse(localStorage.getItem("myData")) || [];
  const data=storedData[index];
  editIndex.value=index;

  editnameInput.value=data.name;
  editageInput.value=data.age;
  editgenderSelect.value=data.gender;

  modal.style.display="block";    
                                // click on the edit button display changed to block
}

//delete

function deleteData()
{
  if(confirm("Are you sure to delete ?")){
    const index=this.dataset.index;
    const storedData=JSON.parse(localStorage.getItem("myData")) || [];
    storedData.splice(index,1);
    localStorage.setItem("myData",JSON.stringify(storedData));
    loadStoredData();

  }  
}



// function to close the modal


// using close button
closeBtn.addEventListener("click",function(){  // when click X button it will close
    modal.style.display="none";

});

// using modal window

window.addEventListener("click",function(e)    // When click on the area of modal div that box will close
{
   if(e.target==modal)
   {
    modal.style.display="none";
   }
});

function loadStoredData()
{
    const storedData=JSON.parse(localStorage.getItem("myData")) || [];
    tableBody.innerHTML = "";

    storedData.forEach(function (data, index) {
        const row=document.createElement("tr");
        row.innerHTML=`
        <td>${data.name}</td>
        <td>${data.age}</td>
        <td>${data.gender}</td>
        <td><button class="btnEdit" data-index="${index}">Edit</button></td>
        <td><button class="btnDelete data-index="${index}">Delete</button></td>
        
        `;
        tableBody.appendChild(row);

    });
    const editButtons= document.querySelectorAll(".btnEdit");
    editButtons.forEach((btn) => {
        btn.addEventListener("click",editData);
    });

    const deleteButtons= document.querySelectorAll(".btnDelete");
    deleteButtons.forEach((btn) => {
        btn.addEventListener("click",deleteData);
    });

}

});

/* 
[{"name":"Tiya","age":2,"gender":"Female"},{"name":"Raja","age":45,"gender":"Male"}] 

data's are stored array object format
*/
