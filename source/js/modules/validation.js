import "babel-polyfill";

export default class {
    constructor(selector, methods) {
        this.form = document.querySelector(selector);
        this.validationFields = this.form.querySelectorAll('input[required]');
        this.methods = methods;
        this.notifications = document.querySelector('#notifications');
        this.initEvents();
    }

    initEvents() {
        if (this.validationFields.length) {
            for (let i = 0; i < this.validationFields.length; i++) {
                const field = this.validationFields[i];

                field.addEventListener('blur', this.validationField.bind(this));
            }
        }

        if (this.form) {
            this.form.addEventListener('submit', this.submitForm.bind(this));
        }
    }

    validationField({ target }) {
        if (this.methods[target.name]) {
            return this.methods[target.name](target);
        }
    }

    checkEmail(email) {
        return fetch('../emails.json')
            .then(response => response.json())
            .then(data => {
                for (const item of data) {
                    if (item.email === email) {
                        return true;
                    }
                }
            })
    }

    async submitForm(event) {
        event.preventDefault();

        if (this.validationFields.length) {
            for (let i = 0; i < this.validationFields.length; i++) {
                const field = this.validationFields[i];

                if (!this.validationField({ target: field })) {
                    return;
                }

                if (field.name === 'email') {
                    const status = await this.checkEmail(field.value);
                    console.log(status)
                    if (status) {
                        this.notifications.innerHTML = '<div class="notification"><span>Учётная запись с указанным e-mail уже существует</span></div>';
                        return;
                    }
                }
            }
        }

        console.log('submit');
        fetch('/', { method: 'POST', body: new FormData(this.form) })
            .then(response => response.json())
            .then(data => {
                this.notifications.innerHTML = `<div class="notification"><span>${data.message}</span></div>`;
                this.form.reset();
            })
            .catch(error => {
                this.notifications.innerHTML = `<div class="notification notification_success"><span>${"Пользователь успешно создан"}</span></div>`;
                this.form.reset();
            })
    }
}