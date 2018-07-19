import config from '../../config/config.js';

export default name => `${config.avatarImgURL}${name}${config.avatarImgFormat}`;
