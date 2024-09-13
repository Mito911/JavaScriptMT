
const asyncAdd = async (a, b) => {
    if (typeof a !== 'number' || typeof b !== 'number') {
        return Promise.reject('Argumenty muszą mieć typ number!');
    }
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(a + b);
        }, 100);
    });
};


const asyncSum = async (...args) => {
    if (args.length === 0) return 0;
    if (args.length === 1) return args[0];

    let result = args[0];
    for (let i = 1; i < args.length; i++) {
        result = await asyncAdd(result, args[i]);
    }
    return result;
};

const asyncSumOptimized = async (...args) => {
    if (args.length === 0) return 0;
    if (args.length === 1) return args[0];

    const mid = Math.floor(args.length / 2);
    const leftPart = asyncSumOptimized(...args.slice(0, mid));
    const rightPart = asyncSumOptimized(...args.slice(mid));

    return asyncAdd(await leftPart, await rightPart);
};

const measureExecutionTime = async (func, ...args) => {
    const start = performance.now();
    const result = await func(...args);
    const end = performance.now();
    const timeTaken = end - start;
    return { result, timeTaken };
};

const testAsyncSumWith100Elements = async () => {
    const numbers = Array.from({ length: 100 }, (_, i) => i + 1);
    const { result, timeTaken } = await measureExecutionTime(asyncSum, ...numbers);
    displayOutput(`Wynik: ${result}, Czas wykonania: ${timeTaken.toFixed(2)} ms`);
};

const testOptimizedAsyncSumWith100Elements = async () => {
    const numbers = Array.from({ length: 100 }, (_, i) => i + 1);
    const { result, timeTaken } = await measureExecutionTime(asyncSumOptimized, ...numbers);
    displayOutput(`(Optymalizowane) Wynik: ${result}, Czas wykonania: ${timeTaken.toFixed(2)} ms`);
};


const displayOutput = (message) => {
    document.getElementById('output').textContent = message;
};


document.getElementById('test-sum').addEventListener('click', testAsyncSumWith100Elements);
document.getElementById('test-sum-optimized').addEventListener('click', testOptimizedAsyncSumWith100Elements);
