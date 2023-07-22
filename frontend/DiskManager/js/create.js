const createfile = (name, directoryPath) => {
    var list = document.getElementById('fnflist');
    const str = directoryPath;
    let card = document.createElement('div');
    card.setAttribute('class', 'card my-1');
    card.setAttribute('id', name);
    let cardBody = document.createElement('div');
    cardBody.setAttribute('class', 'card-body');
    cardBody.setAttribute('style', 'background-color:rgb(234, 232, 234);');
    let checkbox = document.createElement('input'); checkbox.setAttribute('type', 'checkbox');
    checkbox.addEventListener('change', () => {
        let stack = JSON.parse(localStorage.getItem('delFiles'));
        if (stack.includes(str)) stack.splice(stack.indexOf(str), 1);
        else stack.push(str);
        localStorage.setItem('delFiles', JSON.stringify(stack));
    });
    cardBody.appendChild(checkbox);
    let image = document.createElement('img');
    image.setAttribute('src', 'https://th.bing.com/th/id/OIP.t7ly-kycesSh5XlD78SMDAHaKB?w=140&h=190&c=7&r=0&o=5&dpr=1.4&pid=1.7');
    image.setAttribute('style', 'height:30px'); image.setAttribute('class', 'mx-2');
    cardBody.appendChild(image);
    card.appendChild(cardBody);
    list.appendChild(card);
    let fileName = document.createElement('span');
    fileName.setAttribute('class', 'mx-2');
    fileName.innerText = name;
    let delButton = document.createElement('button');
    delButton.setAttribute('class', 'btn btn-danger float-end');
    delButton.addEventListener('click', () => {
        let stack = JSON.parse(localStorage.getItem('stack'));
        const new_path = ((stack.length) ? stack[stack.length - 1] : '') + name;
        if (confirm('Do you really want to delete this file?')) {
            fetch('http://localhost:2000/deleteFiles', {
                method: "DELETE",
                mode: "cors",
                cache: "no-cache",
                credentials: "same-origin",
                headers: {
                    "Content-Type": "application/json",
                },
                redirect: "follow",
                referrerPolicy: "no-referrer",
                body: JSON.stringify({ arr: [new_path] }),
            }).then(response => response.json()).then(data => {
                if (data) alert("File Deleted Successfully!");
                else alert("Failure to delete file");
                window.location.reload();
            })
        };
    });
    delButton.innerHTML += '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16"><path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/><path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/></svg > ';
    cardBody.appendChild(fileName);
    cardBody.appendChild(delButton);
}

const createfolder = (name) => {
    var list = document.getElementById('fnflist');
    let card = document.createElement('div');
    card.setAttribute('class', 'card my-1');
    card.setAttribute('id', name);
    let cardBody = document.createElement('div');
    cardBody.setAttribute('class', 'card-body');
    cardBody.setAttribute('style', 'background-color:rgb(234, 232, 234);');
    let image = document.createElement('img');
    image.setAttribute('src', 'data:image/jpeg;base64,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');
    image.setAttribute('style', 'height:30px');
    cardBody.appendChild(image);
    card.appendChild(cardBody);
    list.appendChild(card);
    let folderName = document.createElement('span');
    folderName.setAttribute('class', 'mx-2');
    folderName.innerText = name;
    cardBody.appendChild(folderName);
    let delButton = document.createElement('button');
    delButton.setAttribute('class', 'btn btn-danger float-end');
    delButton.addEventListener('click', () => {
        let stack = JSON.parse(localStorage.getItem('stack'));
        const new_path = ((stack.length) ? stack[stack.length - 1] : '') + name;
        if (confirm('Do you really want to delete this folder?')) {
            fetch('http://localhost:2000/deleteFolders', {
                method: "DELETE",
                mode: "cors",
                cache: "no-cache",
                credentials: "same-origin",
                headers: {
                    "Content-Type": "application/json",
                },
                redirect: "follow",
                referrerPolicy: "no-referrer",
                body: JSON.stringify({ arr: [new_path] }),
            }).then(response => response.json()).then(data => {
                if (data) alert("File Deleted Successfully!");
                else alert("Failure to delete file");
                window.location.reload();
            })
        };
    });
    delButton.innerHTML += '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16"><path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/><path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/></svg > ';
    cardBody.appendChild(delButton);
    cardBody.addEventListener('click', (event) => {
        if (event.target.tagName == 'svg' || event.target.tagName == 'BUTTON') return;
        localStorage.setItem('delFiles', JSON.stringify([]));
        let stack = JSON.parse(localStorage.getItem('stack'));
        const new_path = ((stack.length) ? stack[stack.length - 1] : '') + name + '\\';
        stack.push(new_path);
        localStorage.setItem('stack', JSON.stringify(stack));
        window.location.reload();
    })
}

const extractLast = (str) => {
    let res = '';
    str = str.split('').reverse().join('');
    let index = str.indexOf('\\');
    for (let k = 0; k < index; k++) {
        res += str[k];
    }
    res = res.split('').reverse().join('');
    return res;
}