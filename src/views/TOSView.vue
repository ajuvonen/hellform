<script setup lang="ts">
import {storeToRefs} from 'pinia';
import {useFormStore} from '@/stores/form';

const formStore = useFormStore();
const {skipAllowed} = storeToRefs(formStore);
skipAllowed.value = true;
</script>
<template>
  <h1 class="text-h1 text-center mt-10">Terms Of Service</h1>
  <p class="text-body-1 text-justify mt-10">
    Imagine here a very lengthy and confusing TOS document that is illegible to anyone without a law
    degree. Then lament at the fact that you can't return to the form without losing the data you
    had already completed. What did you expect from Hell Form?
  </p>
  <p class="text-body-1 text-justify mt-4">
    Navigate to <router-link to="/">front page</router-link> to continue.
  </p>
</template>
<style lang="scss" scoped></style>
