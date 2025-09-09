// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@element-plus/nuxt", "@pinia/nuxt", "@nuxt/eslint"],
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  css: ["~/assets/global.scss"],
  app: {
    head: {
      title: "Test interview",
      meta: [
        { name: "robots", content: "noindex" },
        {
          name: "description",
          content: "This is test interview exam",
        },
      ],
      viewport:
        "width=device-width, initial-scale=1, maximum-scale=1, viewport-fit=cover, user-scalable=no, shrink-to-fit=no",
    },
  },
});
