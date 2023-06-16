<script setup lang="ts">
import {useFormStore} from '@/stores/form';
import {storeToRefs} from 'pinia';

const {currentSectionProblems} = storeToRefs(useFormStore());
</script>
<template>
  <ul>
    <li v-for="(message, index) in currentSectionProblems" :key="index" class="text-body-1">
      {{ message }}
    </li>
  </ul>
</template>
