const checkings1 = {
  balance: 100,
  performTransaction(amount, type) {
    if (type === 'deposit') {
      this.balance = this.balance + amount;
    } else if (type === 'withdrawal') {
      this.balance = this.balance - amount;
    }
    return this.balance;
  }
};

const checkings2 = {
  balance: 100,
  performTransaction(amount, type) {
    if (type === 'deposit') {
      this.balance = this.balance + amount;
    } else if (type === 'withdrawal') {
      this.balance = this.balance - amount;
    }
    return this.balance;
  }
};

console.log(checkings1.balance);
console.log(checkings1.performTransaction(20, 'deposit'));
console.log(checkings2.balance);
console.log(checkings2.performTransaction(40, 'withdrawal'));

function performTransaction(amount, type) {
  if (type === 'deposit') {
    this.balance = this.balance + amount;
  } else if (type === 'withdrawal') {
    this.balance = this.balance - amount;
  }
  return this.balance;
}

const savings = {
  balance: 100,
};

console.log(performTransaction.call(savings, 35, 'deposit'));

const depositFiftyInSavings = performTransaction.bind(savings, 50, 'deposit');
console.log(depositFiftyInSavings());