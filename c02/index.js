// const cb = () => {
//     console.log('timed out');
// }

// cb();

// setTimeout(cb, 3000);

// console.log('***');

// const rezultat = (calc, a, b) => {
//     console.log('Rezultatot e ', calc(a, b));
// }

// rezultat((c, d) => {
//     return c * d;
// }, 4, 3);

//========================================

// const printConvertedResult = (output) => {
//     console.log(output)
// }

// const showTemperature = (degrees, conversionMethod, printConvertedResult) => {
//     let output = 0;
//     switch (conversionMethod) {
//         case 'c2f':
//             output = degrees * (9 / 5) + 32;
//             printConvertedResult(output);
//             break;
//         case 'f2c':
//             output = (degrees - 32) * 5 / 9;
//             printConvertedResult(output);
//             break;
//     }
// }

// showTemperature(42, 'f2c', printConvertedResult);

const sobiranje = (a, b) => {
    return new Promise((success, fail) => {
        if (a >= 0 && b >= 0) {
            return success(a + b);
        } else {
            return fail('Ne e dozvoleno sobirajne so negativni broevi!');
        }
    });
}

sobiranje(-6, 5)
    .then(o => {
        console.log(o);
    })
    .catch(err => {
        console.log(err);
    });