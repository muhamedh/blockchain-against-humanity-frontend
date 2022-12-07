<template>
    <Card>
        <template #title>
            <h6 class="wrapper">Contract Number: {{ contractAddress }}</h6>
        </template>
        <template #content>
            <!-- Question container -->
            <div>
                <h5>Fill in this question to play:</h5>
                <h2>
                    <b>{{ question }}</b>
                </h2>
            </div>
            <!-- Add answer container -->
            <div class = "grid">
                <div class = "md:col-6 sm:col-12 p-2" >
                    <InputText id="answer" placeholder="Your answer..." v-model="answer" />
                </div>
                <div class = "md:col-12 sm:col-12 p-2">
                    <Button label="Submit answer to blockchain" class="p-button-raised"
                    @click="handleSubmitToBlockchain()" />
                </div>

            </div>
            <!-- Previous answers container -->
            <div v-if="answers.length > 0">
                <h4>Current answers:</h4>
                <div class = "grid" v-for="a in answers" :key="a.id">
                    <div class = "col-6">
                        <div>
                            <p class="wrapper"><b>Answer: </b> {{ a.answer }}</p>
                        </div>
                        <div>
                            <p class="wrapper"><b>Vote count:</b> {{ a.voteCount }}</p>
                        </div>
                    </div>
                    <div class = "col-6 flex align-items-center justify-content-end">
                        <Button label="Vote for answer" class="p-button-success" @click="handleVoteForAnswer(a.id)"></Button>
                    </div>
                    <Divider></Divider>
                </div>
            </div>
        </template>
    </Card>
</template>

<script setup>
import { ref, onMounted } from "vue";
import router from "@/router";
import { ethers } from "ethers";
import { useToast } from 'primevue/usetoast'
import abi from "./abi.json";

const contractAddress = ref(null);
const answers = ref([]);
var provider = null;
const contract = ref(null);
const question = ref(null);
const answer = ref(null);
const toast = useToast();

contractAddress.value = router.currentRoute.value.params.contractAddress;

onMounted(async () => {
    provider = new ethers.providers.Web3Provider(window.ethereum);
    contract.value = new ethers.Contract(contractAddress.value, abi, provider);

    try {
        question.value = await contract.value.viewQuestion();
        answers.value = await contract.value.viewAnswers();
        var newAnswers = Object.assign({id: 0}, answers.value);
        console.log(answers.value);

    } catch (e) {
        console.log("e", e);
    }
});

const handleSubmitToBlockchain = async () => {
    console.log("submiter called", answer.value);
    const contractInside = new ethers.Contract(
        contractAddress.value,
        abi,
        provider
    );

    var e = null;
    var r = null;

    try {
        e = await contractInside.connect(provider.getSigner()).addAnswer(answer.value);
    } catch (error) {
        toast.add({
            severity: "error",
            summary: "Fatal error",
            detail: error.reason.substring(
                error.reason.indexOf("'") + 1,
                error.reason.length - 1
            ), // extracts the solidity returned error from error
            life: 5000,
        });
    }

    try {
        r = await e.wait();
        toast.add({
            severity: "success",
            summary: "Answer recorded",
            detail: "Answer recorded in block number: " + r.blockNumber,
            life: 3000,
        });
    } catch (error) {
        toast.add({
            severity: "error",
            summary: "Fatal error",
            detail: "Error occured while waiting for transaction to finish.",
            life: 3000,
        });
    }
};

const handleVoteForAnswer = async (id) => {
    console.log("submiter called", id);
    const contractInside = new ethers.Contract(
        contractAddress.value,
        abi,
        provider
    );

    var e = null;
    var r = null;

    try {
        e = await contractInside.connect(provider.getSigner()).voteForAnswer(id);
    } catch (error) {
        toast.add({
            severity: "error",
            summary: "Fatal error",
            detail: error.reason.substring(
                error.reason.indexOf("'") + 1,
                error.reason.length - 1
            ), // extracts the solidity returned error from error
            life: 5000,
        });
    }

    try {
        r = await e.wait();
        toast.add({
            severity: "success",
            summary: "Vote recorded",
            detail: "Vote recorded in block number: " + r.blockNumber,
            life: 3000,
        });
    } catch (error) {
        toast.add({
            severity: "error",
            summary: "Fatal error",
            detail: "Error occured while waiting for transaction to finish.",
            life: 3000,
        });
    }
};
</script>

<style scoped>
.wrapper {
    word-break: break-all;
    white-space: normal;
}
</style>
