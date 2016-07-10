import client from "axios";
import { CMS_ROOT_URL } from 'shared/constants/apis';
import  { getCSRFToken, capitalize } from 'shared/utilities';

export const axios = client.create({
  baseURL: CMS_ROOT_URL,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'X-CSRF-Token': getCSRFToken()
  }
});

export function createAuthorizedRequest(method, path, params) {
  const config = { headers: { 'Authorization': localStorage.getItem('accessToken') } };
  switch(method) {
    case 'get':
      return axios.get(path, config);
    case 'post':
      return axios.post(path, params, config);
    case 'patch' :
      return axios.patch(path, params, config);
    case 'delete' :
      return axios.delete(path, config);
  }
}


export function trimPost(params) {
  return {
    ...convertKeyNameInSnakeCase(params),
    items_attributes:
      params.itemsAttributes
        .filter(item => !item.editing)
        .map(item => convertKeyNameInSnakeCase(item))
  };
}

export function trimProject(params) {
  return { ...convertKeyNameInSnakeCase(params) };
}

export function trimAuthor(params) {
  return {
    ...convertKeyNameInSnakeCase(params),
    social_accounts_attributes:
      params.socialAccountsAttributes
        .filter(item => item.url)
        .map(item => convertKeyNameInSnakeCase(item))
  };
}

function convertKeyNameInSnakeCase(object) {
  return Object.keys(object).reduce((newObject, oldKey) => {
    newObject[convertCamelCaseToSnakeCase(oldKey)] = object[oldKey];
    return newObject;
  }, {});
}

function convertCamelCaseToSnakeCase(string) {
  return string.replace(/([A-Z])/g,
    function(string) {
      return '_' + string.charAt(0).toLowerCase();
    }
  );
}

