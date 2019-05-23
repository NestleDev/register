import Validation from './modules/validation';

new Validation('#register-form', {
    password(target) {
        if (target.value.length < 4) {
            target.parentNode.classList.add('field_error');

            return false;
        } else {
            target.parentNode.classList.remove('field_error');
            return true;
        }
    },
    email(target) {
        const reqExpMail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (reqExpMail.test(target.value)) {
            target.parentNode.classList.remove('field_error');

            return true;
        } else {
            target.parentNode.classList.add('field_error');

            return false;
        }
    },
    agreement(target) {
        if (target.checked) {
            return true;
        } else {
            return false
        }
    }
});