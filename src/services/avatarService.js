import config from '../../config/config.dist';

export default name => `${config.avatarImgURL}${name}${config.avatarImgFormat}`;
