<script setup lang="ts">
import {storeToRefs} from 'pinia';
import {useFormStore} from '@/stores/form';
import {useCurrentSectionProblems} from '@/hooks/currentSectionProblems';

const {currentFormValid} = storeToRefs(useFormStore());

useCurrentSectionProblems([]);
</script>
<template>
  <v-form v-model="currentFormValid">
    <v-container>
      <h3 class="text-h6">TBD</h3>
      <v-row class="mt-4">
      </v-row>
    </v-container>
  </v-form>
</template>
