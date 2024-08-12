const fetchData = new Promise((resolve, reject) => {
    let flag = false;
    if (flag) {
        setTimeout(() => {
            resolve('Data is fetched sucessful.')
        }, 2000);
    } else {
        setTimeout(() => {
            reject('An error occurred while fetching data');
        }, 2000);
    }
});

const asyncFunction = async () => {
    try {
        let result = await fetchData;
        console.log(result);
    } catch (err) {
        console.log(err);
    }
};

asyncFunction();

