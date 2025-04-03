export class ChatService {
    constructor() {
        this.baseUrl = 'https://script.google.com/macros/s/AKfycbwsAi9dZEz3WbnX5sSxHNyuYZlsvKPvIKJOHiYSwN3KjpxBm-rO8sM0C9rVt25-SGZp/exec';
        
        // Categorías de preguntas predefinidas
        this.questionCategories = [
            {
                name: 'Autenticación',
                questions: [
                    '¿Cómo puedo registrarme en PlayUp?',
                    '¿Cómo inicio sesión en mi cuenta de PlayUp?',
                    'Olvidé mi contraseña, ¿cómo puedo restablecerla?',
                    '¿Puedo usar mis redes sociales para iniciar sesión?'
                ]
            },
            {
                name: 'Perfil de usuario',
                questions: [
                    '¿Cómo edito mi información de perfil?',
                    '¿Cómo cambio mi foto de perfil?',
                    '¿Cómo cierro sesión en mi cuenta?',
                    '¿Puedo restablecer mis datos de usuario?'
                ]
            },
            {
                name: 'Gestión de equipos',
                questions: [
                    '¿Cómo creo un nuevo equipo?',
                    '¿Cómo me uno a un equipo existente?',
                    '¿Qué roles puedo tener en un equipo?',
                    '¿Cómo gestiono los miembros de mi equipo?',
                    '¿Puedo formar parte de varios equipos?'
                ]
            },
            {
                name: 'Torneos y competiciones',
                questions: [
                    '¿Cómo creo un nuevo torneo?',
                    '¿Cómo gestiono las temporadas de un torneo?',
                    '¿Cómo añado equipos a un torneo?',
                    '¿Cómo configuro los partidos de un torneo?',
                    '¿Cómo veo la tabla de posiciones de un torneo?',
                    '¿Puedo crear un torneo con formato de eliminación directa?'
                ]
            },
            {
                name: 'Partidos y eventos',
                questions: [
                    '¿Cómo programo un nuevo partido?',
                    '¿Cómo veo los próximos partidos?',
                    '¿Cómo registro el resultado de un partido?',
                    '¿Puedo ver estadísticas detalladas de los partidos?'
                ]
            },
            {
                name: 'Notificaciones',
                questions: [
                    '¿Cómo configuro mis notificaciones?',
                    '¿Qué tipos de notificaciones recibiré?',
                    '¿Por qué no recibo notificaciones?'
                ]
            },
            {
                name: 'Organizaciones',
                questions: [
                    '¿Qué es una organización en PlayUp?',
                    '¿Cómo creo una organización?',
                    '¿Cómo gestiono los torneos de mi organización?'
                ]
            },
            {
                name: 'Posiciones de jugadores',
                questions: [
                    '¿Qué posiciones de jugadores están disponibles en PlayUp?',
                    '¿Cómo asigno posiciones a los jugadores?'
                ]
            },
            {
                name: 'Soporte técnico',
                questions: [
                    'La aplicación se cierra inesperadamente, ¿qué debo hacer?',
                    '¿Cómo reporto un error?',
                    '¿Cómo actualizo la aplicación?',
                    '¿PlayUp funciona sin conexión a internet?'
                ]
            },
            {
                name: 'Características específicas',
                questions: [
                    '¿Puedo seguir estadísticas de partidos?',
                    '¿Hay un sistema de comunicación para los equipos?',
                    '¿Puedo compartir contenido de PlayUp en redes sociales?'
                ]
            },
            {
                name: 'Gestión de cuenta',
                questions: [
                    '¿Cómo cambio mi dirección de correo electrónico?',
                    '¿Puedo vincular varias cuentas sociales a mi perfil de PlayUp?',
                    '¿Qué debo hacer si no puedo acceder a mi cuenta?'
                ]
            },
            {
                name: 'Configuración de la app',
                questions: [
                    '¿Cómo cambio el idioma de la aplicación?',
                    '¿Puedo personalizar la apariencia de la aplicación?',
                    '¿Cómo gestiono el uso de datos en la aplicación?'
                ]
            }
        ];
    }

    // Método para obtener las categorías de preguntas
    getQuestionCategories() {
        return this.questionCategories;
    }

    // Método para verificar si una pregunta está predefinida
    isPreDefinedQuestion(question) {
        return this.questionCategories.some(category => 
            category.questions.includes(question.trim())
        );
    }

    async sendMessage(message) {
        try {
            const url = this.baseUrl + '?q=' + encodeURIComponent(message);
            
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json'
                },
                timeout: 8000 // 8 second timeout
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const text = await response.text();
            let data;
            
            try {
                data = JSON.parse(text);
            } catch (e) {
                console.warn('Invalid JSON response:', text);
                throw new Error('Invalid JSON response');
            }

            return data;
        } catch (error) {
            console.error('Request failed:', error);
            throw new Error('No se pudo conectar con el servicio. Por favor, intenta nuevamente más tarde.');
        }
    }
}