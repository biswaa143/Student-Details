function saveToCrud(event) {
    event.preventDefault();
    const name = event.target.name.value;
    const classes = event.target.classes.value;
    const rollno = event.target.rollno.value;
    const marksInPercentage = event.target.marksInPercentage.value;
    const expertiseSubject = event.target.expertiseSubject.value;

    let obj = {
        name,
        classes,
        rollno,
        marksInPercentage,
        expertiseSubject
    }

    axios.post("https://crudcrud.com/api/b2c5d9ed7c3e43d38a293e0d24186fc6/studentsDetails", obj)
    .then((response) => {
        showDetailsOnScreen(response.data)
        console.log(response);
    })
    .catch((err) => console.log(err))
}

// Display Expense On Screen
function showDetailsOnScreen(details) {
    document.getElementById('name').value = '';

    const parentNode = document.getElementById('list')
    const childHTML = `<li id=${details._id}> ${details.name} - ${details.classes} - ${details.rollno} - ${details.marksInPercentage} - ${details.expertiseSubject}
    <button onclick=deleteDetails('${details._id}')>Delete Details</button>
    <button onclick=editDetails('${details._id}','${details.name}','${details.classes}','${details.rollno}','${details.marksInPercentage}','${details.expertiseSubject}')>Edit Details</button>
    </li>`
    parentNode.innerHTML = parentNode.innerHTML + childHTML;

    document.getElementById('rollno').value = '';
    document.getElementById('marksInPercentage').value = '';
    
}

// Displays details after reload
window.addEventListener("DOMContentLoaded",() => {
    axios.get("https://crudcrud.com/api/b2c5d9ed7c3e43d38a293e0d24186fc6/studentsDetails")
    .then((response) => {
        for(let i=0; i<response.data.length; i++) {
            showDetailsOnScreen(response.data[i])
        }
    })
    .catch((err) => console.log(err))
})

// Delete Details
function deleteDetails(id) {
    axios.delete(`https://crudcrud.com/api/b2c5d9ed7c3e43d38a293e0d24186fc6/studentsDetails/${id}`)
    .then((response) => console.log(response))
    .catch((err) => console.log(err))

    deleteDetailsFromScreen(id)
}

// Delete details from screen
function deleteDetailsFromScreen(id) {
    const parentNode = document.getElementById('list');
    const child = document.getElementById(id);

    parentNode.removeChild(child)
}

// Edit expense details
function editDetails(id, name, classes, rollno, marksInPercentage, expertiseSubject) {
    document.getElementById('name').value = name;
    document.getElementById('classes').value = classes;
    document.getElementById('rollno').value = rollno;
    document.getElementById('marksInPercentage').value = marksInPercentage;
    document.getElementById('expertiseSubject').value = expertiseSubject;

    deleteDetails(id)
}