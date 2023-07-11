<script setup lang="ts">
import {lengthValidator, requiredValidator} from '@/utils';
import {storeToRefs} from 'pinia';
import {useFormStore} from '@/stores/form';
import {useCurrentSectionProblems} from '@/hooks/currentSectionProblems';

const formStore = useFormStore();
const {toggleDevice, removeStreamingService, addStreamingService} = formStore;
const {currentForm, currentFormValid, data} = storeToRefs(formStore);

const deviceOptions = ['Cellphone', 'Laptop', 'Desktop-Tower', 'Watch', 'Tablet'];

const categoryOptions = [
  'Action',
  'Animation',
  'Biographies',
  'Comedy',
  'Crime',
  'Documentaries',
  'Drama',
  'Suspense',
  'Young Adults',
];

const requiredRules = [requiredValidator()];

const additionalCategoryRules = [lengthValidator(0, 100)];

useCurrentSectionProblems([
  `There's no a proper progress indicator for multi-page form, and the changes on the page are not announced to screen readers.`,
  `The contrast ratio of the text and the background is not adequate for people with impaired vision or challenging lighting conditions.`,
  `The headings are not proper heading elements, but stylized divs. This results in poor accessibility experience.`,
  `The devices are not buttons, but stylized divs. These cannot be interacted with a keyboard and are not visible to screen readers.`,
  `Checkboxes don't have a focus outline that would show the highlighted item. This makes keyboard navigation difficult.`,
  `The checkbox labels are not connected to the input themselves, which makes understanding the form with screen readers difficult.`,
  `Additional categories has no label. Form instructions shouldn't be given in placeholders.`,
  `In this case, comboboxes provide an additional layer of complexity but no real value because the lists are short.`,
  `Users with screen readers may not understand table-like presentation, if the elements and their labels are not accessible.`,
  `Users with screen readers can't understand what actions the buttons perform, if they lack both text and accessibility optimization.`,
  `The next button on the form enters a disabled state when the form has validation problems.`,
  `Countdowns in forms should be avoided unless necessary. In such case the timing should accommodate users who have accessibility challenges.`,
]);
</script>
<template>
  <v-form ref="currentForm" v-model="currentFormValid">
    <v-container class="faded">
      <v-row>
        <v-col cols="12">
          <div class="text-h6">Which smart devices you use?</div>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" class="d-flex justify-center with-gap">
          <div
            v-for="device in deviceOptions"
            :key="device"
            class="device-button d-flex flex-column align-center justify-center"
            :class="{'device-button--selected': data.devices.includes(device)}"
            @click="toggleDevice(device)"
          >
            <v-icon :icon="`mdi-${device.toLowerCase()}`"></v-icon>
            <span>{{ device }}</span>
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <div class="text-h6">Which categories are you interested in?</div>
        </v-col>
      </v-row>
      <v-row class="mt-n4">
        <v-col cols="12" class="d-inline-flex flex-wrap">
          <div
            v-for="category in categoryOptions"
            :key="category"
            class="mr-2 d-inline-flex align-center"
          >
            <v-checkbox
              v-model="data.categories"
              :value="category"
              :hide-details="true"
            ></v-checkbox>
            <v-label>{{ category }}</v-label>
          </div>
          <v-text-field
            v-model="data.additionalCategories"
            :rules="additionalCategoryRules"
            placeholder="Additional categories separated by a comma (,)"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <div class="text-h6">Which services you use?</div>
        </v-col>
      </v-row>
      <v-row v-if="data.services.length">
        <v-col cols="5"><v-label>Service</v-label></v-col>
        <v-col cols="5"><v-label>Preferred Device</v-label></v-col>
      </v-row>
      <v-row class="mt-n4" v-for="service in data.services" :key="service.id">
        <v-col cols="5">
          <v-combobox
            v-model="service.name"
            :items="['Netflix', 'HBO', 'Disney+', 'Hulu', 'Viaplay']"
            :rules="requiredRules"
          ></v-combobox>
        </v-col>
        <v-col cols="5">
          <v-combobox
            v-model="service.device"
            :items="data.devices"
            :rules="requiredRules"
          ></v-combobox>
        </v-col>
        <v-col cols="2">
          <v-btn icon="mdi-delete" color="error" variant="tonal" @click="removeStreamingService(service)"></v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-btn icon="mdi-plus" color="secondary" variant="tonal" @click="addStreamingService"></v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>
<style lang="scss" scoped>
.faded {
  color: gray;
}

:deep(.v-selection-control--focus-visible::before) {
  display: none !important;
}

.device-button {
  cursor: pointer;
  width: 10rem;
  height: 10rem;
  box-shadow: 1px 1px 8px grey;
  border-radius: 8px;

  i {
    font-size: 50pt;
  }

  &.device-button--selected {
    border: 2px solid gray;
  }
}
</style>
