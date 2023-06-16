<script setup lang="ts">
import {requiredValidator} from '@/utils';
import {storeToRefs} from 'pinia';
import {useFormStore} from '@/stores/form';
import {useCurrentSectionProblems} from '@/hooks/currentSectionProblems';

const formStore = useFormStore();
const {toggleDevice, removeStreamingService, addStreamingService} = formStore;
const {currentFormValid, data} = storeToRefs(formStore);

const deviceOptions = ['cellphone', 'laptop', 'desktop-tower', 'watch', 'tablet'];

const requiredRules = [requiredValidator()];

useCurrentSectionProblems([
  `The devices are not buttons but stylized div elements. These cannot be interacted with a keyboard and are not visible to screen readers.`,
  `Users with screen readers may not understand table-like presentation, if the elements and their labels are not accessible.`,
  `Users with screen readers can't understand what actions the buttons perform, if they lack both text and accessibility optimization.`,
]);
</script>
<template>
  <v-form v-model="currentFormValid">
    <v-container>
      <h3 class="text-h6">Which smart devices you use?</h3>
      <v-row class="mt-4 mb-4 d-flex justify-center with-gap">
        <div
          v-for="device in deviceOptions"
          :key="device"
          class="device-button d-flex flex-column align-center justify-center"
          :class="{'device-button--selected': data.devices.includes(device)}"
          @click="toggleDevice(device)"
        >
          <v-icon :icon="`mdi-${device}`"></v-icon>
          <span>{{ device }}</span>
        </div>
      </v-row>
      <h3 class="text-h6">Which streaming services you use?</h3>
      <v-row class="mt-4" v-if="data.services.length">
        <v-col cols="5"><v-label>Service</v-label></v-col>
        <v-col cols="5"><v-label>Preferred Device</v-label></v-col>
      </v-row>
      <v-row class="mb-n4" v-for="service in data.services" :key="service.id">
        <v-col cols="5">
          <v-text-field v-model="service.name" :rules="requiredRules" required></v-text-field>
        </v-col>
        <v-col cols="5">
          <v-text-field v-model="service.device" :rules="requiredRules" required></v-text-field>
        </v-col>
        <v-col cols="2">
          <v-btn icon="mdi-delete" color="error" @click="removeStreamingService(service)"></v-btn>
        </v-col>
      </v-row>
      <v-btn icon="mdi-plus" class="mt-4" color="secondary" @click="addStreamingService"></v-btn>
    </v-container>
  </v-form>
</template>
<style lang="scss" scoped>
.device-button {
  cursor: pointer;
  width: 10rem;
  height: 10rem;
  box-shadow: 1px 1px 8px grey;
  border-radius: 8px;

  i {
    font-size: 50pt;
  }

  span {
    text-transform: capitalize;
  }

  &.device-button--selected {
    border: 2px solid gray;
  }
}
</style>