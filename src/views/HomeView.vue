<script setup lang="ts">
import {ref} from 'vue';
import HellForm from '@/components/HellForm.vue';
import {useFormStore} from '@/stores/form';
import {storeToRefs} from 'pinia';
import {useRouter} from 'vue-router';

const router = useRouter();
const formStore = useFormStore();
const formActive = ref(false);

const {skipAllowed} = storeToRefs(formStore);

const activateForm = () => {
  formStore.$reset();
  skipAllowed.value = false;
  formActive.value = true;
};
</script>
<template>
  <h1 class="text-center mt-8">Welcome to Hell</h1>
  <v-expand-transition>
    <div class="text-center" v-if="!formActive">
      <p class="text-body-1 mt-10 text-justify">
        Hell Form is an imaginary online registration form where many things go wrong. We've all
        experienced these quirks one time or the other, but usually no service manages to gather so
        many of them together.
      </p>
      <p class="text-body-1 mt-4 text-justify">
        The thing about Hell Form is that depending on your inputs, you may experience no problem at
        all. The form just happens to make a lot of assumptions on users and the data they want to
        input. Hell Form also breaks common best practices regarding accessibility and web design
        which don't cost anything to do right.
      </p>
      <p class="text-body-1 mt-4 text-justify">
        What would our favorite services feel like, if no designer was involved in the project at
        any point? What if we forgot to test the service on actual users? What if we didn't care
        about accessibility at all? Hell Form would become the norm.
      </p>
      <p clasS="text-body-1 mt-4 text-justify text-warning">
        This app does not collect or send information anywhere, but it is still recommended to use
        fake data.
      </p>
      <div class="d-flex with-gap justify-center">
        <v-btn
          v-if="!formActive"
          class="mt-10 marker"
          :color="skipAllowed ? 'secondary' : 'primary'"
          prepend-icon="mdi-heart"
          @click="activateForm"
          >Get Started</v-btn
        >
        <v-btn
          v-if="skipAllowed"
          class="mt-10 marker"
          color="primary"
          prepend-icon="mdi-run-fast"
          @click="router.push('/thanks')"
          >Skip to Finish</v-btn
        >
      </div>
    </div>
    <hell-form v-if="formActive"></hell-form>
  </v-expand-transition>
</template>
<style lang="scss" scoped></style>
