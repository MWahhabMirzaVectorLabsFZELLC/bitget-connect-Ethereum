const address = document.getElementById("address");
const address1 = document.getElementById("address1");
const chainID = document.getElementById("chainID");
function checkWalletInstallation() {
    const provider = window.bitkeep && window.bitkeep.ethereum;

    if (!provider) {
        alert('Wallet is not installed. Please install the BitKeep wallet.');
        window.open('https://web3.bitget.com/en/wallet-download?type=2');
    } else {
        console.log('BitKeep wallet is installed.');
    }
}

function requestAccounts() {
    const provider = window.bitkeep && window.bitkeep.ethereum;

    if (provider) {
        provider.request({
            method: "eth_requestAccounts"
        }).then((accounts) => {
            // success
            const account = accounts[0];
            address.textContent = `Address: ${('Account:', account)}` ;
            alert('Wallet successfully connected with account: ' + account);
        }).catch((error) => {
            // fail
            console.error('Error requesting accounts:', error);
        });
    } else {
        alert('Wallet is not installed. Please install the BitKeep wallet.');
        window.open('https://web3.bitget.com/en/wallet-download?type=2');
    }
}

document.getElementById('checkWalletButton').addEventListener('click', () => {
    checkWalletInstallation();
    requestAccounts();
});


 // Function to handle account and chain ID changes
 function handleAccountsChainChanged(accounts, chainId) {
  console.log('Accounts:', accounts);
  console.log('Chain ID:', chainId);

  // Display account address
  address1.textContent = `Address: ${accounts[0]}`;

  // Display chain ID
  chainID.textContent = `Chain ID: ${chainId}`;
}

  // Function to connect to Bitkeep Wallet
  async function connect() {
    try {
      const accounts = await window.bitkeep.ethereum.request({ method: 'eth_requestAccounts' });
      handleAccountsChainChanged(accounts, await window.bitkeep.ethereum.request({ method: 'eth_chainId' }));
      alert('Connected to Ethereum successfully.');
    } catch (error) {
      if (error.code === 4001) {
        console.log('Please connect to Bitkeep.'); // User rejected connection
      } else {
        console.error('Error connecting to Ethereum:', error); // Other errors
      }
    }
  }

