module.exports = {
  getWeb3Options: (account) => {
    if (!account) {
      console.log("No account given, cannot send transaction");
    }

    var from;

    if (typeof account === "string") {
      from = account;
    } else {
      from = account.address;
    }

    return {
      from: from,
      gas: 10000000
    };
  }
};
