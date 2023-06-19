<script setup lang="ts">
import {requiredValidator, lengthValidator, regexValidator, countryCodes} from '@/utils';
import {storeToRefs} from 'pinia';
import {useFormStore} from '@/stores/form';
import {useCurrentSectionProblems} from '@/hooks/currentSectionProblems';
import RowHeader from '@/components/RowHeader.vue';

const {currentFormValid, data} = storeToRefs(useFormStore());
const nameRules = [requiredValidator(), lengthValidator(3, 10), regexValidator(/^[A-Za-z]+$/)];
const emailRules = [requiredValidator(), lengthValidator(9, 20)];
const addressRules = [requiredValidator(), lengthValidator(10, 50)];
const zipRules = [requiredValidator(), regexValidator(/^\d{5,5}$/)];
const cityRules = [requiredValidator(), lengthValidator(5, 15)];
const countryCodeRules = [requiredValidator()];
const phoneRules = [requiredValidator(), lengthValidator(8, 15)];
const passwordRules = [
  requiredValidator(),
  lengthValidator(6, 12),
  regexValidator(/[A-Z]/),
  regexValidator(/[a-z]/),
  regexValidator(/[0-9]/),
  regexValidator(/[!"#¤%&/()=?"]/),
];

useCurrentSectionProblems([
  `Field minimum and maximum lengths are arbitrary and assume, among other things, that all users have at least three-character names.`,
  `Field length errors don't specify what the length limitation is.`,
  `Name fields don't allow anything outside A-Z and a-z as characters.`,
  `Zip code is required (not all countries have zip codes), and its validation is very strict. It accepts only five-digit format.`,
  `Country code list sort order is inconvenient and there's no search option.`,
  `The phone number input has too lax validation, considering the country code is a separate field.`,
  `The password validation has multiple problems: fixed content requirements, limited characters, too low minimum and maximum lengths.`,
  `Validation is done before user has finished their inputs (opinionated).`,
]);
</script>
<template>
  <v-form v-model="currentFormValid">
    <v-container>
      <row-header text="Basic Information" />
      <v-row>
        <v-col cols="6">
          <v-text-field
            v-model="data.firstname"
            :rules="nameRules"
            label="Given Name"
            required
          ></v-text-field>
          <v-text-field
            v-model="data.lastname"
            :rules="nameRules"
            label="Family Name"
            required
          ></v-text-field>
          <v-text-field
            v-model="data.address"
            :rules="addressRules"
            label="Address"
            required
          ></v-text-field>
          <div class="d-flex with-gap">
            <v-text-field
              v-model="data.zip"
              :rules="zipRules"
              placeholder="00000"
              label="Zip Code"
              required
            >
            </v-text-field>
            <v-text-field v-model="data.city" :rules="cityRules" label="City" required>
            </v-text-field>
          </div>
        </v-col>
        <v-col cols="6">
          <v-text-field
            v-model="data.email"
            :rules="emailRules"
            label="E-mail"
            required
          ></v-text-field>
          <div class="d-flex with-gap">
            <v-select
              v-model="data.countryCode"
              :items="countryCodes"
              :rules="countryCodeRules"
              item-title="text"
              item-value="code"
              label="Country Code"
            >
              <template #selection="{item}">{{ `+${item.value}` }}</template>
            </v-select>
            <v-text-field
              v-model="data.phone"
              :rules="phoneRules"
              label="Phone Number"
            ></v-text-field>
          </div>
          <v-text-field
            v-model="data.password"
            :rules="passwordRules"
            type="password"
            label="Set a Password"
            required
          ></v-text-field>
          <p class="text-body-2">
            The password must be 6-12 characters, include lowercase and uppercase alphabets, at
            least one number, and at least one of the following special characters: !"#¤%&/()=?"
          </p>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>
