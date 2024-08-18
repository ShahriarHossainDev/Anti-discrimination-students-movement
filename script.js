function addTextField(sectionId) {
    var section = document.getElementById(sectionId);
    if (!section) {
        console.error('Section with ID ' + sectionId + ' not found.');
        return;
    }

    var count = section.getElementsByTagName('textarea').length + 1;
    var newField = document.createElement('div');
    newField.className = 'input-group mt-2';

    var textarea = document.createElement('textarea');
    textarea.className = 'form-control';
    textarea.name = sectionId + '[]';
    textarea.rows = 2;
    textarea.placeholder = 'বিস্তারিত লিখুন ' + count + '...';

    newField.appendChild(textarea);

    section.appendChild(newField);
}

document.getElementById('studentForm').addEventListener('submit', function (event) {
    event.preventDefault();

    var formData = new FormData(event.target);
    var formObject = {};

    formData.forEach(function (value, key) {
        if (key in formObject) {
            if (!Array.isArray(formObject[key])) {
                formObject[key] = [formObject[key]];
            }
            formObject[key].push(value);
        } else {
            formObject[key] = value;
        }
    });

    var photoInput = document.getElementById('photo');
    if (photoInput.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            formObject.photoUrl = e.target.result;
            submitForm(formObject);
        };
        reader.readAsDataURL(photoInput.files[0]);
    } else {
        formObject.photoUrl = '';
        submitForm(formObject);
    }
});

function submitForm(formObject) {
    fetch('https://script.google.com/macros/s/AKfycbwgZVZW3WWs5sWe3LzxMJ3mbqH_3qwKOfCiM9E0DWNA48ZmCW_5jfLjCstOprPLQ7d-/exec', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formObject)
    })
    .then(response => response.text())
    .then(result => {
        alert('Form submitted successfully!');
        document.getElementById('studentForm').reset();
        document.getElementById('preview').style.display = 'none';
    })
    .catch(error => console.error('Error:', error));
}

function previewImage(event) {
    const file = event.target.files[0];
    const preview = document.getElementById('preview');

    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            preview.src = e.target.result;
            preview.style.display = 'block';
            preview.style.maxWidth = '200px';
            preview.style.height = '200px';
            preview.style.border = '1px solid #ddd';
            preview.style.borderRadius = '8px';
        };
        reader.readAsDataURL(file);
    } else {
        preview.src = '';
        preview.style.display = 'none';
    }
}
