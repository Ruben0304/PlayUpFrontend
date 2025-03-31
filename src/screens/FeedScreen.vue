<template>
  <section class="py-8 relative bg-background-500 min-h-screen">
    <div class="absolute inset-0 gradient-background opacity-10"></div>
    <div class="relative max-w-2xl mx-auto px-4">
      <h2 class="text-3xl font-bold text-white mb-8 text-center animate-fade-in">
        Novedades
      </h2>

      <!-- Skeleton Loading -->
      <div v-if="isLoading" class="space-y-6">
        <div v-for="i in 3" :key="i" class="bg-background-600 rounded-xl overflow-hidden shadow-lg border border-background-400/20 animate-pulse">
          <!-- Skeleton Header -->
          <div class="flex items-center p-4">
            <div class="w-10 h-10 rounded-full bg-background-500"></div>
            <div class="ml-3 flex-1">
              <div class="h-4 bg-background-500 rounded w-1/3 mb-2"></div>
              <div class="h-3 bg-background-500 rounded w-1/4"></div>
            </div>
          </div>
          
          <!-- Skeleton Content -->
          <div class="px-4 py-2">
            <div class="h-5 bg-background-500 rounded w-3/4 mb-3"></div>
            <div class="h-4 bg-background-500 rounded w-full mb-2"></div>
            <div class="h-4 bg-background-500 rounded w-2/3"></div>
          </div>
          
          <!-- Skeleton Media -->
          <div class="h-60 bg-background-500 w-full"></div>
          
          <!-- Skeleton Actions -->
          <div class="px-4 py-3 flex items-center border-t border-background-400/20">
            <div class="h-6 w-16 bg-background-500 rounded-full mr-4"></div>
            <div class="h-6 w-16 bg-background-500 rounded-full"></div>
          </div>
        </div>
      </div>

      <!-- Feed Posts -->
      <div v-else class="space-y-6">
        <div 
          v-for="post in posts" 
          :key="post.id" 
          class="bg-background-600 rounded-xl overflow-hidden shadow-lg border border-background-400/20 transition-all duration-300 animate-slide-up"
          :style="{ animationDelay: `${posts.indexOf(post) * 0.1}s` }"
        >
          <!-- Post Header -->
          <div class="flex items-center p-4">
            <img 
              :src="post.publisher.image" 
              :alt="post.publisher.name"
              class="w-10 h-10 rounded-full object-cover border-2 border-primary-500 transition-transform duration-300"
            />
            <div class="ml-3">
              <p class="font-semibold text-white">{{ post.publisher.name }}</p>
              <p class="text-xs text-gray-400">{{ formatDate(post.created_at) }}</p>
            </div>
            <div class="ml-auto" v-if="post.owner">
              <button class="text-gray-400 hover:text-white transition-colors duration-200">
                <DotsHorizontal size="18" />
              </button>
            </div>
          </div>

          <!-- Post Title & Body -->
          <div class="px-4 py-2">
            <h3 class="font-bold text-white text-lg mb-1">{{ post.title }}</h3>
            <p class="text-gray-300 text-sm">{{ post.body }}</p>
          </div>
          
          <!-- Post Media -->
          <div v-if="post.media_urls && post.media_urls.length" class="relative">
            <!-- Image Carousel -->
            <div class="relative overflow-hidden">
              <div class="flex transition-transform duration-300 ease-in-out" :style="{ transform: `translateX(-${currentSlide[post.id] * 100}%)` }">
                <img 
                  v-for="(media, index) in post.media_urls" 
                  :key="index"
                  :src="media" 
                  :alt="`${post.title} - imagen ${index + 1}`"
                  class="w-full h-80 object-cover flex-shrink-0"
                  @click="openImageModal(media)"
                />
              </div>
              
              <!-- Navigation Arrows -->
              <button 
                v-if="post.media_urls.length > 1 && currentSlide[post.id] > 0" 
                @click="prevSlide(post.id)"
                class="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 rounded-full p-1.5 text-white transition-colors duration-200"
              >
                <ChevronLeft size="20" />
              </button>
              <button 
                v-if="post.media_urls.length > 1 && currentSlide[post.id] < post.media_urls.length - 1" 
                @click="nextSlide(post.id)"
                class="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 rounded-full p-1.5 text-white transition-colors duration-200"
              >
                <ChevronRight size="20" />
              </button>
              
              <!-- Dots Indicator -->
              <div v-if="post.media_urls.length > 1" class="absolute bottom-2 left-0 right-0 flex justify-center gap-1.5">
                <button 
                  v-for="(_, index) in post.media_urls" 
                  :key="index"
                  @click="goToSlide(post.id, index)"
                  class="w-2 h-2 rounded-full transition-all duration-200"
                  :class="currentSlide[post.id] === index ? 'bg-primary-500 scale-125' : 'bg-gray-400 hover:bg-gray-300'"
                ></button>
              </div>
            </div>
          </div>

          <!-- Post Actions -->
          <div class="px-4 py-3 flex items-center border-t border-background-400/20">
            <button 
              @click="toggleLike(post)" 
              class="flex items-center mr-4 focus:outline-none group transition-all duration-200"
              :class="post.user_liked ? 'text-primary-500' : 'text-gray-400 hover:text-primary-500'"
              :disabled="post.isLikeLoading"
            >
              <div v-if="post.isLikeLoading" class="w-5 h-5 relative">
                <div class="animate-ping absolute h-full w-full rounded-full bg-primary-400 opacity-75"></div>
                <div class="relative rounded-full h-5 w-5 flex items-center justify-center">
                  <Heart 
                    :fill="post.user_liked ? '#F93D3D' : 'none'" 
                    size="16"
                  />
                </div>
              </div>
              <Heart 
                v-else
                :fill="post.user_liked ? '#F93D3D' : 'none'" 
                size="20" 
                class="transition-transform duration-200"
                :class="post.user_liked ? 'animate-like' : ''"
              />
              <span class="ml-1 text-sm">{{ post.like_count }}</span>
            </button>
            <button 
              @click="openCommentsModal(post)"
              class="flex items-center text-gray-400 hover:text-white focus:outline-none group transition-all duration-200"
            >
              <MessageCircle size="20" class="transition-transform duration-200" />
              <span class="ml-1 text-sm">{{ post.comment_count }}</span>
            </button>
            <button 
              class="flex items-center ml-auto text-gray-400 hover:text-white focus:outline-none group transition-all duration-200"
            >
              <Share2 size="18" class="transition-transform duration-200" />
            </button>
          </div>

          <!-- Preview Comments (only show 2) -->
          <div v-if="post.comments && post.comments.length" class="px-4 py-2 border-t border-background-400/20">
            <div v-for="(comment) in post.comments.slice(0, 2)" :key="comment.id" class="mb-1">
              <div class="flex">
                <span class="font-semibold text-white text-sm">{{ comment.user.name }}</span>
                <p class="ml-2 text-gray-300 text-sm truncate">{{ comment.content }}</p>
              </div>
            </div>
            <button 
              v-if="post.comments.length > 2" 
              @click="openCommentsModal(post)"
              class="text-xs text-gray-400 hover:text-gray-300 mt-1 transition-colors duration-200"
            >
              Ver todos los {{ post.comments.length }} comentarios
            </button>
          </div>
          
          <!-- Comment Input -->
          <div class="px-4 py-3 border-t border-background-400/20 flex items-center">
            <input 
              :id="`comment-input-${post.id}`"
              v-model="commentText[post.id]" 
              type="text" 
              placeholder="Añadir un comentario..."
              class="flex-1 bg-background-700 text-white rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary-500 transition-all duration-200"
              @keyup.enter="addComment(post)"
            />
            <button 
              @click="addComment(post)"
              class="ml-2 text-primary-500 focus:outline-none transition-all duration-200 hover:text-primary-400"
              :disabled="!commentText[post.id]"
            >
              <Send size="18" class="transform hover:translate-x-1 transition-transform duration-200" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Comments Modal -->
  <Teleport to="body">
    <div 
      v-if="showCommentsModal" 
      class="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 animate-fade-in"
      @click="closeCommentsModal"
    >
      <div 
        class="bg-background-600 rounded-xl w-full max-w-lg max-h-[90vh] overflow-hidden animate-scale-in"
        @click.stop
      >
        <!-- Modal Header -->
        <div class="flex items-center justify-between p-4 border-b border-background-400/20">
          <h3 class="text-xl font-bold text-white">Comentarios</h3>
          <button @click="closeCommentsModal" class="text-gray-400 hover:text-white transition-colors duration-200">
            <X size="20" />
          </button>
        </div>
        
        <!-- Comments List -->
        <div class="overflow-y-auto p-4 max-h-[60vh]">
          <div v-if="commentsLoading" class="flex justify-center py-8">
            <div class="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-500"></div>
          </div>
          
          <div v-else-if="commentsList.length === 0" class="text-center py-8 text-gray-400">
            No hay comentarios aún. ¡Sé el primero en comentar!
          </div>
          
          <div v-else class="space-y-4">
            <div 
              v-for="comment in commentsList" 
              :key="comment.id" 
              class="flex items-start space-x-3 animate-slide-up"
              :style="{ animationDelay: `${commentsList.indexOf(comment) * 0.05}s` }"
            >
              <img 
                :src="comment.user.image" 
                :alt="comment.user.name"
                class="w-8 h-8 rounded-full object-cover border border-primary-500/50"
              />
              <div class="flex-1">
                <div class="bg-background-700 rounded-lg p-3">
                  <div class="flex items-center justify-between mb-1">
                    <span class="font-semibold text-white text-sm">{{ comment.user.name }}</span>
                    <span class="text-xs text-gray-500">{{ formatDate(comment.created_at) }}</span>
                  </div>
                  <p class="text-gray-300 text-sm">{{ comment.content }}</p>
                </div>
                <div class="flex items-center mt-1 ml-1 text-xs text-gray-500 space-x-3">
                  <!-- Removed "Me gusta" and "Responder" buttons -->
                </div>
              </div>
            </div>
          </div>
          
          <div v-if="commentsPagination.has_next" class="mt-4 text-center">
            <button 
              @click="loadMoreComments"
              class="px-4 py-2 bg-background-700 text-white rounded-full text-sm hover:bg-background-800 transition-colors duration-200"
            >
              Cargar más comentarios
            </button>
          </div>
        </div>
        
        <!-- Comment Input -->
        <div class="p-4 border-t border-background-400/20">
          <div class="flex items-center">
            <input 
              v-model="modalCommentText" 
              type="text" 
              placeholder="Añadir un comentario..."
              class="flex-1 bg-background-700 text-white rounded-full px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary-500 transition-all duration-200"
              @keyup.enter="addCommentFromModal"
            />
            <button 
              @click="addCommentFromModal"
              class="ml-2 text-primary-500 focus:outline-none transition-all duration-200 hover:text-primary-400 p-2"
              :disabled="!modalCommentText"
            >
              <Send size="20" class="transform hover:translate-x-1 transition-transform duration-200" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </Teleport>

  <!-- Image Modal -->
  <Teleport to="body">
    <div 
      v-if="showImageModal" 
      class="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 animate-fade-in"
      @click="closeImageModal"
    >
      <button @click="closeImageModal" class="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors duration-200">
        <X size="24" />
      </button>
      <img 
        :src="selectedImage" 
        alt="Imagen a tamaño completo" 
        class="max-w-full max-h-[90vh] object-contain animate-scale-in"
      />
    </div>
  </Teleport>
</template>

<script setup>
import { ref, onMounted, reactive, inject } from 'vue';
import { Heart, MessageCircle, Send, DotsHorizontal, ChevronLeft, ChevronRight, X, Share2 } from 'lucide-vue-next';

// Inject the news service
const newsService = inject('newsService');

// Posts data
const posts = ref([]);
const commentText = reactive({});
const currentSlide = reactive({});
const isLoading = ref(false);
const error = ref(null);

// Modal state
const showCommentsModal = ref(false);
const selectedPost = ref(null);
const modalCommentText = ref('');

// Comments pagination
const commentsList = ref([]);
const commentsLoading = ref(false);
const commentsPagination = ref({
  page: 1,
  limit: 10,
  total_pages: 1,
  has_next: false,
  has_prev: false
});
const currentCommentsPage = ref(1);

// Image modal state
const showImageModal = ref(false);
const selectedImage = ref('');

// Fetch posts from API
const fetchPosts = async () => {
  isLoading.value = true;
  error.value = null;
  
  try {
    // Use the news service to fetch posts
    const response = await newsService.getNews(1, 20);
    posts.value = response.data || [];
    
    // Initialize comment text and current slide for each post
    posts.value.forEach(post => {
      commentText[post.id] = '';
      currentSlide[post.id] = 0;
      
      // Add empty comments array if not present
      if (!post.comments) {
        post.comments = [];
      }
      
      // Initialize like loading state
      post.isLikeLoading = false;
    });
  } catch (err) {
    console.error('Error fetching posts:', err);
    error.value = 'Failed to load posts. Please try again later.';
  } finally {
    isLoading.value = false;
  }
};

// Format date to a readable format
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);
  
  if (diffInSeconds < 60) {
    return `${diffInSeconds}s`;
  } else if (diffInSeconds < 3600) {
    return `${Math.floor(diffInSeconds / 60)}m`;
  } else if (diffInSeconds < 86400) {
    return `${Math.floor(diffInSeconds / 3600)}h`;
  } else {
    return date.toLocaleDateString();
  }
};

// Toggle like on a post
const toggleLike = async (post) => {
  // Si ya está en proceso de carga, no hacer nada
  if (post.isLikeLoading) return;
  
  // Establecer el estado de carga
  post.isLikeLoading = true;
  
  try {
    if (post.user_liked) {
      await newsService.unlikeNews(post.id);
    } else {
      await newsService.likeNews(post.id);
    }
    
    // Update UI optimistically
    post.user_liked = !post.user_liked;
    post.like_count += post.user_liked ? 1 : -1;
  } catch (error) {
    console.error('Error toggling like:', error);
    // Revert UI changes if API call fails
    post.user_liked = !post.user_liked;
    post.like_count += post.user_liked ? 1 : -1;
  } finally {
    // Quitar el estado de carga después de completar
    post.isLikeLoading = false;
  }
};

// Add a comment to a post
const addComment = async (post) => {
  if (!commentText[post.id].trim()) return;
  
  try {
    const content = commentText[post.id];
    const response = await newsService.addComment(post.id, content);
    
    // Add the new comment to the post
    if (response && response.data) {
      post.comments.push(response.data);
      post.comment_count += 1;
    }
    
    commentText[post.id] = '';
  } catch (error) {
    console.error('Error adding comment:', error);
  }
};

// Fetch comments for a post
const fetchComments = async (postId, page = 1) => {
  commentsLoading.value = true;
  
  try {
    const response = await newsService.getComments(postId, page);
    
    if (response) {
      if (page === 1) {
        commentsList.value = response.data || [];
      } else {
        commentsList.value = [...commentsList.value, ...(response.data || [])];
      }
      
      commentsPagination.value = {
        page: response.page || 1,
        limit: response.limit || 10,
        total_pages: response.total_pages || 1,
        has_next: response.has_next || false,
        has_prev: response.has_prev || false
      };
    }
  } catch (error) {
    console.error('Error fetching comments:', error);
  } finally {
    commentsLoading.value = false;
  }
};

// Load more comments
const loadMoreComments = async () => {
  if (commentsPagination.value.has_next && selectedPost.value) {
    currentCommentsPage.value++;
    await fetchComments(selectedPost.value.id, currentCommentsPage.value);
  }
};

// Add comment from modal
const addCommentFromModal = async () => {
  if (!modalCommentText.value.trim() || !selectedPost.value) return;
  
  try {
    const content = modalCommentText.value;
    const response = await newsService.addComment(selectedPost.value.id, content);
    
    // Add the new comment to the comments list
    if (response && response.data) {
      commentsList.value.unshift(response.data);
      selectedPost.value.comment_count += 1;
      
      // Also update the preview comments in the post
      if (selectedPost.value.comments.length < 2) {
        selectedPost.value.comments.push(response.data);
      }
    }
    
    modalCommentText.value = '';
  } catch (error) {
    console.error('Error adding comment:', error);
  }
};

// Carousel navigation
const nextSlide = (postId) => {
  const post = posts.value.find(p => p.id === postId);
  if (post && currentSlide[postId] < post.media_urls.length - 1) {
    currentSlide[postId]++;
  }
};

const prevSlide = (postId) => {
  if (currentSlide[postId] > 0) {
    currentSlide[postId]--;
  }
};

const goToSlide = (postId, index) => {
  currentSlide[postId] = index;
};

// Open comments modal and fetch comments
const openCommentsModal = async (post) => {
  selectedPost.value = post;
  showCommentsModal.value = true;
  modalCommentText.value = '';
  document.body.style.overflow = 'hidden'; // Prevent background scrolling
  
  // Reset comments state
  commentsList.value = [];
  currentCommentsPage.value = 1;
  
  // Fetch comments for this post
  await fetchComments(post.id);
};

const closeCommentsModal = () => {
  showCommentsModal.value = false;
  document.body.style.overflow = ''; // Restore scrolling
};

const openImageModal = (imageUrl) => {
  selectedImage.value = imageUrl;
  showImageModal.value = true;
  document.body.style.overflow = 'hidden'; // Prevent background scrolling
};

const closeImageModal = () => {
  showImageModal.value = false;
  document.body.style.overflow = ''; // Restore scrolling
};

onMounted(() => {
  fetchPosts();
});
</script>

<style scoped>
.gradient-background {
  background:
      radial-gradient(
          100% 100% at 50% 50%,
          transparent 0%,
          rgb(0, 0, 0) 100%
      ),
      conic-gradient(
          from 225deg at 50% 50%,
          #FF4D4D 0deg,
          #4DFFFF 90deg,
          #000066 180deg,
          #FF4D4D 270deg,
          #4DFFFF 360deg
      );
  filter: blur(50px);
}

/* Animations */
@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes scale-in {
  from { transform: scale(0.9); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}

@keyframes slide-up {
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

@keyframes like {
  0% { transform: scale(1); }
  50% { transform: scale(1.3); }
  100% { transform: scale(1); }
}

@keyframes pulse {
  0%, 100% { opacity: 0.6; }
  50% { opacity: 0.3; }
}

.animate-fade-in {
  animation: fade-in 0.3s ease-out forwards;
}

.animate-scale-in {
  animation: scale-in 0.3s ease-out forwards;
}

.animate-slide-up {
  animation: slide-up 0.4s ease-out forwards;
  opacity: 0;
  will-change: transform, opacity;
}

.animate-like {
  animation: like 0.4s ease-out;
}

.animate-pulse {
  animation: pulse 1.5s ease-in-out infinite;
}

/* Eliminamos los ajustes específicos para grid */
@media (min-width: 768px) {
  .grid-cols-2 > * {
    opacity: 0;
    animation: slide-up 0.5s ease-out forwards;
  }
  
  .grid-cols-2 > *:nth-child(odd) {
    animation-delay: 0.1s;
  }
  
  .grid-cols-2 > *:nth-child(even) {
    animation-delay: 0.3s;
  }
}
</style>