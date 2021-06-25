let submit = document.getElementById("submit");
let form = document.forms.myForm;
let email = form.elements.email;
let firstName = form.elements.firstName;
let lastName = form.elements.lastName;
let address = form.elements.address;
let gender = document.querySelector("#gender");
let check = form.elements.check;
let table = document.querySelector(".table");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let obj = {};
  obj.email = email.value;
  obj.firstName = firstName.value;
  obj.lastName = lastName.value;
  obj.address = address.value;
  obj.gender = gender.value;
  obj.active = check.checked;
  console.log(obj);

  fetch("http://157.230.108.157:3000/user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(obj),
  })
    .then((obj) => obj.json())

    .then((obj) => {
      addObj(obj);
    });
});
table.addEventListener("click", function(e){
  e.preventDefault();
  console.log(e.target.closest('tr').children);
  let id = e.target.closest('tr').children[0].innerHTML;
  fetch(`http://157.230.108.157:3000/user/${id}`, {
    method: 'DELETE',
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    }
  });
  console.log(e.target.closest('td'));
  if (e.target.closest('td').innerHTML.includes("X")) {
  e.target.closest('tr').remove();}

})
fetch("http://157.230.108.157:3000/user")
  .then((response) => response.json())
  .then((users) => {
    console.log(users);
    users.forEach((element) => {
      addObj(element);
    });
  
  });

  
function addObj(element) {
   let tr = document.createElement("tr");

  let td0 = document.createElement("td");
  td0.innerHTML = element.id;
  tr.appendChild(td0);
  let td1 = document.createElement("td");
  td1.innerHTML = element.email;
  tr.appendChild(td1);
  let td2 = document.createElement("td");
  td2.innerHTML = element.firstName;
  tr.appendChild(td2);
  let td3 = document.createElement("td");
  td3.innerHTML = element.lastName;
  tr.appendChild(td3);
  let td4 = document.createElement("td");
  td4.innerHTML = element.address;
  tr.appendChild(td4);
  let td5 = document.createElement("td");
  td5.innerHTML = element.gender;
  tr.appendChild(td5);
  let td6 = document.createElement("td");
  td6.innerHTML = element.active;
  tr.appendChild(td6);
  let td7 = document.createElement("td");
  td7.innerHTML = "X";
  tr.appendChild(td7);
  table.prepend(tr);
}
