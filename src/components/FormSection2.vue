<script setup lang="ts">
import {requiredValidator} from '@/utils';
import {storeToRefs} from 'pinia';
import {useFormStore} from '@/stores/form';
import {useCurrentSectionProblems} from '@/hooks/currentSectionProblems';
import RowHeader from '@/components/RowHeader.vue';

const formStore = useFormStore();
const {toggleDevice, removeStreamingService, addStreamingService} = formStore;
const {currentFormValid, data} = storeToRefs(formStore);

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

useCurrentSectionProblems([
  `The contrast ratio of the text and the background is not adequate for people with impaired vision or challenging lighting conditions.`,
  `The devices are not buttons but stylized div elements. These cannot be interacted with a keyboard and are not visible to screen readers.`,
  `Checkboxes don't have a focus outline that would show the highlighted item. This makes keyboard navigation difficult.`,
  `The checkbox labels are not connected to the input themselves, which makes understanding the form with screen readers difficult.`,
  `In this case, comboboxes provide an additional layer of complexity but no real value because the lists are short`,
  `Users with screen readers may not understand table-like presentation, if the elements and their labels are not accessible.`,
  `Users with screen readers can't understand what actions the buttons perform, if they lack both text and accessibility optimization.`,
]);
</script>
<template>
  <v-form v-model="currentFormValid">
    <v-container class="faded">
      <row-header text="Which smart devices you use?" />
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
      <row-header text="Which categories are you interested in?" />
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
        </v-col>
      </v-row>
      <row-header text="Which streaming services you use?" />
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
          <v-btn icon="mdi-delete" color="error" @click="removeStreamingService(service)"></v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-btn icon="mdi-plus" color="secondary" @click="addStreamingService"></v-btn>
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
