const $ = require('jquery');

const ajaxGet = (name, menuType, tag, cb) => {
  const BASE_URL = process.env.BASE_URL ? process.env.BASE_URL : '';
  const temp = `${BASE_URL}/restaurants/${name}/menu/${menuType}`;
  const URL = tag === 'none' ? temp : `${temp}/${tag}`;
  $.ajax({
    type: 'GET',
    url: URL,
    contentType: 'application/json',
    success: (result) => {
      cb(result);
    },
    error: (error) => {
      cb(error);
    }
  });
};

export default ajaxGet;
