let user = { name: 'Goce', password: '123' };

// Prva ============================================
const checkUser = (user, name, password) => {
    if (user.name == name) {
        if (user.password == password) {
            return true;
        } else {
            return "Wrong Password";
        }
    } else {
        return "Wrong User Name";
    }
};

const procesLogIn = (user, name, password, callback) => {
    let result = callback(user, name, password);
    if (result === true) {
        console.log(`Welcome ${user.name}`);
    } else {
        console.log(result);
    }
};

procesLogIn(user, 'Goce', '123', checkUser);

// Vtora ============================================
const math = (operation, a, b) => {
    switch (operation) {
        case '+':
            return a + b;
        case '-':
            return a - b;
        case '*':
            return a * b;
    }
};

const procesOperation = (operation, a, b, callback) => {
    if (operation == '+' || operation == '*' || operation == '-') {
        console.log(callback(operation, a, b));
    } else {
        console.log('Wrong Operator!');
    }
};

procesOperation('+', 2, 3, math);

// Treta ============================================
const compare = (a, b) => {
    if (a > b) {
        return a;
    } else if (a < b) {
        return b;
    } else {
        return "They are equal";
    }
};

const comparation = (a, b, callback) => {
    if (typeof a == 'number' && typeof b == 'number') {
        console.log(callback(a, b));
    } else {
        console.log('Please enter numbers!');
    }    
};

comparation(25, 10, compare);

// Prva ============================================
const addSqrNumbers = (a, b) => {
    return new Promise((success, fail) => {
        if (typeof a == 'number' && typeof b == 'number') {
            return success(a * a + b * b);
        } else {
            return fail('The input is wrong !');
        }
    });
};

addSqrNumbers(-2, 3)
    .then(o => {
        console.log(o);
    })
    .catch(err => {
        console.log(err);
    });

// Vtora ============================================
const checkLogIn = (user, name, password) => {
    return new Promise((success, fail) => {
        if (user.name == name && user.password == password) {
            return success(true);
        } else {
            return fail('Wrong User name or password!');
        }
    });
};

checkLogIn(user, 'Goce', '123')
    .then(o => {
        console.log(`Welcome ${user.name}`);
    })
    .catch(err => {
        console.log(err);
    });

// Treta ============================================
const guessNumber = (number) => {
    let rndNumber = Math.floor(Math.random() * 4);
    return new Promise((success, fail) => {
        if (number == rndNumber) {
            return success(`Congratulations you guesed the number ${rndNumber} right!`);
        } else {
            return fail(`Wrong The number was ${rndNumber} `);
        }
    });
};

guessNumber(3)
    .then(o => {
        console.log(o);
    })
    .catch(err => {
        console.log(err);
    });