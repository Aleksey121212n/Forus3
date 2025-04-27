/*const app = Vue.createApp({

})
.mount('#app')*/

const { createApp } = Vue;

createApp({
    components: {
      'user-list': {
        data() {
          return {
            usernames: ['torvalds', 'gaearon', 'yyx990803'], // список логинов GitHub
            users: ['Linus Torvalds', 'dan', 'Evan You'],
            loading: true,
            error: null
          };
        },
        mounted() {
          Promise.all(this.usernames.map(username =>
            axios.get(`https://api.github.com/users/${username}`)
              .then(res => res.data)
          ))
          .then(data => {
            this.users = data;
            this.loading = false;
          })
          .catch(err => {
            this.error = 'Ошибка при загрузке данных';
            this.loading = false;
          });
        },
        methods: {
          formatDate(dateStr) {
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            return new Date(dateStr).toLocaleDateString('ru-RU', options);
          }
        },
        template: `
          <div>
            <div v-if="loading">Загрузка...</div>
            <div v-if="error" style="color:red">{{ error }}</div>
            <div v-for="user in users" :key="user.id" style="border: 1px solid #ccc; margin: 10px; padding: 10px;">
              <img :src="user.avatar_url" alt="Аватар" width="100" />
              <h2>{{ user.login }}</h2>
              <p><a :href="user.html_url" target="_blank">Профиль GitHub</a></p>
              <p><strong>Дата регистрации:</strong> {{ formatDate(user.created_at) }}</p>
              <p><strong>Биография:</strong> {{ user.bio || 'Нет информации' }}</p>
              <p><strong>Подписчиков:</strong> {{ user.followers }}</p>
            </div>
          </div>
        `
      }
    }
  }).mount('#app');