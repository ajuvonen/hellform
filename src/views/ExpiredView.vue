<script setup lang="ts">
import {storeToRefs} from 'pinia';
import {useFormStore} from '@/stores/form';

const formStore = useFormStore();
const {skipAllowed} = storeToRefs(formStore);
skipAllowed.value = true;
</script>
<template>
  <h1 class="text-center mt-10">Session Expired :(</h1>
  <p class="text-body-1 text-justify mt-10">
    At this point your user would probably be quite frustrated, and in worst case, you would lose a customer.
    Make sure your session timeouts are relevant to the task at hand, and that they refresh based on user interaction.
  </p>
  <p class="text-body-1 text-justify mt-4">
    Navigate to <router-link to="/">front page</router-link> to continue.
  </p>
</template>
<style lang="scss" scoped></style>
