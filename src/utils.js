module.exports = {
  getWeb3Options: (instance) => {
    if (!instance.eth.defaultAccount) {
      console.log("No default account was set, cannot send transaction");
    }

    return {
      from: instance.eth.defaultAccount,
      gas: 6000000
    };
  }
};
