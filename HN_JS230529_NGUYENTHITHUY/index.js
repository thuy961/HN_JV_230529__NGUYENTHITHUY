let btsSelector = document.querySelector('.luutru');
let tbody = document.querySelector('tbody');
let nameSelector = document.querySelector('#name');
let emailSelector = document.querySelector('#email');
let phoneSelector = document.querySelector('#phone');
let addressSelector = document.querySelector('#address');
let sortButton = document.querySelector('.sort_ten');
let btsSearch = document.querySelector('.bts_search');
let inputSearch = document.querySelector('.search input');


let students = [
    {
        id: crypto.randomUUID(),
        name: 'thuy nguyen',
        email: 'thuynguyen@gmail.com',
        phone: '344657669',
        address: 'Nghe An',
        sex: 'Nu'
    }
    
];


function showListStudent() {
   let studentLocal = localStorage.getItem('studentLocalStorage');
   let studentsInLoop;
    
    if(studentLocal === null) {
        studentsInLoop = students;
        
        localStorage.setItem('studentLocalStorage',JSON.stringify(students));
    } 
    else {
        studentsInLoop =  JSON.parse(localStorage.getItem('studentLocalStorage'));
    }
   
    let resultHtml = '';
    for (let i = 0; i < studentsInLoop.length; i++) {
        let student = studentsInLoop[i];
        resultHtml = resultHtml + ` <tr>
                <td>${i + 1}</td>
                <td>${student.name}</td>
                <td>${student.email}</td>
                <td>${student.phone}</td>
                <td>${student.address}</td>
                <td>${student.sex}</td>
                <td>
                    <button type="button" data-id="${student.id}" class="bts bts-v">Edit</button>
                    <button type="button" data-id="${student.id}" class="bts bts-xx">Delete</button>
                </td>
            </tr>`
    }
    
    tbody.innerHTML = resultHtml;
}


function handleAddStudent(event) {
    let name = nameSelector.value;
    let email = emailSelector.value;
    let address = addressSelector.value;
    let phone = phoneSelector.value;
    let sex = document.querySelector('.choice:checked').value;
    if(name === '') {
        alert('vui long nhap ho va ten')
        return;
    }
    if(email === '') {
        alert('vui long nhap email')
        return;
    }

    if (event.target.classList.contains('update')) {
        let idUpdate = event.target.getAttribute('data-id');
        let indexEdit;
        for (let i = 0; i < students.length; i++) {
            if (students[i].id === idUpdate) {
                indexEdit = i;
                break;
            }
        }
      
        students[indexEdit].name = name;
        students[indexEdit].email = email;
        students[indexEdit].address = address;
        students[indexEdit].phone = phone;
        students[indexEdit].sex = sex;
       
        showListStudent();
       
        document.querySelector('form').reset();
        
        btsSelector.classList.remove('update');
        btsSelector.removeAttribute('data-id');
        btsSelector.innerText = 'Lưu Lại';


    } else {
        document.querySelector('.bang').classList.remove('glu');
        document.querySelector('.list_header').innerText = 'Danh sách sinh viên';
        let students = JSON.parse(localStorage.getItem('studentLocalStorage'));
       
        let objStudentAdd = {
            id: crypto.randomUUID(),
            name: name,
            email: email,
            address: address,
            phone: phone,
            sex: sex
        };
       
        students.push(objStudentAdd)
        localStorage.setItem('studentLocalStorage', JSON.stringify(students));
         showListStudent();
    }


}

function handleProcessStudent(event) {
    let clicked = event.target;
    if (clicked.classList.contains('bts-danger')) {
        let confirmDelete = confirm('Bạn chắc chắn muốn xóa không ?');

        if (confirmDelete) {
           
            let students = JSON.parse(localStorage.getItem('studentLocalStorage'));
            
           
            let idDelete = clicked.getAttribute('data-id');
           
            
            let indexDelete;
            for (let i = 0; i < students.length; i++) {
                if (students[i].id === idDelete) {
                    indexDelete = i;
                    break;
                }
            }
            console.log('indexDelete',idDelete);
           
            students.splice(indexDelete, 1);
            localStorage.setItem('studentLocalStorage', JSON.stringify(students));
            if (students.length === 0) {
                document.querySelector('.bang').classList.add('glu');
                document.querySelector('.list_header').innerText = 'Danh sách trống';
            }

            
            showListStudent();
            document.querySelector('form').reset();
            // 7. reset button update to add
            btsSelector.classList.remove('update');
            btsSelector.removeAttribute('data-id');
            btsSelector.innerText = 'Lưu Lại';
        }


    } else if (clicked.classList.contains('bts-v')) {
        let idEdit = clicked.getAttribute('data-id');
        let indexEdit;
        for (let i = 0; i < students.length; i++) {
            if (students[i].id === idEdit) {
                indexEdit = i;
                break;
            }
        }
        let objEdit = students[indexEdit];
        nameSelector.value = objEdit.name;
        emailSelector.value = objEdit.email;
        phoneSelector.value = objEdit.phone;
        addressSelector.value = objEdit.address;
        document.querySelector(`input[value=${objEdit.sex}]`).checked = true;
        btsSelector.classList.add('update');
        btsSelector.setAttribute('data-id', idEdit);
        btsSelector.innerText = 'Update';


    }
}


function handleSortStudent() {
    students.sort(
        function(first, next) {
            let nameFirst = first.name.toLowerCase();
            let nameNext = next.name.toLowerCase();
            if(nameFirst < nameNext) {
                return -1;
            }
            if(nameFirst > nameNext) {
                return 1;
            }
            return 0;
        }
    )
    showListStudent();
}


function handleSearch() {
    let valueSearch = inputSearch.value.toLowerCase();
    console.log(valueSearch);
    let studentFilter = students.filter(
        function(studentItem) {
            return studentItem.name.toLowerCase().indexOf(valueSearch) !== -1;
        }
    );

    let resultHtml = '';
    for (let i = 0; i < studentFilter.length; i++) {
        let student = studentFilter[i];
        resultHtml = resultHtml + ` <tr>
                <td>${i + 1}</td>
                <td>${student.name}</td>
                <td>${student.email}</td>
                <td>${student.phone}</td>
                <td>${student.address}</td>
                <td>${student.sex}</td>
                <td>
                    <button type="button" data-id="${student.id}" class="bts bts-v">Edit</button>
                    <button type="button" data-id="${student.id}" class="bts bts-xx">Delete</button>
                </td>
            </tr>`
    }
    tbody.innerHTML = resultHtml;
}
showListStudent();
btsSelector.addEventListener('click', handleAddStudent);
tbody.addEventListener('click', handleProcessStudent);
sortButton.addEventListener('click', handleSortStudent);
btsSearch.addEventListener('click', handleSearch);
inputSearch.addEventListener('keyup', handleSearch);
