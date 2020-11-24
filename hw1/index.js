let user = { name: 'Goce', password: '123' };


const checkUser = (user, name, password) => {
    if (user.name == name) {
        if (user.password == password) {
            return user;
        } else return "Wrong Password";
    } else return "Wrong User Name";
}

const procesLogIn = (user, name, password, callback) => {
    console.log(callback(user, name, password));
}

procesLogIn(user, 'Goce', '123', checkUser)

const math = (operation, a, b) => {
    switch (operation) {
        case '+':
            return a + b;
        case '-':
            return a - b;
        case '*':
            return a * b;
    }
}

const procesOperation = (operation, a, b, callback) => {
    if (operation == '+' || operation == '*' || operation == '-') {
        console.log(callback(operation, a, b));
    } else console.log('Wrong Operator!')
}

procesOperation('+', 2, 3, math);


const compare = (a, b) => {
    if (a > b) {
        return a;
    } else if (a < b) {
        return b;
    } else return "They are equal";
}

const comparation = (a, b, callback) => {
    if (typeof a == 'number' && typeof b == 'number') {
        console.log(compare(a, b))
    } else console.log('Please enter numbers!')
}

comparation(25, 10, compare)


const addOddNumbers = (a, b) => {
    return new Promise((success, fail) => {
        if ((a % 2) != 0 && (b % 2) != 0) {
            return success(a + b);
        } else {
            return fail('The numbers are not Odd !');
        }
    });
}

addOddNumbers(7, 5)
    .then(o => {
        console.log(o);
    })
    .catch(err => {
        console.log(err);
    });

const checkLogIn = (user, name, password) => {
    return new Promise((success, fail) => {
        if (user.name == name && user.password == password) {
            return success(`Welcome ${user.name}`);
        } else {
            return fail('Wrong User name or password!');
        }
    });
}

checkLogIn(user, 'Goce', '123')
    .then(o => {
        console.log(o);
    })
    .catch(err => {
        console.log(err);
    })

const guessNumber = (number) => {
    let rndNumber = Math.floor(Math.random() * 4);
    return new Promise((success, fail) => {
        if (number ==rndNumber ) {
            return success(`Congratulations you guesed the number ${rndNumber} right!`);
        } else {
            return fail(`Wrong The number was ${rndNumber} `);
        }
    });
}

guessNumber(3)
    .then(o => {
        console.log(o);
    })
    .catch(err => {
        console.log(err);
    })