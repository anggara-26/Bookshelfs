const unreadBook = document.getElementById('unreadBookshelfs'),
unreadContainer = unreadBook.firstElementChild,
readedBook = document.getElementById('readedBookshelfs'),
readedContainer = readedBook.firstElementChild,
unreadButton = document.querySelector('.unreadButton'),
readedButton = document.querySelector('.readedButton'),
form = document.querySelector('.mainContainer form'),
title = document.getElementById('title'),
author = document.getElementById('author'),
publishedYear = document.getElementById('publishedYear'),
category = document.getElementById('category'),
liveToast = document.getElementById('newBookNotification'),
closeNotification = document.getElementById('closeNewBookNotification'),
BST = document.querySelector('.BST');

const bookList = []; // list for local storage

if (localStorage.getItem('storage') == undefined) { // adding storage into local storage if there is no storage in local storage
    const parsed = JSON.stringify(bookList);
    localStorage.setItem('storage', parsed);
}

function formClicked(title, author, year, category, isCompleted) { // get the form input and turn it into an object
    return { id: +new Date(), title, author, year, category, isCompleted }
};

function appendTheBook(book) { // append new book to local storage list
    const bookStorage = JSON.parse(localStorage.getItem('storage'));
    bookStorage.push(book);
    const stringBookStorage = JSON.stringify(bookStorage);
    localStorage.setItem('storage', stringBookStorage);
};

function toast(bookshelfs, title) { // notification after submit new book form
    document.querySelector('.toastBookTitle').innerText = title;
    if (bookshelfs == 'readedBook') {
        BST.innerText = 'readed';
    } else if (bookshelfs == 'unreadBook') {
        BST.innerText = 'unread';
    } else {
        BST.innerText = 'unread';
    };
    liveToast.classList.remove('hide-toast');
    liveToast.classList.add('show-toast');
    closeNotification.addEventListener('click', () => {
        liveToast.classList.remove('show-toast');
        liveToast.classList.add('hide-toast');
        return
    });
    setTimeout(() => {
        liveToast.classList.remove('show-toast');
        liveToast.classList.add('hide-toast');
    }, 5000)
};

function newBook(bookshelf, spanTitleText, ST1T, ST2T, spanFooterText, id, isCompleted) { // create a card and append it to bookshelfs
    const col = document.createElement('div'),
    card = document.createElement('div'),
    cardBody = document.createElement('div'),
    cardTitle = document.createElement('h5'),
    spanTitle = document.createElement('span'),
    cardText1 = document.createElement('p'),
    spanText1 = document.createElement('span'),
    cardText2 = document.createElement('p'),
    spanText2 = document.createElement('span'),
    cardFooter = document.createElement('div'),
    spanFooter = document.createElement('span'),
    hamburger = document.createElement('div'),
    line1 = document.createElement('span'),
    line2 = document.createElement('span'),
    line3 = document.createElement('span'),
    settingButtonContainer = document.createElement('div'),
    checkDashButton = document.createElement('div'),
    pencilButton = document.createElement('div'),
    trashButton = document.createElement('div');
    lineList = [line1, line2, line3];

    col.setAttribute('class', 'col mb-4');
    col.setAttribute('id', `${id}`);
    card.setAttribute('class', 'card h-100');
    cardBody.setAttribute('class', 'card-body');
    cardFooter.setAttribute('class', 'card-footer text-center');

    cardTitle.setAttribute('class', 'card-title');
    spanTitle.setAttribute('class', 'title');
    spanTitle.innerText = spanTitleText;
    cardTitle.appendChild(spanTitle);

    cardText1.setAttribute('class', 'card-text');
    cardText1.innerText = 'Author : ';
    spanText1.setAttribute('class', 'author');
    spanText1.innerText = ST1T;
    cardText1.appendChild(spanText1);

    cardText2.setAttribute('class', 'card-text');
    cardText2.innerText = 'published in ';
    spanText2.setAttribute('class', 'publishedYear');
    spanText2.innerText = ST2T;
    cardText2.appendChild(spanText2);

    spanFooter.setAttribute('class', 'category');
    spanFooter.innerText = spanFooterText;
    cardFooter.appendChild(spanFooter);

    hamburger.setAttribute('class', 'hamburger')
    hamburger.setAttribute('id', 'hamburger')
    hamburger.setAttribute('onclick', 'hamburger(event)')
    for (let line of lineList) {
        line.setAttribute('class', 'line')
        hamburger.appendChild(line);
    }
    settingButtonContainer.setAttribute('class', 'setting-button-container');
    if (isCompleted == true) {
        const chButton = 'dash-button';
        checkDashButton.setAttribute('class', `${chButton}`);
        checkDashButton.setAttribute('onclick', 'moveCard(event)')
    } else if (isCompleted == false) {
        const chButton = 'check-button';
        checkDashButton.setAttribute('class', `${chButton}`);
        checkDashButton.setAttribute('onclick', 'moveCard(event)')
    }
    pencilButton.setAttribute('class', 'pencil-button');
    pencilButton.setAttribute('onclick', 'editCard(event)')
    trashButton.setAttribute('class', 'trash-button');
    trashButton.setAttribute('onclick', 'deleteCard(event)');
    trashButton.setAttribute('data-toggle', 'modal');
    trashButton.setAttribute('data-target', '#removeAlert');
    settingButtonContainer.innerHTML = checkDashButton.outerHTML + pencilButton.outerHTML + trashButton.outerHTML;
    
    cardBody.innerHTML = cardTitle.outerHTML + cardText1.outerHTML + cardText2.outerHTML;
    card.innerHTML = cardBody.outerHTML + cardFooter.outerHTML + hamburger.outerHTML + settingButtonContainer.outerHTML;
    col.appendChild(card);
    bookshelf.appendChild(col);
};

unreadButton.addEventListener('click', () => { // append card to unread bookshelfs container
    if (title.value != '' & author.value != '' & publishedYear.value != '' & category.value != '') {
        appendTheBook(formClicked(title.value, author.value, publishedYear.value, category.value, false));
        const bookStorage = JSON.parse(localStorage.getItem('storage'));
        const lastBook = bookStorage[bookStorage.length - 1];

        newBook(unreadContainer, title.value, author.value, publishedYear.value, category.value, lastBook.id, false);

        setTimeout( () => {
            form.classList.remove('was-validated');
            form.reset();
        }, 1000);
        toast('unreadBook', title.value);
    };
});

readedButton.addEventListener('click', () => { // append card to readed bookshelfs container
    if (title.value != '' & author.value != '' & publishedYear.value != '' & category.value != '') {
        appendTheBook(formClicked(title.value, author.value, publishedYear.value, category.value, true));
        const bookStorage = JSON.parse(localStorage.getItem('storage'));
        const lastBook = bookStorage[bookStorage.length - 1];

        newBook(readedContainer, title.value, author.value, publishedYear.value, category.value, lastBook.id, true);

        setTimeout( () => {
            form.classList.remove('was-validated');
            form.reset();
        }, 1000);
        toast('readedBook', title.value);
    };
});

if (localStorage.getItem('storage') != undefined) { // adding book on local storage into unread/readed container if there is storage in local storage
    const bookStorage = JSON.parse(localStorage.getItem('storage'));
    for (let book of bookStorage) {
        if (book.isCompleted == false) {
            newBook(unreadContainer, book.title, book.author, book.year, book.category, book.id, book.isCompleted);
        } else if (book.isCompleted == true) {
            newBook(readedContainer, book.title, book.author, book.year, book.category, book.id, book.isCompleted);
        };
    };
};

function hamburger(e) { // open or closing the hamburger menu if get clicked
    if (e.target.classList.contains('line')) {
        const ham = e.target.parentNode;
        const sbc = ham.nextElementSibling;
        const setButtons = sbc.children;
        ham.classList.toggle('is-active');
        if (ham.classList.contains('is-active')) {
            sbc.classList.add('is-active');
            for (let setButton of setButtons) {
                setButton.classList.add('is-active');
            };
        } else {
            sbc.classList.remove('is-active');
            for (let setButton of setButtons) {
                setButton.classList.remove('is-active');
            };
        }
    } else if (e.target.classList.contains('hamburger')) {
        const ham = e.target;
        const sbc = ham.nextElementSibling;
        const setButtons = sbc.children;
        ham.classList.toggle('is-active');
        if (ham.classList.contains('is-active')) {
            sbc.classList.add('is-active');
            for (let setButton of setButtons) {
                setButton.classList.add('is-active');
            };
        } else {
            sbc.classList.remove('is-active');
            for (let setButton of setButtons) {
                setButton.classList.remove('is-active');
            };
        }
    };
};

function moveCard(e) { // swap card between unread and readed container if get clicked
    let seq = 0
    thisCol = e.target.parentNode.parentNode.parentNode;
    colContainer = thisCol.parentNode.parentNode.children[0];

    if (colContainer == unreadContainer) {
        readedContainer.appendChild(thisCol);
        const bookStorage = JSON.parse(localStorage.getItem('storage'));
        for (let book of bookStorage) {
            if (book.id == thisCol.id) {
                book.isCompleted = true;
                const stringBookStorage = JSON.stringify(bookStorage);
                localStorage.setItem('storage', stringBookStorage);
            };
            seq += 1
        };
    } else if (colContainer == readedContainer) {
        unreadContainer.appendChild(thisCol);
        const bookStorage = JSON.parse(localStorage.getItem('storage'));
        for (let book of bookStorage) {
            if (book.id == thisCol.id) {
                book.isCompleted = false;
                const stringBookStorage = JSON.stringify(bookStorage);
                localStorage.setItem('storage', stringBookStorage);
            };
            seq += 1
        };
    };
    refreshHam();
    swapCheckDashButton(thisCol)
};

function refreshHam() { // closing hamburger menu
    const refresh = (col) => {
        const ham = col.firstElementChild.children[2];
        const sbc = ham.nextElementSibling;
        const sbcChilds = sbc.children;
        ham.classList.remove('is-active');
        sbc.classList.remove('is-active');
        for (let child of sbcChilds) {
            child.classList.remove('is-active');
        }
    }
    for (let col of unreadContainer.children) {
        refresh(col)
    }
    for (let col of readedContainer.children) {
        refresh(col)
    }
}

function swapCheckDashButton(card) { // change button icon if get swapped
    const chButton = card.firstElementChild.children[3].firstElementChild;
    if (chButton.classList.contains('check-button')) {
        chButton.classList.replace('check-button', 'dash-button');
    } else if (chButton.classList.contains('dash-button')) {
        chButton.classList.replace('dash-button', 'check-button');
    };
};

function editCard(e) { // edit choosen book
    const thisCol = e.target.parentNode.parentNode.parentNode,
    thisCard = thisCol.firstElementChild,
    cardBody = thisCard.children[0],
    cardFooter = thisCard.children[1],
    title = cardBody.children[0].firstElementChild,
    author = cardBody.children[1].firstElementChild,
    publishedYear = cardBody.children[2].firstElementChild,
    category = cardFooter.children[0];

    displayEditAlert(title, author, publishedYear, category, thisCol);
};

function deleteCard(e) { // delete card
    displayRemoveAlert();
    let seq = 0
    thisCol = e.target.parentNode.parentNode.parentNode;
    document.getElementById('deleteCard').addEventListener('click', () => {
        const bookStorage = JSON.parse(localStorage.getItem('storage'));
        for (let bf of bookStorage) {
            if (bf.id == thisCol.id) {
                bookStorage.splice(seq, 1);
                thisCol.remove();
                const stringBookStorage = JSON.stringify(bookStorage);
                localStorage.setItem('storage', stringBookStorage);
            };
            seq += 1
        };
    });
};

document.getElementById('formSearch').addEventListener('submit', () => { // run search feature if get submitted
    const input = document.getElementById('formSearchInput').value.toLowerCase();
    for (let col of unreadContainer.children) { // looping a card in unread and readed container
        const cardBody = col.firstElementChild.children[0], // get card childs
        cardFooter = col.firstElementChild.children[1],
        title = cardBody.children[0].firstElementChild,
        author = cardBody.children[1].firstElementChild,
        publishedYear = cardBody.children[2].firstElementChild,
        category = cardFooter.firstElementChild,
        loop = [title.innerText, author.innerText, publishedYear.innerText, category.innerText];
        displayCard(col, loop, input);
    };
    for (let col of readedContainer.children) {
        const cardBody = col.firstElementChild.children[0],
        cardFooter = col.firstElementChild.children[1],
        title = cardBody.children[0],
        author = cardBody.children[1],
        publishedYear = cardBody.children[2],
        category = cardFooter.firstElementChild,
        loop = [title.innerText, author.innerText, publishedYear.innerText, category.innerText];
        displayCard(col, loop, input);
    };
    function displayCard(col, loop, input) { // display card if match with form input
        for (let component of loop) {
            if (component.toLowerCase().includes(input)) {
                col.style.display = 'block';
                break
            } else {
                col.style.display = 'none';
            }
        };
    };
});