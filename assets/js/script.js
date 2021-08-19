window.addEventListener('load', () => {
    // form
    const forms = document.getElementsByTagName('form');
    for (let form of forms) {
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            if (form.classList.contains('needs-validation')) {
                form.classList.add('was-validated');
            }
        })
    }
    // responsive
    const heightMQ = (x) => {
        const asideMain = document.querySelector('aside.main');
        const asideSecondary = document.querySelector('aside.secondary');
        const addBook = document.querySelector('.addBook');
        const bookshelfs = document.querySelector('.bookshelfs');
        const main = document.querySelector('main');
        if (x.matches) {
            asideMain.setAttribute('hidden', '');
            asideSecondary.removeAttribute('hidden');
            bookshelfs.style.height = main.clientHeight + 'px';
            addBook.style.height = main.clientHeight + 'px';
        } else {
            asideMain.removeAttribute('hidden');
            asideSecondary.setAttribute('hidden', '');
            main.style.height = '100vh';
            addBook.style.height = '100vh';
            bookshelfs.style.height = '100vh';
        }
    }
    const windowWidth = window.matchMedia("(max-width: 880px)")
    heightMQ(windowWidth)
    window.addEventListener('resize', () => {heightMQ(windowWidth)})
});
