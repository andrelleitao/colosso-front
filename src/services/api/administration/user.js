import { get, post, patch, destroy } from '../../../config/api';
import { URL_USER } from './index';

export const UserAPI = {
  index: () =>
    get(URL_USER),
  findById: (id) =>
    get(`${URL_USER}/${id}`),
  findByName: (name) =>
    get(`${URL_USER}?name=${name}`),
  create: (params) =>
    post(URL_USER, params),
  update: (id, params) =>
    patch(`${URL_USER}/${id}`, params),
  remove: (id) =>
    destroy(`${URL_USER}/${id}`),
}