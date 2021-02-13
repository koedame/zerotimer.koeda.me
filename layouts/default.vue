<template lang="pug">
div
  nuxt
  .container
    .section
      .level
        .level-left
        .level-right
          b-button#form-button(type="is-warning", icon-left="triangle", @click="openContactFrom")
            strong 要望・不具合報告はこちら
  footer.footer
    .content.has-text-centered
      p
        | 提供：
        a(href="https://koeda.me/", target="_blank" rel="noopener noreferrer") 肥溜め

      p
        | ソースコード：
        a(href="https://github.com/koedame/zerotimer.koeda.me", target="_blank" rel="noopener noreferrer")
          b-icon(icon="github")
          | GitHub

</template>

<script>
import ContactForm from '~/components/ContactForm'

export default {
  methods: {
    openContactFrom() {
      this.$buefy.modal.open({
        parent: this,
        component: ContactForm,
      })
    },
  },
}
</script>
