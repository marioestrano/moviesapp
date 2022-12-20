import axios from 'axios';


const movieDb = axios.create({
    baseURL: 'https://api.themoviedb.org/3/movie',
    params: {
        api_key: '1b56a0840b29cd29ba6e1410868b0133',
        language: 'es-ES'
    }
});

export default movieDb;
