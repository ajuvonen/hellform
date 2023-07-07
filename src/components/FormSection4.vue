<script setup lang="ts">
import {storeToRefs} from 'pinia';
import {useFormStore} from '@/stores/form';
import {useCurrentSectionProblems} from '@/hooks/currentSectionProblems';
import {regexValidator, requiredValidator} from '@/utils';
import RowHeader from '@/components/RowHeader.vue';

const {currentForm, currentFormValid, data} = storeToRefs(useFormStore());

const incomeOptions = [
  {title: '25 000 € - 35 0000 €', value: 1},
  {title: '35 000 € - 50 0000 €', value: 2},
  {title: '> 50 000 €', value: 3},
];

const genderOptions = [
  {title: 'Male', value: 1},
  {title: 'Female', value: 2},
];

const sexualOrientationOptions = [
  {title: 'Straight', value: 1},
  {title: 'Other', value: 2},
];

const requiredRules = [requiredValidator()];

const birthdateRules = [requiredValidator(), regexValidator(/^\d{2,2}\/\d{2,2}\/\d{4,4}$/)];

useCurrentSectionProblems([
  `Asking for background information that is irrelevant to the service, and giving no opt-out possibility.`,
  `There's a limited choice in answer options.`,
  `Access to contacts usually means your friends are about to be spammed unwillingly.`,
  `The contacts confirmation contains an example of confirm shaming, where the opt-out is worded negatively.`,
  `The free premium trial is not actually free, and contains a continuous subscription trap`,
  `The marketing consent is confusingly worded, required, and automatically active.`,
  `The Terms of Service link redirects you to a page that can't be navigated back from without losing data.`,
]);
</script>
<template>
  <v-form ref="currentForm" v-model="currentFormValid">
    <v-container>
      <row-header text="Background Information" />
      <v-row>
        <v-col cols="6">
          <div class="d-flex with-gap">
            <v-select
              v-model="data.gender"
              :items="genderOptions"
              :rules="requiredRules"
              label="Gender"
            >
            </v-select>
            <v-select
              v-model="data.incomeClass"
              :items="incomeOptions"
              :rules="requiredRules"
              label="Annual Income"
            >
            </v-select>
          </div>
        </v-col>
        <v-col cols="6">
          <div class="d-flex with-gap">
            <v-select
              v-model="data.sexualOrientation"
              :items="sexualOrientationOptions"
              :rules="requiredRules"
              label="Sexual Orientation"
            ></v-select>
            <v-text-field
              v-model="data.birthdate"
              :rules="birthdateRules"
              label="Birth Date"
              placeholder="DD/MM/YYYY"
            ></v-text-field>
          </div>
        </v-col>
      </v-row>
      <row-header text="Additional Details" />
      <v-row>
        <v-col cols="6">
          <v-radio-group
            v-model="data.contactsAccess"
            label="Please give us access to your contacts and calendar"
            hide-details="auto"
          >
            <v-radio :value="true" label="Give access"></v-radio>
            <v-radio :value="false" label="No, I don't have friends"></v-radio>
          </v-radio-group>
        </v-col>
        <v-col cols="6">
          <v-radio-group
            v-model="data.subscribeToPremium"
            label="Choose your subscription"
            hide-details="auto"
          >
            <v-radio :value="false" label="Free"></v-radio>
            <div class="d-flex">
              <v-radio :value="true" label="Free* PREMIUM Trial"></v-radio>
              <v-tooltip
                v-if="data.subscribeToPremium"
                text="A one-time service fee of 2.49€ will be charged. After the 30-day trial your subscription will continue as annually billed subscription."
              >
                <template v-slot:activator="{props}">
                  <v-icon icon="mdi-information-outline" v-bind="props"></v-icon>
                </template>
              </v-tooltip>
            </div>
          </v-radio-group>
        </v-col>
      </v-row>
      <v-divider class="mt-2"></v-divider>
      <v-row>
        <v-col cols="6">
          <v-checkbox
            label="NO, I'm not afraid to receive great offers to my email!"
            v-model="data.receiveSpam"
            :value="true"
            required
            :rules="requiredRules"
          ></v-checkbox>
        </v-col>
        <v-col cols="6">
          <v-checkbox v-model="data.acceptTOS" :value="true" required :rules="requiredRules">
            <template #label>
              I have read and accept the&nbsp;<RouterLink to="/tos">Terms of Service</RouterLink>
            </template>
          </v-checkbox>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>
