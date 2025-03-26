<template>
  <!-- Contenido Principal -->
  <div class="bg-background-500 min-h-screen py-32">
    <div class="container mx-auto max-w-4xl px-4">
      <div class="relative overflow-hidden bg-background-600 rounded-xl p-8 shadow-2xl" data-aos="fade-up">
        <div class="absolute inset-0 gradient-background opacity-20"></div>
        <div class="relative z-10">

          <h1 class="text-4xl font-bold mb-8 text-primary-500">{{ $t('terms.title') }}</h1>
          <p class="text-gray-400 mb-6">{{ $t('terms.last_update') }}</p>

          <div class="space-y-8">
            <div class="prose prose-invert">
              <p class="text-gray-300">{{ $t('terms.intro') }}</p>
            </div>

            <section class="space-y-4">
              <h2 class="text-2xl font-bold text-primary-500">{{ $t('terms.sections.usage.title') }}</h2>
              <div class="pl-4 space-y-4">
                <h3 class="text-xl font-semibold text-white">{{ $t('terms.sections.usage.proper_use.title') }}</h3>
                <p class="text-gray-300">{{ $t('terms.sections.usage.proper_use.content') }}</p>

                <h3 class="text-xl font-semibold text-white">{{ $t('terms.sections.usage.user_accounts.title') }}</h3>
                <p class="text-gray-300">{{ $t('terms.sections.usage.user_accounts.content') }}</p>
              </div>
            </section>

            <section class="space-y-4">
              <h2 class="text-2xl font-bold text-primary-500">{{ $t('terms.sections.privacy.title') }}</h2>
              <p class="text-gray-300">{{ $t('terms.sections.privacy.content') }}</p>
            </section>

            <section class="space-y-4">
              <h2 class="text-2xl font-bold text-primary-500">{{ $t('terms.sections.content.title') }}</h2>
              <div class="pl-4 space-y-4">
                <h3 class="text-xl font-semibold text-white">{{ $t('terms.sections.content.ownership.title') }}</h3>
                <p class="text-gray-300">{{ $t('terms.sections.content.ownership.content') }}</p>

                <h3 class="text-xl font-semibold text-white">{{ $t('terms.sections.content.user_generated.title') }}</h3>
                <p class="text-gray-300">{{ $t('terms.sections.content.user_generated.content') }}</p>
              </div>
            </section>

            <section class="space-y-4">
              <h2 class="text-2xl font-bold text-primary-500">{{ $t('terms.sections.updates.title') }}</h2>
              <p class="text-gray-300">{{ $t('terms.sections.updates.content') }}</p>
            </section>

            <section class="space-y-4">
              <h2 class="text-2xl font-bold text-primary-500">{{ $t('terms.sections.termination.title') }}</h2>
              <div class="pl-4 space-y-4">
                <h3 class="text-xl font-semibold text-white">{{ $t('terms.sections.termination.by_user.title') }}</h3>
                <p class="text-gray-300">{{ $t('terms.sections.termination.by_user.content') }}</p>

                <h3 class="text-xl font-semibold text-white">{{ $t('terms.sections.termination.by_playup.title') }}</h3>
                <p class="text-gray-300">{{ $t('terms.sections.termination.by_playup.content') }}</p>
              </div>
            </section>

            <section class="space-y-4">
              <h2 class="text-2xl font-bold text-primary-500">{{ $t('terms.sections.liability.title') }}</h2>
              <p class="text-gray-300">{{ $t('terms.sections.liability.content') }}</p>
            </section>

            <section class="space-y-4">
              <h2 class="text-2xl font-bold text-primary-500">{{ $t('terms.sections.changes.title') }}</h2>
              <p class="text-gray-300">{{ $t('terms.sections.changes.content') }}</p>
            </section>

            <section class="space-y-4">
              <h2 class="text-2xl font-bold text-primary-500">{{ $t('terms.sections.law.title') }}</h2>
              <p class="text-gray-300">{{ $t('terms.sections.law.content') }}</p>
            </section>

            <section class="space-y-4">
              <h2 class="text-2xl font-bold text-primary-500">{{ $t('terms.sections.contact.title') }}</h2>
              <p class="text-gray-300">{{ $t('terms.sections.contact.content') }}</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
