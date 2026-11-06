'use strict';

// Historical 2021 rate sheet, retained for studying the original calculator.
const RATES = Object.freeze({
    weekdayEarly: { standard: 230, premium: 280, extra: 220 },
    weekdayLate: { standard: 300, premium: 340, extra: 250 },
    holiday: { standard: 340, premium: 420, extra: 280 },
    morning: { 3: [240, 50], 4: [230, 45], 5: [220, 40], 6: [210, 35], 7: [200, 30] },
});

function calculatePrice({ people, enter, exit, holiday, premium, discount }) {
    if (![people, enter, exit, discount].every(Number.isFinite) ||
        ![people, enter, exit].every(Number.isInteger) || people < 1 || discount < 0) {
        throw new RangeError('請輸入正整數人數、整點時間與非負折價。');
    }
    if (enter < (holiday ? 9 : 10) || exit > 23 || exit <= enter) {
        throw new RangeError('時段不合理：平日 10–23 時、假日 9–23 時；不支援跨夜。');
    }
    const morning = holiday && enter < 12;
    const hours = morning ? Math.max(0, exit - 12) : exit - enter;
    const band = holiday ? RATES.holiday : enter < 16 ? RATES.weekdayEarly : RATES.weekdayLate;
    let earlyTotal = 0;
    if (morning) {
        const billedPeople = Math.max(3, people);
        const [base, upgrade] = RATES.morning[Math.min(7, billedPeople)];
        earlyTotal = (base + (premium ? upgrade : 0)) * billedPeople;
    }
    const commonTotal = hours > 0
        ? hours * (premium ? band.premium : band.standard) + Math.max(0, people - 3) * band.extra
        : 0;
    const reduction = Math.min(commonTotal, discount * hours);
    const total = earlyTotal + commonTotal - reduction;
    return { earlyTotal, commonTotal, reduction, total, average: total / people, hours };
}

function calPrice() {
    const output = document.getElementById('result');
    try {
        const result = calculatePrice({
            people: Number(document.getElementsByName('people')[0].value),
            enter: Number(document.getElementById('enter-time').value),
            exit: Number(document.getElementById('out-time').value),
            holiday: document.getElementById('vacation').checked,
            premium: document.getElementById('f1_g8000').checked,
            discount: Number(document.getElementById('discount').value),
        });
        output.textContent = `歷史估算：NT$ ${result.total.toLocaleString()}（每人 NT$ ${result.average.toFixed(2)}）\n早場 ${result.earlyTotal} ＋ 一般場 ${result.commonTotal} − 折價 ${result.reduction}`;
    } catch (error) {
        output.textContent = error.message;
    }
}

if (typeof module !== 'undefined') module.exports = { RATES, calculatePrice };
