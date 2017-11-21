class UserForm {
    constructor(user) {
        this.user = user;
    }
    destroy(){
        this.getElem().parentNode.removeChild(this.getElem());
    }

    getElem() {
        if (!this.elem) {
            this.render();
        }
        return this.elem;
    }

    render() {
        let html = _.template(`<div class="user-form">
            <form>
            <p>Full Name: <input type="text" name="fullName" required></p>
            <p>Email: <input type="text" name="email" required></p>
            <p><input type="submit" value="Submit"></p>
            </form>
        </div>`)();
        this.elem = createElementFromHtml(html);

        this.form = this.elem.querySelector('form');
        for (let prop in this.user) {
            if (this.form[prop]) {
                this.form[prop].value = this.user[prop];
            }
        }

        this.form.addEventListener('submit', this);
    }

    handleEvent(event) {
        this['on' + event.type[0].toUpperCase() + event.type.slice(1)](event);
    }

    onSubmit(event) {
        for (let prop in this.user) {
            if (this.form[prop]) {
                this.user[prop] = this.form[prop].value;
            }
        }
        this.user.save({
            email:this.form.email.value,
            fullName:this.form.fullName.value,
        })
            .then(
                ()=>{

                    this.user.email = this.form.email.value;
                    this.user.fullName = this.form.fullName.value;

                    this.getElem().dispatchEvent(new CustomEvent('user-saved', {
                        bubbles: true,
                        detail: this.user._id
                    }));

                    event.preventDefault();
                },
                error => alert(`Rejected: ${error}`)
            );
        event.preventDefault();
    }
}