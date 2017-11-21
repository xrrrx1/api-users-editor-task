class User {

    constructor(Model) {
        this._id = Model._id;
        this.fullName = Model.fullName;
        this.email = Model.email;
        this.birthdate = Model.birthdate;
    }

    save(model) {
        let user = this;
        return new Promise(function(resolve, reject) {

            let xhr = new XMLHttpRequest();
            //todo: change 'URL' to your URL
            xhr.open('PATCH', 'URL'+user._id, true);

            xhr.onload = function() {
                if (this.status == 200) {
                    resolve(this.response);
                } else {
                    let error = new Error(this.statusText);
                    error.code = this.status;
                    reject(error);
                }
            };

            xhr.onerror = function() {
                reject(new Error("Network Error"));
            };
            xhr.send(JSON.stringify(model));
        });

    }

}