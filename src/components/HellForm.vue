<script setup lang="ts">
import {ref} from 'vue';
import {storeToRefs} from 'pinia';
import {useRouter} from 'vue-router';
import VueCountdown from '@chenfengyuan/vue-countdown';
import {padCountdownZero} from '@/utils';
import FormSection1 from '@/components/FormSection1.vue';
import FormSection2 from '@/components/FormSection2.vue';
import FormSection3 from '@/components/FormSection3.vue';
import FormSection4 from '@/components/FormSection4.vue';
import CurrentSectionProblems from '@/components/CurrentSectionProblems.vue';
import {useFormStore} from '@/stores/form';

const router = useRouter();
const {currentForm, currentFormValid} = storeToRefs(useFormStore());
const currentSection = ref(1);

const nextSection = async () => {
  const {valid} = await currentForm.value!.validate();
  if (valid && currentSection.value < 4) {
    currentSection.value = currentSection.value + 1;
  } else if (valid && currentSection.value === 4) {
    router.push('/thanks');
  }
};
</script>
<template>
  <v-card class="mt-10">
    <v-card-text>
      <v-slider
        v-model="currentSection"
        :ticks="{1: 'Validation', 2: 'Accessibility', 3: 'Gestalt', 4: 'Dark Patterns'}"
        :min="1"
        :max="4"
        disabled
        show-ticks="always"
      ></v-slider>
      <v-expand-transition>
        <form-section1 v-if="currentSection === 1"></form-section1>
        <form-section2 v-if="currentSection === 2"></form-section2>
        <form-section3 v-if="currentSection === 3"></form-section3>
        <form-section4 v-if="currentSection === 4"></form-section4>
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
        :style="{order: currentSection === 3 ? 0 : 1}"
        :prepend-icon="currentSection < 4 ? 'mdi-arrow-right' : 'mdi-check'"
        :disabled="currentSection === 2 && !currentFormValid"
        color="primary"
        @click="nextSection"
        >{{ currentSection < 4 ? 'Next' : 'Submit' }}</v-btn
      >
      <vue-countdown
        :transform="padCountdownZero"
        :time="8 * 60 * 1000"
        :style="{order: 2}"
        class="ml-auto text-h5 text-error"
        @end="router.push('/expired')"
        v-slot="{minutes, seconds}"
      >
        {{ minutes }}:{{ seconds }}
      </vue-countdown>
    </v-card-actions>
  </v-card>
</template>
