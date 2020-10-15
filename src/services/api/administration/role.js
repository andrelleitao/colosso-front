import { get, post, patch, destroy } from '../../../config/api';
import { URL_ROLE } from './index';

export const RoleAPI = {
  index: () =>
    get(URL_ROLE),
  findById: (id) =>
    get(`${URL_ROLE}/${id}`),
  findByName: (name) =>
    get(`${URL_ROLE}?name=${name}`),
  create: (params) =>
    post(URL_ROLE, params),
  update: (id, params) =>
    patch(`${URL_ROLE}/${id}`, params),
  remove: (id) =>
    destroy(`${URL_ROLE}/${id}`),
}