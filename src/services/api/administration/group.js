import { get, post, patch, destroy } from '../../../config/api';
import { URL_GROUP } from './index';

export const GroupAPI = {
  index: () =>
    get(URL_GROUP),
  findById: (id) =>
    get(`${URL_GROUP}/${id}`),
  findByName: (name) =>
    get(`${URL_GROUP}?name=${name}`),
  create: (params) =>
    post(URL_GROUP, params),
  update: (id, params) =>
    patch(`${URL_GROUP}/${id}`, params),
  remove: (id) =>
    destroy(`${URL_GROUP}/${id}`),
}