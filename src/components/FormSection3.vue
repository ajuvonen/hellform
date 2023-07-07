<script setup lang="ts">
import {storeToRefs} from 'pinia';
import {useFormStore} from '@/stores/form';
import {useCurrentSectionProblems} from '@/hooks/currentSectionProblems';
import RowHeader from '@/components/RowHeader.vue';
import {lengthValidator} from '@/utils';

const {currentForm, currentFormValid, data} = storeToRefs(useFormStore());

const lengthRules = [lengthValidator(0, 50)];

useCurrentSectionProblems([
  `Tab order of the fields does not follow the visual or logical order of the elements.`,
  `Different sizing and alignment between what should be similar elements.`,
  `Too big spacing between related elements disconnects them visually.`,
  `The uneven alignment of elements breaks visual continuity.`,
  `Buttons in the footer are in an illogical order.`,
]);
</script>
<template>
  <v-form ref="currentForm" v-model="currentFormValid">
    <v-container>
      <row-header text="Taste Profile" />
      <v-row>
        <v-col cols="12" class="text-body-1"
          >Fill in some details so we can customize our service for you.</v-col
        >
      </v-row>
      <v-row>
        <v-col cols="5">
          <fieldset>
            <legend class="text-h6">Favorite Male Actor</legend>
            <v-text-field
              v-model="data.favoriteMale"
              :rules="lengthRules"
              label="Name"
              tabindex="1"
              required
            ></v-text-field>
            <v-text-field
              v-model="data.favoriteMaleWork"
              :rules="lengthRules"
              label="Movie or Series"
              tabindex="3"
              required
            ></v-text-field>
          </fieldset>
        </v-col>
        <v-col cols="7">
          <fieldset class="narrow">
            <legend class="text-h6 ml-auto">Favorite Female Actor</legend>
            <v-text-field
              v-model="data.favoriteFemale"
              :rules="lengthRules"
              label="Name"
              tabindex="2"
              required
            ></v-text-field>
            <v-text-field
              v-model="data.favoriteFemaleWork"
              :rules="lengthRules"
              label="Movie or Series"
              tabindex="4"
              required
            ></v-text-field>
          </fieldset>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6">
          <fieldset>
            <legend class="text-h7">Favorite Composer</legend>
            <v-text-field
              v-model="data.favoriteComposer"
              :rules="lengthRules"
              label="Name"
              required
            ></v-text-field>
            <v-text-field
              v-model="data.favoriteComposerWork"
              :rules="lengthRules"
              label="Movie or Series"
              required
            ></v-text-field>
          </fieldset>
        </v-col>
        <v-col cols="6">
          <fieldset>
            <legend class="text-h6 ml-auto">Favorite Director</legend>
            <v-text-field
              v-model="data.favoriteDirector"
              :rules="lengthRules"
              label="Name"
              required
            ></v-text-field>
            <v-text-field
              v-model="data.favoriteDirectorWork"
              :rules="lengthRules"
              label="Movie or Series"
              required
            ></v-text-field>
          </fieldset>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>
<style lang="scss" scoped>
fieldset {
  padding-right: 5rem;
  padding-left: 1rem;
  border: 0;
  &.narrow {
    padding-right: 5rem;
    padding-left: 5rem;
  }
  > div {
    margin-top: 3rem;
  }
}

legend {
  padding: 0.5rem;
}
</style>
