import musicU from '../../../assets/images/music.jpg';
import clockU from '../../../assets/images/clock.jpg';
import busU from '../../../assets/images/bus.jpeg';
import weatherU from '../../../assets/images/weather.jpg';
import newspaperU from '../../../assets/images/newspaper.jpg';


const music = { type: 'Music', path: '/welcome/settings/music', url_img: musicU };
const alarm = { type: 'Alarm', path: '/welcome/settings/alarm', url_img: clockU };
const route = { type: 'Route', path: '/welcome/settings/route', url_img: busU };
const weather = { type: 'Weather', path: '/welcome/settings/weather', url_img: weatherU };
const news = { type: 'News', path: '/welcome/settings/news', url_img: newspaperU };


const items = [music, alarm, route, weather, news];

export default items;
