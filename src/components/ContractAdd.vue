<template>
  <Card>
    <template #title>
      <h3>Create a new Blockchain Against Humanity round</h3>
    </template>
    <template #content>
      <div>
        <label for="cardStatement">Statement: </label>
        <InputText id="cardStatement" type="text" v-model="cardStatement" />
      </div>
      <div>
        <p>
          Three consecutive question marks ??? signal a field which will be
          populated by players.
        </p>
      </div>
      <div>
        <Button
          label="Publish on blockchain"
          icon="pi pi-check"
          iconPos="right"
          @click="publishOnBlockchain"
        />
      </div>
    </template>
  </Card>
  <ContractResult :contractAddress="contractAddress" 
  				  :blockNumber="blockNumber" 
				  class = "mt-5"
  				  v-if="(contractAddress!=null)"
				  >
  </ContractResult>


</template>

<script setup>
import { ref } from "vue";
import { ethers, ContractFactory } from "ethers";
import { useToast } from 'primevue/usetoast';

import bytecode from "./bytecode.json";
import ContractResult from './ContractResult.vue';
const axios = require('axios');

const cardStatement = ref();
const userAddress = ref();
const contractAddress = ref(null);
const blockNumber = ref(null);
const toast = useToast();
const publishOnBlockchain = async () => {
  /**
   * Get the provider 
   * And request the account which will be used
   */
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  await provider.send("eth_requestAccounts", []);

  if(provider.code === "CALL_EXCEPTION"){
    toast.add({
      severity: "error",
      summary: "An error has occured.",
      life: 3000,
    });
	return;
  }

  const signer = provider.getSigner();
  userAddress.value = await signer.getAddress();

  if(userAddress.value.code === "CALL_EXCEPTION"){
    toast.add({
      severity: "error",
      summary: "An error has occured.",
      life: 3000,
    });
	return;
  } 

  /**
   //TODO 4. one will must fetch the abi and the contract bytecode
   */
  const abi = [
    {
      inputs: [
        {
          internalType: "string",
          name: "_question",
          type: "string",
        },
      ],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      inputs: [
        {
          internalType: "string",
          name: "_answer",
          type: "string",
        },
      ],
      name: "addAnswer",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      name: "answerProviders",
      outputs: [
        {
          internalType: "bool",
          name: "answered",
          type: "bool",
        },
        {
          internalType: "uint256",
          name: "answerIndex",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      name: "answers",
      outputs: [
        {
          internalType: "string",
          name: "answer",
          type: "string",
        },
        {
          internalType: "uint256",
          name: "voteCount",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "finishRound",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "questionCreator",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "seeWinner",
      outputs: [],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "viewAnswers",
      outputs: [
        {
          components: [
            {
              internalType: "string",
              name: "answer",
              type: "string",
            },
            {
              internalType: "uint256",
              name: "voteCount",
              type: "uint256",
            },
          ],
          internalType: "struct BlockchainAgainstHumanity.Answer[]",
          name: "",
          type: "tuple[]",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "viewQuestion",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_voteIndex",
          type: "uint256",
        },
      ],
      name: "voteForAnswer",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      name: "voters",
      outputs: [
        {
          internalType: "bool",
          name: "voted",
          type: "bool",
        },
        {
          internalType: "uint256",
          name: "voteIndex",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "winningAnswer",
      outputs: [
        {
          internalType: "string",
          name: "answer",
          type: "string",
        },
        {
          internalType: "uint256",
          name: "voteCount",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
  ];
  /**
   * Use ContractFactory to enable contract deployment
   */
  const factory = new ContractFactory(abi, bytecode, signer);

  var contract = null;
  try{
    contract = await factory.deploy(cardStatement.value);
  }catch(error){
    if(error.message.includes('Nonce too high.')){
      toast.add({
      severity: "error",
      summary: "Nonce too high",
      detail: "Try restarting your Metamask account.",
      life: 3000,
    });
    }else{
      console.log(error);
      toast.add({
      severity: "error",
      summary: "Unknown error",
      detail: "Your funds are safe, try restarting the application.",
      life: 3000,
    });
    }
    return;
  }

  contractAddress.value = contract.address;
  /**
   * .wait() for the transaction to end up in a block.
   */
  blockNumber.value = (await contract.deployTransaction.wait()).blockNumber;
  if(blockNumber.value){
    toast.add({
      severity: "success",
      summary: "Contract Deployed!",
      life: 3000,
    });
    
    //TODO x izvuci url u env varijablu.
    axios.post('http://localhost:8080/api/contracts', {
      "blockNumber": blockNumber.value,
      "contractAddress": contractAddress.value,
      "creatorAddress": userAddress.value,
      "question" : cardStatement.value
    }).then(function(res){
      console.log(res);
    }).catch(function(error){
      console.log(error);
    });
    
  }else{
    toast.add({
      severity: "error",
      summary: "An error has occured.",
      life: 3000,
    });
  }
};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
