<template>
  <div class="fixed bottom-4 right-4 z-50">
    <!-- Botón flotante para abrir el chat -->
    <button
        v-if="!isOpen"
        @click="isOpen = true"
        class="flex items-center justify-center w-16 h-16 bg-primary-600 text-white rounded-full shadow-lg hover:bg-primary-700 transition-all duration-300 hover:scale-105"
    >
      <LucideMessageCircle class="h-8 w-8" />
    </button>

    <!-- Contenedor del chat -->
    <div
        v-show="isOpen"
        class="fixed bottom-4 right-4 w-[420px] h-[660px] bg-white rounded-2xl shadow-2xl overflow-hidden transition-all duration-500 animate-in"
        :class="isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95'"
    >
      <!-- Chat header -->
      <header class="h-16 px-6 flex items-center justify-between bg-primary-600 text-white">
        <div class="flex items-center gap-3">
          <LucideBot class="h-6 w-6" />
          <h1 class="text-xl font-semibold">Asistente Virtual</h1>
        </div>
        <button
            @click="isOpen = false"
            class="p-2 hover:bg-primary-700 rounded-lg transition-colors"
        >
          <LucideX class="h-6 w-6" />
        </button>
      </header>

      <!-- Chat messages -->
      <div
          ref="messagesContainer"
          class="flex-1 h-[calc(100%-8rem)] p-6 overflow-y-auto bg-gray-50"
      >
        <div class="space-y-6">
          <div
              v-for="(message, index) in messages"
              :key="index"
              :class="['flex gap-3 max-w-[85%] transition-all duration-300',
                     message.role === 'user' ? 'ml-auto flex-row-reverse' : '',
                     message.isNew ? 'animate-message-in' : '']"
          >
            <div
                v-if="message.role === 'agent'"
                class="h-10 w-10 rounded-full bg-primary-600 flex-shrink-0 flex items-center justify-center"
            >
              <LucideBot class="text-white h-6 w-6" />
            </div>
            <div :class="['space-y-1', message.role === 'user' ? 'items-end' : 'items-start']">
              <div class="flex items-center gap-2" :class="message.role === 'user' ? 'flex-row-reverse' : ''">
                <span class="text-xs font-medium text-gray-600">
                  {{ message.role === 'agent' ? 'Asistente' : 'Tú' }}
                </span>
                <span class="text-xs text-gray-400">{{ message.timestamp }}</span>
              </div>
              <div
                  :class="[
                  'p-4 rounded-2xl shadow-sm max-w-[300px]',
                  message.role === 'agent'
                    ? 'bg-white text-gray-800 rounded-tl-none'
                    : 'bg-primary-600 text-white rounded-tr-none'
                ]"
              >
                <p class="text-sm whitespace-pre-wrap leading-relaxed">
                  {{ message.content }}
                </p>
              </div>

              <!-- Feedback buttons - only for agent messages -->
              <div v-if="message.role === 'agent' && message.message_id" class="flex items-center gap-2 mt-1 ml-1">
                <button
                    @click="toggleFeedback(index, 'positive')"
                    :class="[
                    'p-1.5 rounded-full transition-all duration-300',
                    message.feedback === 'positive' ? 'bg-green-100 text-green-600' : 'text-gray-400 hover:text-gray-600'
                  ]"
                >
                  <LucideThumbsUp
                      class="h-4 w-4"
                      :class="{ 'animate-feedback': message.feedback === 'positive' }"
                  />
                </button>
                <button
                    @click="toggleFeedback(index, 'negative')"
                    :class="[
                    'p-1.5 rounded-full transition-all duration-300',
                    message.feedback === 'negative' ? 'bg-red-100 text-red-600' : 'text-gray-400 hover:text-gray-600'
                  ]"
                >
                  <LucideThumbsDown
                      class="h-4 w-4"
                      :class="{ 'animate-feedback': message.feedback === 'negative' }"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Loading indicator -->
        <div v-if="isLoading" class="flex justify-center mt-6 animate-fade-in">
          <div class="loading-dots">
            <div class="dot bg-primary-600"></div>
            <div class="dot bg-primary-600"></div>
            <div class="dot bg-primary-600"></div>
          </div>
        </div>
      </div>

      <!-- Input area -->
      <div class="absolute bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100">
        <div v-if="showCustomMessageWarning" class="mb-3 p-3 bg-amber-50 border border-amber-200 rounded-lg text-amber-700 text-sm animate-fade-in">
          <div class="flex items-center gap-2">
            <LucideAlertCircle class="h-4 w-4 flex-shrink-0" />
            <p>Lo sentimos, actualmente solo puedes seleccionar preguntas predefinidas. La funcionalidad de preguntas personalizadas estará disponible próximamente.</p>
          </div>
          <button 
            @click="showCustomMessageWarning = false" 
            class="mt-2 text-xs font-medium text-amber-600 hover:text-amber-800 transition-colors"
          >
            Entendido
          </button>
        </div>

        <div v-if="!showQuestionCategories" class="flex gap-3 items-center">
          <textarea
              v-model="input"
              placeholder="Selecciona o escribe tu pregunta..."
              @keydown.enter.prevent="checkCustomMessage"
              @focus="showQuestionCategories = true"
              class="flex-1 h-12 py-2 px-4 rounded-full border border-gray-200 resize-none focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-700 placeholder-gray-400 text-sm"
          ></textarea>
          <button
              @click="checkCustomMessage"
              :disabled="!input.trim() || isLoading"
              class="p-3 bg-black text-white rounded-full hover:bg-gray-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shadow-md hover:shadow-lg"
          >
            <LucideSend v-if="!isLoading" class="h-5 w-5" />
            <div v-else class="h-5 w-5 animate-spin">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 12a9 9 0 1 1-6.219-8.56"></path>
              </svg>
            </div>
          </button>
        </div>

        <!-- Categorías de preguntas -->
        <div v-if="showQuestionCategories" class="question-categories animate-slide-up">
          <div class="flex justify-between items-center mb-3">
            <h3 class="text-sm font-medium text-gray-700">Selecciona una pregunta</h3>
            <button 
              @click="showQuestionCategories = false" 
              class="p-1 text-gray-400 hover:text-gray-600 rounded-full transition-colors"
            >
              <LucideX class="h-4 w-4" />
            </button>
          </div>

          <div class="categories-container">
            <div v-for="(category, idx) in questionCategories" :key="idx" class="category-item">
              <button 
                @click="toggleCategory(idx)"
                class="category-header"
                :class="{'active': expandedCategory === idx}"
              >
                <span class="font-medium">{{ category.name }}</span>
                <LucideChevronDown 
                  class="h-4 w-4 transition-transform duration-300" 
                  :class="{'rotate-180': expandedCategory === idx}"
                />
              </button>
              
              <div 
                v-if="expandedCategory === idx" 
                class="questions-list animate-fade-in"
              >
                <button 
                  v-for="(question, qIdx) in category.questions" 
                  :key="qIdx"
                  @click="selectQuestion(question)"
                  class="question-item"
                >
                  {{ question }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal de feedback negativo -->
  <Transition name="modal">
    <div v-if="showFeedbackModal" class="fixed inset-0 z-[60] flex items-center justify-center bg-black/50">
      <div
          class="bg-white rounded-xl shadow-2xl w-[90%] max-w-md mx-4 overflow-hidden animate-modal-in"
          @click.stop
      >
        <div class="p-5 bg-primary-600 text-white">
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-semibold flex items-center gap-2">
              <LucideAlertCircle class="h-5 w-5" />
              Ayúdanos a mejorar
            </h3>
            <button
                @click="closeFeedbackModal"
                class="p-1 hover:bg-primary-700 rounded-full transition-colors"
            >
              <LucideX class="h-5 w-5" />
            </button>
          </div>
        </div>

        <div class="p-6">
          <p class="text-gray-700 mb-4">¿Por qué consideras que la respuesta no fue útil?</p>

          <div class="space-y-3">
            <div
                v-for="(option, idx) in feedbackOptions"
                :key="idx"
                :class="[
                'p-3 border rounded-lg cursor-pointer transition-all duration-200 flex items-center gap-3',
                selectedFeedbackOption === idx
                  ? 'border-primary-500 bg-primary-50 shadow-sm'
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              ]"
                @click="selectedFeedbackOption = idx"
            >
              <div
                  :class="[
                  'w-5 h-5 rounded-full border-2 flex items-center justify-center',
                  selectedFeedbackOption === idx ? 'border-primary-500' : 'border-gray-300'
                ]"
              >
                <div
                    v-if="selectedFeedbackOption === idx"
                    class="w-3 h-3 rounded-full bg-primary-500 animate-scale-in"
                ></div>
              </div>
              <span class="text-sm text-black">{{ option }}</span>
            </div>

            <!-- Opción "Otro" con campo de texto -->
            <div v-if="selectedFeedbackOption === feedbackOptions.length - 1" class="mt-3 animate-fade-in">
              <textarea
                  v-model="customFeedback"
                  placeholder="Por favor, cuéntanos más..."
                  class="w-full p-3 border border-gray-200 rounded-lg text-sm resize-none h-24 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              ></textarea>
            </div>
          </div>

          <div class="mt-6 flex justify-end gap-3">
            <button
                @click="closeFeedbackModal"
                class="px-4 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors text-sm"
            >
              Cancelar
            </button>
            <button
                @click="submitFeedback"
                class="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm flex items-center gap-2"
                :disabled="selectedFeedbackOption === null"
                :class="{ 'opacity-50 cursor-not-allowed': selectedFeedbackOption === null }"
            >
              <LucideSend class="h-4 w-4" />
              Enviar
            </button>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { inject } from 'vue';
import { ref, reactive, watch, nextTick } from 'vue';

import {
  LucideBot,
  LucideX,
  LucideMessageCircle,
  LucideSend,
  LucideThumbsUp,
  LucideThumbsDown,
  LucideAlertCircle,
  LucideChevronDown
} from 'lucide-vue-next';

const isOpen = ref(false);
const input = ref('');
const messagesContainer = ref(null);
const isLoading = ref(false); // Estado para controlar el loading

const messages = reactive([
  {
    role: 'agent',
    content: '¡Hola! Soy tu asistente de PlayUp 👋 Puedo ayudarte con:\n\n• Información sobre torneos y competiciones\n• Gestión de equipos y jugadores\n• Dudas sobre el funcionamiento de la plataforma\n• Soporte técnico\n\n¿En qué puedo ayudarte hoy?',
    timestamp: new Date().toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit'
    }),
    isNew: false,
    feedback: null,
    feedbackDetails: null,
    message_id: null
  }
]);

// Estado para el modal de feedback
const showFeedbackModal = ref(false);
const selectedFeedbackOption = ref(null);
const customFeedback = ref('');

// Opciones de feedback
const feedbackOptions = [
  'Respuesta incorrecta o imprecisa',
  'Respuesta incompleta',
  'No entendió mi pregunta',
  'Respuesta irrelevante al contexto',
  'Lenguaje demasiado técnico o complejo',
  'Respuesta demasiado básica o simple',
  'Otro'
];

// Add the chat service
const chatService = inject('chatService');

// Obtener las categorías de preguntas del servicio
const questionCategories = reactive(chatService.getQuestionCategories());

// Estado para el selector de preguntas
const showQuestionCategories = ref(false);
const expandedCategory = ref(null);
const showCustomMessageWarning = ref(false);

// Función para alternar la visibilidad de una categoría
const toggleCategory = (index) => {
  if (expandedCategory.value === index) {
    expandedCategory.value = null;
  } else {
    expandedCategory.value = index;
  }
};

// Función para seleccionar una pregunta
const selectQuestion = (question) => {
  input.value = question;
  showQuestionCategories.value = false;
  sendMessage();
};

// Función para verificar si el mensaje es personalizado
const checkCustomMessage = () => {
  if (!input.value.trim()) return;
  
  // Verificar si el mensaje está en la lista de preguntas predefinidas usando el servicio
  const isPreDefinedQuestion = chatService.isPreDefinedQuestion(input.value);
  
  if (isPreDefinedQuestion) {
    sendMessage();
  } else {
    showCustomMessageWarning.value = true;
  }
};

// Scroll al último mensaje cuando se añade uno nuevo
watch(messages, async () => {
  await nextTick();
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
  }
}, { deep: true });

// Update the sendMessage function
const sendMessage = async () => {
  if (!input.value.trim() || isLoading.value) return;

  const timestamp = new Date().toLocaleTimeString('es-ES', {
    hour: '2-digit',
    minute: '2-digit'
  });

  // Add user message
  messages.push({
    role: 'user',
    content: input.value,
    timestamp,
    isNew: true
  });

  const userMessage = input.value;
  input.value = '';
  isLoading.value = true;

  try {
    const response = await chatService.sendMessage(userMessage);

    // Add agent response
    messages.push({
      role: 'agent',
      content: response.answer,
      timestamp,
      isNew: true,
      feedback: null,
      feedbackDetails: null,
      message_id: null
    });
  } catch (error) {
    console.error('Error al comunicarse con el chatbot:', error);

    // In the sendMessage function, update the error message
    messages.push({
      role: 'agent',
      content: 'Lo siento, parece que hay un problema técnico en este momento. Por favor, intenta nuevamente en unos minutos o contacta con nuestro equipo de soporte si el problema persiste.',
      timestamp,
      isNew: true,
      feedback: null,
      feedbackDetails: null,
      message_id: null
    });
  } finally {
    isLoading.value = false;
  }

  // Remove isNew class after animation
  setTimeout(() => {
    messages.forEach(msg => msg.isNew = false);
  }, 500);
};
</script>

<style scoped>
.animate-in {
  animation: scaleIn 0.3s ease-out;
}

@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.95) translateY(10px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.animate-message-in {
  animation: messageIn 0.5s ease-out;
}

@keyframes messageIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-feedback {
  animation: pulse 0.4s ease-in-out;
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.3);
  }
  100% {
    transform: scale(1);
  }
}

.animate-modal-in {
  animation: modalIn 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes modalIn {
  0% {
    opacity: 0;
    transform: scale(0.9) translateY(20px);
  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.animate-scale-in {
  animation: scaleIn 0.2s ease-out;
}

.animate-fade-in {
  animation: fadeIn 0.3s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.animate-slide-up {
  animation: slideUp 0.3s ease-out;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Transición para el modal */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

/* Estilizar scrollbar */
.overflow-y-auto {
  scrollbar-width: thin;
  scrollbar-color: #3b82f6 transparent;
}

.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: transparent;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background-color: #3b82f6;
  border-radius: 3px;
}

/* Estilos para el loading de puntos */
.loading-dots {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;
}

.loading-dots .dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  animation: dotPulse 1.5s infinite ease-in-out;
}

.loading-dots .dot:nth-child(1) {
  animation-delay: 0s;
}

.loading-dots .dot:nth-child(2) {
  animation-delay: 0.2s;
}

.loading-dots .dot:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes dotPulse {
  0%, 100% {
    transform: scale(0.7);
    opacity: 0.5;
  }
  50% {
    transform: scale(1);
    opacity: 1;
  }
}

/* Estilos para el selector de preguntas */
.question-categories {
  max-height: 300px;
  overflow-y: auto;
  border-radius: 12px;
  background-color: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.categories-container {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.category-item {
  border-radius: 8px;
  overflow: hidden;
}

.category-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 12px;
  width: 100%;
  text-align: left;
  background-color: #f3f4f6;
  transition: all 0.2s ease;
}

.category-header:hover {
  background-color: #e5e7eb;
}

.category-header.active {
  background-color: #dbeafe;
  color: #2563eb;
}

.questions-list {
  display: flex;
  flex-direction: column;
  padding: 4px;
  background-color: #f9fafb;
}

.question-item {
  padding: 8px 12px;
  text-align: left;
  border-radius: 6px;
  font-size: 0.875rem;
  transition: all 0.2s ease;
  color: #4b5563;
}

.question-item:hover {
  background-color: #f3f4f6;
  color: #2563eb;
}
</style>