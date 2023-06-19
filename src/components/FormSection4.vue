<script setup lang="ts">
import {storeToRefs} from 'pinia';
import {useFormStore} from '@/stores/form';
import {useCurrentSectionProblems} from '@/hooks/currentSectionProblems';
import RowHeader from '@/components/RowHeader.vue';

const {currentFormValid} = storeToRefs(useFormStore());

useCurrentSectionProblems([]);
</script>
<template>
  <v-form v-model="currentFormValid">
    <v-container>
      <row-header text="TBD" />
      <v-row>
      </v-row>
    </v-container>
  </v-form>
</template>
