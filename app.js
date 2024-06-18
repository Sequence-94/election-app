const App = {
    contracts: {},
    account: null,
    init: async () => {
        await App.initWeb3();
        await App.initContract();
        await App.render();
    },
    initWeb3: async () => {
        if (window.ethereum) {
            try {
                await window.ethereum.request({ method: 'eth_requestAccounts' });
                console.log("Ethereum enabled");
                App.web3Provider = window.ethereum;
            } catch (error) {
                console.error("User denied account access");
            }
        } else if (window.web3) {
            App.web3Provider = window.web3.currentProvider;
        } else {
            console.log("No Ethereum browser detected. Check out MetaMask");
        }
        App.provider = new ethers.providers.Web3Provider(App.web3Provider);
    },
    initContract: async () => {
        const response = await fetch('Election.json');
        const ElectionArtifact = await response.json();
        App.contracts.Election = new ethers.Contract(
            '0x61788E032F9A5Ad119871e396F5F758a4f1AA726', // Replace with your contract address
            ElectionArtifact.abi,
            App.provider.getSigner()
        );
    },
    render: async () => {
        const loader = $("#loader");
        const content = $("#content");
        const candidateSelect = $('#candidatesSelect');
        loader.show();
        content.hide();
        try {
            const accounts = await App.provider.listAccounts();
            App.account = accounts[0];
            $("#accountAddress").text("Your Account: " + App.account);
            const electionInstance = App.contracts.Election;
            const candidatesCount = await electionInstance.candidatesCount();
            const candidatesResults = $("#candidatesResults");
            candidatesResults.empty();
            candidateSelect.empty();
            for (let i = 1; i <= candidatesCount; i++) {
                const candidate = await electionInstance.candidates(i);
                const id = candidate.id.toNumber();
                const name = candidate.name;
                const voteCount = candidate.voteCount.toNumber();
                const candidateTemplate = `<tr><th>${id}</th><td>${name}</td><td>${voteCount}</td></tr>`;
                candidatesResults.append(candidateTemplate);
                const optionTag = `<option value="${id}">${name}</option>`;
                candidateSelect.append(optionTag);
            }
            const hasVoted = await electionInstance.voters(App.account);
            if (hasVoted) {
                $('form').hide();
            }
            loader.hide();
            content.show();
        } catch (error) {
            console.error("Error rendering:", error);
        }
    },
    castVote: async () => {
        const candidateId = $('#candidatesSelect').val();
        try {
            const electionInstance = App.contracts.Election;
            const tx = await electionInstance.vote(candidateId);
            await tx.wait();
            window.location.reload();
        } catch (error) {
            console.error("Error casting vote:", error);
        }
    }
};

$(() => {
    $(window).on('load', () => {
        App.init();
    });
});
