// because i cant use js tools like jquery, bootstrap etc for this submission. So, i make it on my own way.

const vPillsTabsContainer = document.querySelectorAll('#v-pills-tab'),
tabContent = document.getElementById('v-pills-tabContent'),
asideSecondaryButton = document.querySelector('aside.secondary nav button'),
modalRemoveAlert = document.getElementById('removeAlert'),
bookshelfsTabs = document.getElementById('bookshelfsTabs'),
bookshelfsContents = document.getElementById('bookshelfsTabsContent');

for (let vPillsTabs of vPillsTabsContainer) {
    for (let vPillsTab of vPillsTabs.children) {
        vPillsTab.addEventListener('click', (event) => {
            if (event.target.tagName == 'A') {
                var tab = event.target;
            } else if (event.target.tagName == 'I') {
                var tab = event.target.parentNode;
            };
            let tabId = tab.id;
            let targetId = tabId.replace('-tab', '');
            for (let content of tabContent.children) {
                let contentId = content.id;
                if (contentId != targetId) {
                    content.classList.remove('show');
                };
                const toggleTransition = () => {
                    for (let con of tabContent.children) {
                        let contentId = con.id;
                        if (contentId != targetId) {
                            con.classList.remove('active');
                            setTimeout(() => {
                                con.classList.remove('show');
                            }, 50)
                        } else if (contentId == targetId) {
                            setTimeout(() => {
                                con.classList.add('active');
                                setTimeout(() => {
                                    con.classList.add('show');
                                }, 50);
                            }, 50);
                        };
                    };
                };
                content.ontransitionend = toggleTransition;
            }
            for (let vPillsTab of vPillsTabs.children) {
                const pillsId = vPillsTab.id;
                if (pillsId != tabId) {
                    vPillsTab.classList.remove('active');
                } else if (pillsId == tabId) {
                    vPillsTab.classList.add('active');
                };
            };
        });
    };
};

asideSecondaryButton.addEventListener('click', () => {
    const tab = asideSecondaryButton.parentNode.children[2];
    asideSecondaryButton.classList.toggle('collapsed');
    tab.classList.toggle('show');
});

for (let bookshelfsTab of bookshelfsTabs.children) {
    const changeTab = (event) => {
        targetId = event.target.id.replace('-tab', '')
        for (let bookshelfsTab of bookshelfsTabs.children) {
            bookshelfsTab.firstElementChild.classList.remove('active');
        };
        event.target.classList.add('active');
        for (let bookshelfsContent of bookshelfsContents.children) {
            const tabId = bookshelfsContent.id
            if (tabId != targetId) {
                bookshelfsContent.classList.remove('show');
                setTimeout(() => {
                    bookshelfsContent.classList.remove('active');
                }, 150);
            } else if (tabId == targetId) {
                setTimeout(() => {
                    bookshelfsContent.classList.add('active');
                    setTimeout(() => {
                        bookshelfsContent.classList.add('show');
                    }, 150);
                }, 150);
            };
        };
        refreshHam();
    };
    bookshelfsTab.firstElementChild.onclick = changeTab;
};


function displayEditAlert(title, author, publishedYear, category, col) {
    const editAlert = document.getElementById('editAlert'),
    closeButton = document.getElementById('closeEditAlert'),
    cancelButton = document.getElementById('cancelEditAlert'),
    deleteCard = document.getElementById('deleteCard'),
    cancelModalButtons = [closeButton, cancelButton, deleteCard],
    alertTitle = document.getElementById('editAlertTitle'),
    form = document.getElementById('formEdit'),
    formTitle = document.getElementById('editTitle'),
    formAuthor = document.getElementById('editAuthor'),
    formPublishedYear = document.getElementById('editPublishedYear'),
    formCategory = document.getElementById('editCategory');
    const formTABC = [formTitle, formAuthor, formPublishedYear, formCategory];

    alertTitle.innerText = title.innerText;
    formTitle.setAttribute('value', title.innerText);
    formAuthor.setAttribute('value', author.innerText);
    formPublishedYear.setAttribute('value', publishedYear.innerText);
    for (let optg of formCategory.children) {
        for (let opt of optg.children) {
            if (opt.innerText == category.innerText) {
                opt.setAttribute('selected', '');
            };
        };
    };

    document.body.classList.add('modal-open');
    editAlert.style.display = 'block';
    setTimeout(() => {
        editAlert.classList.add('show');
    }, 1);

    const refreshForm = () => {
        for (let optg of formCategory.children) {
            for (let opt of optg.children) {
                if (opt.innerText == category.innerText) {
                    opt.removeAttribute('selected');
                }
            }
        }
        form.classList.remove('was-validated');
        form.reset();
    };

    const remove = () => {
        editAlert.classList.remove('show');
        setTimeout(() => {
            document.body.classList.remove('modal-open');
            editAlert.style.display = 'none';
            refreshForm();
        }, 300);
        document.removeEventListener('mousedown', clickBodyRemove);
    };
    for (let button of cancelModalButtons) {
        button.onclick = remove;
    };
    const clickBodyRemove = (event) => {
        const modalContent = document.querySelector('#editAlert .modal-dialog .modal-content');
        let eventTarget = event.target;
        
        if (eventTarget == editAlert) {
            remove();
        }

    };
    setTimeout(() => {
        document.addEventListener('mousedown', clickBodyRemove);
    }, 1);

    form.onsubmit = () => {
        if (formTitle.value != '' & formAuthor.value != '' & formPublishedYear.value != '') {
            title.innerText = formTitle.value;
            author.innerText = formAuthor.value;
            publishedYear.innerText = formPublishedYear.value;
            category.innerText = formCategory.value;

            const bookStorage = JSON.parse(localStorage.getItem('storage'));
            for (let book of bookStorage) {
                if (book.id == col.id) {
                    book.title = formTitle.value;
                    book.author = formAuthor.value;
                    book.year = formPublishedYear.value;
                    book.category = formCategory.value;
                }
            }
            const stringBookStorage = JSON.stringify(bookStorage);
            localStorage.setItem('storage', stringBookStorage);

            remove();
            refreshHam();
        }
    };
};

function displayRemoveAlert() {
    const removeAlert = document.getElementById('removeAlert'),
    closeButton = document.getElementById('closeRemoveAlert'),
    cancelButton = document.getElementById('cancelRemoveAlert'),
    deleteCard = document.getElementById('deleteCard'),
    cancelModalButtons = [closeButton, cancelButton, deleteCard];

    document.body.classList.add('modal-open');
    removeAlert.style.display = 'block';
    setTimeout(() => {
        removeAlert.classList.add('show');
    }, 1);

    const remove = () => {
        removeAlert.classList.remove('show');
        setTimeout(() => {
            document.body.classList.remove('modal-open');
            removeAlert.style.display = 'none';
        }, 300)
        document.removeEventListener('mousedown', clickBodyRemove);
    };
    
    for (let button of cancelModalButtons) {
        button.onclick = remove;
    };
    function clickBodyRemove(event) {
        const modalContent = document.querySelector('#removeAlert .modal-dialog .modal-content');
        let eventTarget = event.target;
        
        if (eventTarget == removeAlert) {
            remove();
        };
    };
    setTimeout(() => {
        document.addEventListener('mousedown', clickBodyRemove);
    }, 1);
};
