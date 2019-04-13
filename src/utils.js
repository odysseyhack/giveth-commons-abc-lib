module.exports = {
  getWeb3Options: (account) => {
    if (!account) {
      console.log("No account given, cannot send transaction");
    }

    return {
      from: account.address,
      gas: 10000000
    };
  }
};
