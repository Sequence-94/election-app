App = {
  web3Provider: null,
  contracts: {},
  account: '0x0',

  init: function () {
    return App.initWeb3();
  },

  initWeb3: function () {
    // Check for injected web3 (MetaMask)
    if (typeof web3 !== 'undefined') {
      App.web3Provider = window.ethereum;
      web3 = new Web3(window.ethereum);
      console.log("Using MetaMask Web3 Provider...");
    } else {
      // If no injected web3 instance is detected, fallback to localhost
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
      web3 = new Web3(App.web3Provider);
      console.log("Using Localhost Web3 Provider...");
    }
    return App.initContract();
  },

  initContract: function () {
    $.getJSON("Election.json", function (election) {
      // Load the contract artifact
      App.contracts.Election = TruffleContract(election);
      // Set the provider for the contract
      App.contracts.Election.setProvider(App.web3Provider);
      console.log("Contract initialized...");
      App.render();
    });
  },

  render: function () {
    var electionInstance;
    var loader = $("#loader");
    var content = $("#content");
    var candidateSelect = $('#candidatesSelect');

    loader.show();
    content.hide();

    // Load account data
    web3.eth.getCoinbase(function (err, account) {
      if (err === null) {
        App.account = account;
        $("#accountAddress").html("Your Account: " + account);
      }
    });

    // Load contract data
    App.contracts.Election.deployed().then(function (instance) {
      electionInstance = instance;
      return electionInstance.candidatesCount();
    }).then(function (candidatesCount) {
      var candidatesResults = $("#candidatesResults");
      candidatesResults.empty();

      candidateSelect.empty(); // Clear previous options

      for (var i = 1; i <= candidatesCount; i++) {
        electionInstance.candidates(i).then(function (candidate) {
          var id = candidate[0].toNumber();
          var name = candidate[1];
          var voteCount = candidate[2].toNumber();
          // Console log candidate data
          console.log("Candidate ID:", id, "Name:", name, "Vote Count:", voteCount);

          // Render candidate Result
          var candidateTemplate = "<tr><th>" + id + "</th><td>" + name + "</td><td>" + voteCount + "</td></tr>";
          $("#candidatesResults").append(candidateTemplate);

          // Add candidate as an option in the dropdown
          var optionTag = "<option value='" + id + "'>" + name + "</option>";
          candidateSelect.append(optionTag);
        });
      }

      loader.hide();
      content.show();
    }).catch(function (error) {
      console.error("Error rendering:", error);
    });
  }
};

$(function () {
  $(window).on('load', function () {
    App.init();
  });
});
