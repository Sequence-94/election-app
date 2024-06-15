import { web3, web3Provider } from './Web3Api';
import Election from '../../build/contracts/Election.json';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/app.css';

const App = {
  account: '0x0',
  contracts: {},

  init: async function () {
    await this.initWeb3();
    await this.initContract();
  },

  initWeb3: async function () {
    // Web3 is already initialized in Web3Api.js
    return;
  },

  initContract: async function () {
    const contract = require('@truffle/contract');
    App.contracts.Election = contract(Election);
    App.contracts.Election.setProvider(web3Provider);

    await App.listenForEvents();
    await App.render();
  },

  listenForEvents: async function () {
    const instance = await App.contracts.Election.deployed();
    instance.votedEvent({}, {
      fromBlock: 0,
      toBlock: 'latest'
    }).watch((error, event) => {
      if (!error) {
        console.log("Event triggered", event);
        App.render();
      }
    });
  },

  render: async function () {
    const loader = $("#loader");
    const content = $("#content");
    const candidateSelect = $('#candidatesSelect');

    loader.show();
    content.hide();

    const accounts = await web3.eth.getAccounts();
    App.account = accounts[0];
    $("#accountAddress").html("Your Account: " + App.account);

    const electionInstance = await App.contracts.Election.deployed();
    const candidatesCount = await electionInstance.candidatesCount();

    const candidatesResults = $("#candidatesResults");
    candidatesResults.empty();
    candidateSelect.empty(); // Clear previous options

    for (let i = 1; i <= candidatesCount; i++) {
      const candidate = await electionInstance.candidates(i);
      const id = candidate[0].toNumber();
      const name = candidate[1];
      const voteCount = candidate[2].toNumber();

      console.log("Candidate ID:", id, "Name:", name, "Vote Count:", voteCount);

      const candidateTemplate = `<tr><th>${id}</th><td>${name}</td><td>${voteCount}</td></tr>`;
      candidatesResults.append(candidateTemplate);

      const optionTag = `<option value='${id}'>${name}</option>`;
      candidateSelect.append(optionTag);
    }

    const hasVoted = await electionInstance.voters(App.account);
    if (hasVoted) {
      $('form').hide();
    }
    loader.hide();
    content.show();
  },

  castVote: async function () {
    const candidateId = $('#candidatesSelect').val();
    const instance = await App.contracts.Election.deployed();
    await instance.vote(candidateId, { from: App.account });

    $("#content").hide();
    $("#loader").show();
    window.location.reload();
  }
};

$(window).on('load', function () {
  App.init();
});

$("#voteForm").on('submit', function (event) {
  event.preventDefault();
  App.castVote();
});
