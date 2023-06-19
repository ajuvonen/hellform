<script setup lang="ts">
defineProps<{text: string}>();
</script>
<template>
  <v-row>
    <v-col cols="12">
      <h3 class="text-h6">{{ text }}</h3>
    </v-col>
  </v-row>
</template>
