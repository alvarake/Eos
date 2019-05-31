import musicU from '../../../assets/images/music.jpg';
import clockU from '../../../assets/images/clock.jpg';
import busU from '../../../assets/images/bus.jpeg';
import weatherU from '../../../assets/images/weather.jpg';
import newspaperU from '../../../assets/images/newspaper.jpg';


const music = { type: 'Música', path: '/welcome/settings/music', url_img: musicU, key: '1'};
const alarm = { type: 'Alarma', path: '/welcome/settings/alarm', url_img: clockU, key: '2'};
const route = { type: 'Autobús', path: '/welcome/settings/route', url_img: busU, key: '3'};
const weather = { type: 'Tiempo', path: '/welcome/settings/weather', url_img: weatherU, key: '4'};
const news = { type: 'Noticias', path: '/welcome/settings/news', url_img: newspaperU, key: '5'};


const items = [music, alarm, route, weather, news];

export default items;
