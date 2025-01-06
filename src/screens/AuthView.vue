<template>
  <div class="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden">
    <!-- Fondo con gradiente -->
    <div class="absolute inset-0 bg-background-500"></div>



    <!-- Contenedor principal del formulario -->
    <div class="max-w-md w-full space-y-8 relative z-10" data-aos="fade-up" data-aos-duration="1000">
      <!-- Cabecera -->
      <div>
        <h2 class="mt-6 text-center text-4xl font-extrabold bg-gradient-to-r from-white to-primary-500 bg-clip-text text-transparent">
          {{ isLogin ? $t('auth.loginTitle') : $t('auth.registerTitle') }}
        </h2>
      </div>

      <!-- Mensaje de error -->
      <div
          v-if="error"
          class="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded relative"
          role="alert"
          data-aos="fade-down"
      >
        <span class="block sm:inline">{{ error }}</span>
      </div>

      <!-- Mensaje de éxito -->
      <div
          v-if="successMessage"
          class="bg-green-500/10 border border-green-500 text-green-500 px-4 py-3 rounded relative"
          role="alert"
          data-aos="fade-down"
      >
        <span class="block sm:inline">{{ successMessage }}</span>
      </div>

      <!-- Formulario -->
      <form class="mt-8 space-y-6" @submit.prevent="handleSubmit">
        <input type="hidden" name="remember" value="true" />

        <div class="rounded-md shadow-sm space-y-4">
          <!-- Your existing template code here -->
          <TransitionGroup name="slide-fade">
            <div v-if="!isLogin" key="firstName" data-aos="fade-right" data-aos-delay="200">
              <label for="first-name" class="sr-only">{{ $t('auth.firstName') }}</label>
              <input
                  id="first-name"
                  name="firstName"
                  type="text"
                  autocomplete="given-name"
                  required
                  class="auth-input"
                  :placeholder="$t('auth.firstName')"
                  v-model="firstName"
              />
            </div>

            <div v-if="!isLogin" key="lastName" data-aos="fade-right" data-aos-delay="400">
              <label for="last-name" class="sr-only">{{ $t('auth.lastName') }}</label>
              <input
                  id="last-name"
                  name="lastName"
                  type="text"
                  autocomplete="family-name"
                  required
                  class="auth-input"
                  :placeholder="$t('auth.lastName')"
                  v-model="lastName"
              />
            </div>
          </TransitionGroup>

          <!-- Email -->
          <div data-aos="fade-right" data-aos-delay="600">
            <label for="email-address" class="sr-only">{{ $t('auth.email') }}</label>
            <input
                id="email-address"
                name="email"
                type="email"
                autocomplete="email"
                required
                class="auth-input"
                :placeholder="$t('auth.email')"
                v-model="email"
            />
          </div>

          <!-- Password -->
          <div class="relative" data-aos="fade-right" data-aos-delay="800">
            <label for="password" class="sr-only">{{ $t('auth.password') }}</label>
            <input
                id="password"
                :type="showPassword ? 'text' : 'password'"
                name="password"
                autocomplete="current-password"
                required
                class="auth-input pr-10"
                :placeholder="$t('auth.password')"
                v-model="password"
            />
            <button
                type="button"
                class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white"
                @click="togglePasswordVisibility"
            >
              <EyeIcon v-if="showPassword" class="h-5 w-5" />
              <EyeOffIcon v-else class="h-5 w-5" />
            </button>
          </div>
        </div>

        <!-- Opciones adicionales -->
        <div class="flex items-center justify-between" data-aos="fade-up" data-aos-delay="1000">
          <div class="flex items-center">
            <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                v-model="rememberMe"
                class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-700 rounded bg-gray-800"
            />
            <label for="remember-me" class="ml-2 block text-sm text-gray-300">
              {{ $t('auth.rememberMe') }}
            </label>
          </div>

          <div class="text-sm">
            <button
                type="button"
                class="font-medium text-primary-500 hover:text-primary-400"
                @click="showForgotPassword = true"
            >
              {{ $t('auth.forgotPassword') }}
            </button>
          </div>
        </div>

        <!-- Botón de submit -->
        <div data-aos="zoom-in" data-aos-delay="1200">
          <button
              type="submit"
              class="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition duration-300 ease-in-out overflow-hidden disabled:opacity-50"
              :disabled="isLoading"
          >
            <span class="absolute left-0 inset-y-0 flex items-center pl-3">
              <LockIcon
                  class="h-5 w-5 text-primary-500 group-hover:text-primary-400"
                  aria-hidden="true"
              />
            </span>
            <span v-if="!isLoading">{{ isLogin ? $t('auth.signIn') : $t('auth.signUp') }}</span>
            <span v-else class="flex items-center">
              <svg
                  class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
              >
                <circle
                    class="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                ></circle>
                <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              {{ $t('auth.loading') }}
            </span>
          </button>
        </div>
      </form>

      <!-- Toggle de modo de autenticación -->
      <div class="text-center" data-aos="fade-up" data-aos-delay="1400">
        <button
            @click="toggleAuthMode"
            class="text-sm text-gray-400 hover:text-white transition duration-300"
        >
          {{ isLogin ? $t('auth.needAccount') : $t('auth.alreadyHaveAccount') }}
        </button>
      </div>
    </div>

    <!-- Modal de recuperación de contraseña -->
    <TransitionRoot appear :show="showForgotPassword" as="template">
      <Dialog as="div" @close="showForgotPassword = false" class="relative z-50">
        <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0"
            enter-to="opacity-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100"
            leave-to="opacity-0"
        >
          <DialogOverlay class="fixed inset-0 bg-black/75" />
        </TransitionChild>

        <div class="fixed inset-0 overflow-y-auto">
          <div class="flex min-h-full items-center justify-center p-4 text-center">
            <TransitionChild
                as="template"
                enter="duration-300 ease-out"
                enter-from="opacity-0 scale-95"
                enter-to="opacity-100 scale-100"
                leave="duration-200 ease-in"
                leave-from="opacity-100 scale-100"
                leave-to="opacity-0 scale-95"
            >
              <DialogPanel class="w-full max-w-md transform overflow-hidden rounded-2xl bg-gray-800 p-6 text-left align-middle shadow-xl transition-all">
                <DialogTitle
                    as="h3"
                    class="text-lg font-medium leading-6 text-white mb-4"
                >
                  {{ $t('auth.resetPasswordTitle') }}
                </DialogTitle>

                <div class="mt-2">
                  <p class="text-sm text-gray-400 mb-4">
                    {{ $t('auth.resetPasswordDescription') }}
                  </p>
                  <input
                      type="email"
                      v-model="resetEmail"
                      class="auth-input"
                      :placeholder="$t('auth.email')"
                  />
                </div>

                <div class="mt-4 flex justify-end space-x-3">
                  <button
                      type="button"
                      class="inline-flex justify-center rounded-md border border-transparent bg-gray-600 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
                      @click="showForgotPassword = false"
                  >
                    {{ $t('common.cancel') }}
                  </button>
                  <button
                      type="button"
                      class="inline-flex justify-center rounded-md border border-transparent bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
                      @click="handlePasswordReset"
                      :disabled="isResetting"
                  >
                    <span v-if="!isResetting">{{ $t('auth.sendResetLink') }}</span>
                    <span v-else class="flex items-center">
                      <svg
                          class="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                      >
                        <circle
                            class="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            stroke-width="4"
                        ></circle>
                        <path
                            class="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      {{ $t('auth.sending') }}
                    </span>
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </div>
</template>

<script setup>
import {ref, onMounted, onUnmounted, inject} from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n'; // Importa useI18n
import {
  Dialog,
  DialogOverlay,
  DialogPanel,
  DialogTitle,
  TransitionRoot,
  TransitionChild,
} from '@headlessui/vue';
import { LockIcon, EyeIcon, EyeOffIcon } from 'lucide-vue-next';
import AOS from 'aos';
import 'aos/dist/aos.css';

const auth = inject('authService')
// Router
const router = useRouter();

// i18n
const { t } = useI18n(); // Usa el hook useI18n

// Form state
const isLogin = ref(true);
const email = ref('');
const password = ref('');
const firstName = ref('');
const lastName = ref('');
const rememberMe = ref(false);
const showPassword = ref(false);
const isLoading = ref(false);
const error = ref(null);
const successMessage = ref(null);

// Password reset state
const showForgotPassword = ref(false);
const resetEmail = ref('');
const isResetting = ref(false);

// Toggle password visibility
const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

// Toggle between login and register
const toggleAuthMode = () => {
  isLogin.value = !isLogin.value;
  error.value = null;
  successMessage.value = null;
  resetForm();
};

// Reset form fields
const resetForm = () => {
  email.value = '';
  password.value = '';
  firstName.value = '';
  lastName.value = '';
  rememberMe.value = false;
};

// Handle form submission
const handleSubmit = async () => {
  error.value = null;
  successMessage.value = null;
  isLoading.value = true;

  try {
    let result;

    if (isLogin.value) {
      result = await auth.signIn({
        email: email.value,
        password: password.value,
      });
    } else {
      result = await auth.signUp({
        email: email.value,
        password: password.value,
        firstName: firstName.value,
        lastName: lastName.value,
      });
    }

    if (result.error) {
      throw result.error;
    }

    if (!isLogin.value) {
      successMessage.value = t('auth.verificationEmailSent'); // Usa t en lugar de $t
      resetForm();
    } else {
      // Si el login es exitoso, redirigir al dashboard
      await router.push('/admin');
    }
  } catch (err) {
    error.value = translateError(err.message);
  } finally {
    isLoading.value = false;
  }
};

// Manejar reinicio de contraseña
const handlePasswordReset = async () => {
  if (!resetEmail.value) {
    error.value = t('auth.emailRequired'); // Usa t en lugar de $t
    return;
  }

  isResetting.value = true;
  error.value = null;
  successMessage.value = null;

  try {
    const { error: resetError } = await auth.resetPassword(resetEmail.value);

    if (resetError) throw resetError;

    successMessage.value = t('auth.resetEmailSent'); // Usa t en lugar de $t
    showForgotPassword.value = false;
    resetEmail.value = '';
  } catch (err) {
    error.value = translateError(err.message);
  } finally {
    isResetting.value = false;
  }
};

// Traducir mensajes de error de Supabase
const translateError = (errorMessage) => {
  const errorMap = {
    'Invalid login credentials': t('auth.errors.invalidCredentials'), // Usa t en lugar de $t
    'User already registered': t('auth.errors.userExists'),
    'Invalid email': t('auth.errors.invalidEmail'),
    'Password is too short': t('auth.errors.passwordTooShort'),
    'Email not confirmed': t('auth.errors.emailNotConfirmed'),
    // Agrega más traducciones de errores según necesites
  };

  return errorMap[errorMessage] || t('auth.errors.generic'); // Usa t en lugar de $t
};

// Validaciones del formulario
// const validateForm = () => {
//   if (!email.value || !password.value) {
//     error.value = t('auth.errors.allFieldsRequired'); // Usa t en lugar de $t
//     return false;
//   }
//
//   if (!isLogin.value && (!firstName.value || !lastName.value)) {
//     error.value = t('auth.errors.allFieldsRequired'); // Usa t en lugar de $t
//     return false;
//   }
//
//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   if (!emailRegex.test(email.value)) {
//     error.value = t('auth.errors.invalidEmail'); // Usa t en lugar de $t
//     return false;
//   }
//
//   if (password.value.length < 6) {
//     error.value = t('auth.errors.passwordTooShort'); // Usa t en lugar de $t
//     return false;
//   }
//
//   return true;
// };

// Manejar autenticación con proveedores sociales
// const handleSocialAuth = async (provider) => {
//   try {
//     const { error } = await auth.signInWithProvider(provider);
//     if (error) throw error;
//   } catch (err) {
//     error.value = translateError(err.message);
//   }
// };

// Inicializar AOS
onMounted(() => {
  AOS.init({
    duration: 1000,
    once: true,
    mirror: false,
  });
});

// Cleanup al desmontar el componente
onUnmounted(() => {
  // Limpiar cualquier subscripción o timer si los hay
});
</script>


<style scoped>
.auth-input {
  @apply appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-500 text-white bg-gray-800 focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm transition duration-300 ease-in-out;
}

.auth-input:focus {
  @apply transform scale-105;
}

/* Animaciones de transición */
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(20px);
  opacity: 0;
}

/* Animación del botón */
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: .7;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>