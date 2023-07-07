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
  `Different sizing between what should be similar elements.`,
  `Too big spacing between related elements disconnects them visually.`,
  `Uneven alignment of elements breaks visual continuity.`,
  `Enclosures don't make sense, since they are not grouping similar concepts.`,
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
      <v-row class="with-gap">
        <v-col cols="5" class="enclosure ml-auto">
          <h3 class="text-h5">Favorite Male Actor</h3>
          <v-text-field
            v-model="data.favoriteMale"
            :rules="lengthRules"
            class="mt-10"
            label="Name"
            tabindex="1"
            required
          ></v-text-field>
          <v-text-field
            v-model="data.favoriteMaleWork"
            :rules="lengthRules"
            class="short mt-10"
            label="Movie or Series"
            tabindex="3"
            required
          ></v-text-field>
          <h3 class="text-h5 mt-6">Favorite Composer</h3>
          <v-text-field
            v-model="data.favoriteComposer"
            :rules="lengthRules"
            class="mt-10"
            label="Name"
            required
          ></v-text-field>
          <v-text-field
            v-model="data.favoriteComposerWork"
            :rules="lengthRules"
            class="short mt-10"
            label="Movie or Series"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="5" class="enclosure mr-auto">
          <h3 class="text-h5 text-right">Favorite Female Actor</h3>
          <v-text-field
            v-model="data.favoriteFemale"
            :rules="lengthRules"
            class="mt-10"
            label="Name"
            tabindex="2"
            required
          ></v-text-field>
          <v-text-field
            v-model="data.favoriteFemaleWork"
            :rules="lengthRules"
            class="short ml-auto mt-10"
            label="Movie or Series"
            tabindex="4"
            required
          ></v-text-field>
          <h3 class="text-h5 text-right mt-6">Favorite Director</h3>
          <v-text-field
            v-model="data.favoriteDirector"
            :rules="lengthRules"
            class="mt-10"
            label="Name"
            required
          ></v-text-field>
          <v-text-field
            v-model="data.favoriteDirectorWork"
            :rules="lengthRules"
            class="short ml-auto mt-10"
            label="Movie or Series"
            required
          ></v-text-field>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>
<style lang="scss" scoped>
.short {
  width: 70%;
}

.enclosure {
  border: 2px solid rgba(var(--v-border-color));
  border-radius: 4px;
}
</style>
