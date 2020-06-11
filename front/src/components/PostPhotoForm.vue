<template>
  <div class="columns is-centered is-marginless">
    <div class="column is-one-quarter"></div>
    <div class="column is-half">
      <b-message
        title="posting photo"
        :active.sync="isActive"
        aria-close-label="Close message"
        type="is-warning"
      >
        <input />
      </b-message>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isActive: {
      type: Boolean,
      default: false,
      required: true
    }
  }
};
</script>
