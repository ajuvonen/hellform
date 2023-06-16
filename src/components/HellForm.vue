<script setup lang="ts">
import {ref} from 'vue';
import FormSection1 from '@/components/FormSection1.vue';
import FormSection2 from '@/components/FormSection2.vue';
import FormSection3 from '@/components/FormSection3.vue';
import FormSection4 from '@/components/FormSection4.vue';
import FormSection5 from '@/components/FormSection5.vue';
import CurrentSectionProblems from '@/components/CurrentSectionProblems.vue';

// const {currentFormValid} = storeToRefs(useFormStore());
const currentFormValid = true;
const currentSection = ref(1);
</script>
<template>
  <v-card class="mt-10">
    <v-card-text>
      <v-slider
        v-model="currentSection"
        :ticks="{1: 'Validation', 2: 'Accessibility', 3: 'Gestalt', 4: 'TBD', 5: 'Dark Patterns'}"
        :min="1"
        :max="5"
        disabled
        show-ticks="always"
      ></v-slider>
      <v-expand-transition>
        <form-section1 v-if="currentSection === 1"></form-section1>
        <form-section2 v-if="currentSection === 2"></form-section2>
        <form-section3 v-if="currentSection === 3"></form-section3>
        <form-section4 v-if="currentSection === 4"></form-section4>
        <form-section5 v-if="currentSection === 5"></form-section5>
      </v-expand-transition>
      <v-expansion-panels>
        <v-expansion-panel elevation="0">
          <v-expansion-panel-title>
            <v-icon icon="mdi-information-outline" class="mr-2" />
            <span class="text-subtitle-1">What is wrong here?</span>
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            <current-section-problems />
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-card-text>
    <v-card-actions>
      <v-btn
        v-if="currentSection > 1"
        :style="{order: currentSection === 3 ? 1 : 0}"
        color="secondary"
        prepend-icon="mdi-arrow-left"
        @click="currentSection = currentSection - 1"
        >Back</v-btn
      >
      <v-btn
        v-if="currentSection < 5"
        :style="{order: currentSection === 3 ? 0 : 1}"
        :disabled="!currentFormValid"
        color="primary"
        append-icon="mdi-arrow-right"
        @click="currentSection = currentSection + 1"
        >Next</v-btn
      >
      <router-link to="/thanks">
        <v-btn
          v-if="currentSection === 5"
          :disabled="!currentFormValid"
          color="primary"
          append-icon="mdi-check"
          @click="currentSection = currentSection + 1"
          >Submit</v-btn
        >
      </router-link>
    </v-card-actions>
  </v-card>
</template>
