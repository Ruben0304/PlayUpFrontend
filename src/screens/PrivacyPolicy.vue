<template>
  <!-- Contenido Principal -->
  <div class="bg-background-500 min-h-screen py-32">
    <div class="container mx-auto max-w-4xl px-4">
      <div class="relative overflow-hidden bg-background-600 rounded-xl p-8 shadow-2xl" data-aos="fade-up">
        <div class="absolute inset-0 gradient-background opacity-20"></div>
        <div class="relative z-10">

          <h1 class="text-4xl font-bold mb-8 text-primary-500">{{ $t('privacy_policy.title') }}</h1>
          <p class="text-gray-400 mb-6">{{ $t('privacy_policy.last_update') }}</p>

          <div class="prose prose-invert max-w-none">
            <p class="text-gray-300 mb-8">
              {{ $t('privacy_policy.intro') }}
            </p>

            <section class="mb-12">
              <h2 class="text-2xl font-bold text-primary-500 mb-6">{{ $t('privacy_policy.sections.info_collected.title') }}</h2>

              <div class="space-y-6 pl-4">
                <div>
                  <h3 class="text-xl font-semibold text-white mb-3">{{ $t('privacy_policy.sections.info_collected.registration_info.title') }}</h3>
                  <p class="text-gray-300">
                    {{ $t('privacy_policy.sections.info_collected.registration_info.content') }}
                  </p>
                </div>

                <div>
                  <h3 class="text-xl font-semibold text-white mb-3">{{ $t('privacy_policy.sections.info_collected.additional_info.title') }}</h3>
                  <p class="text-gray-300">
                    {{ $t('privacy_policy.sections.info_collected.additional_info.content') }}
                  </p>
                </div>
              </div>
            </section>

            <section class="mb-12">
              <h2 class="text-2xl font-bold text-primary-500 mb-6">{{ $t('privacy_policy.sections.info_usage.title') }}</h2>

              <div class="space-y-6 pl-4">
                <div>
                  <h3 class="text-xl font-semibold text-white mb-3">{{ $t('privacy_policy.sections.info_usage.service_provision.title') }}</h3>
                  <p class="text-gray-300">
                    {{ $t('privacy_policy.sections.info_usage.service_provision.content') }}
                  </p>
                </div>

                <div>
                  <h3 class="text-xl font-semibold text-white mb-3">{{ $t('privacy_policy.sections.info_usage.communication.title') }}</h3>
                  <p class="text-gray-300">
                    {{ $t('privacy_policy.sections.info_usage.communication.content') }}
                  </p>
                </div>

                <div>
                  <h3 class="text-xl font-semibold text-white mb-3">{{ $t('privacy_policy.sections.info_usage.app_improvement.title') }}</h3>
                  <p class="text-gray-300">
                    {{ $t('privacy_policy.sections.info_usage.app_improvement.content') }}
                  </p>
                </div>

                <div>
                  <h3 class="text-xl font-semibold text-white mb-3">{{ $t('privacy_policy.sections.info_usage.security.title') }}</h3>
                  <p class="text-gray-300">
                    {{ $t('privacy_policy.sections.info_usage.security.content') }}
                  </p>
                </div>
              </div>
            </section>

            <section class="mb-12">
              <h2 class="text-2xl font-bold text-primary-500 mb-6">{{ $t('privacy_policy.sections.info_sharing.title') }}</h2>

              <div class="space-y-6 pl-4">
                <div>
                  <h3 class="text-xl font-semibold text-white mb-3">{{ $t('privacy_policy.sections.info_sharing.service_providers.title') }}</h3>
                  <p class="text-gray-300">
                    {{ $t('privacy_policy.sections.info_sharing.service_providers.content') }}
                  </p>
                </div>

                <div>
                  <h3 class="text-xl font-semibold text-white mb-3">{{ $t('privacy_policy.sections.info_sharing.legal_requirements.title') }}</h3>
                  <p class="text-gray-300">
                    {{ $t('privacy_policy.sections.info_sharing.legal_requirements.content') }}
                  </p>
                </div>
              </div>
            </section>

            <section class="mb-12">
              <h2 class="text-2xl font-bold text-primary-500 mb-6">{{ $t('privacy_policy.sections.data_retention.title') }}</h2>
              <p class="text-gray-300">
                {{ $t('privacy_policy.sections.data_retention.content') }}
              </p>
            </section>

            <section class="mb-12">
              <h2 class="text-2xl font-bold text-primary-500 mb-6">{{ $t('privacy_policy.sections.user_rights.title') }}</h2>
              <p class="text-gray-300">
                {{ $t('privacy_policy.sections.user_rights.content') }}
              </p>
            </section>

            <section class="mb-12">
              <h2 class="text-2xl font-bold text-primary-500 mb-6">{{ $t('privacy_policy.sections.data_security.title') }}</h2>
              <p class="text-gray-300">
                {{ $t('privacy_policy.sections.data_security.content') }}
              </p>
            </section>

            <section class="mb-12">
              <h2 class="text-2xl font-bold text-primary-500 mb-6">{{ $t('privacy_policy.sections.policy_changes.title') }}</h2>
              <p class="text-gray-300">
                {{ $t('privacy_policy.sections.policy_changes.content') }}
              </p>
            </section>

            <section class="mb-12">
              <h2 class="text-2xl font-bold text-primary-500 mb-6">{{ $t('privacy_policy.sections.contact.title') }}</h2>
              <p class="text-gray-300">
                {{ $t('privacy_policy.sections.contact.content') }}
              </p>
            </section>

            <div class="mt-8 p-6 bg-gray-700 bg-opacity-50 rounded-lg">
              <p class="text-gray-300">
                {{ $t('privacy_policy.footer') }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
