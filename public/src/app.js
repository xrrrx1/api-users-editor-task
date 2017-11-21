class Application {
    constructor() {
        this.userList = new UserList();
        this.render();
    }

    render() {
        document.body.append(this.userList.getElem());

        this.load();

        this.userList.getElem().addEventListener('user-select', this.onUserSelect.bind(this))
    }

    onUserSelect(event)  {
    let user = this.users.find(user => user._id == event.detail);
    console.log(user);
    if (this.userForm) {
        this.userForm.destroy();
        }
        this.userForm = new UserForm(user);
        this.userForm.getElem().addEventListener('user-saved', this.onUserSaved.bind(this));

        document.body.append(this.userForm.getElem());
    }

    onUserSaved(event) {
        this.userList.showUsers(this.users);
        this.onUserSelect({detail:event.detail});

    }

    load() {
        let xhr = new XMLHttpRequest();
        //todo: change 'URL' to your URL
        xhr.open('GET', 'URL');
        xhr.onload = () => {
            this.users = JSON.parse(xhr.responseText).map((userModel)=>{return new User(userModel)});
            this.userList.showUsers(this.users);
        };
        xhr.send();
    }
}