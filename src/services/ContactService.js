import { API_BASE_URL } from "../config";
import { default as data } from "../assets/data/contacts.json";
// import http from "../http-common";

class ContactService {
  constructor() {
    this.url = API_BASE_URL + "/contacts";
    this.contacts = data;
  }
  async getAll(options) {
    if (options) {
      return this.contacts;
    }
    return this.contacts;
  }
  /*
    async getAll(options) {
      return http
        .get(this.url, {
          params: {
            page: options.page - 1,
            size: options.itemsPerPage,
            sort: `${options.sortBy[0]},${options.sortDesc[0] ? "desc" : "asc"}`
          }
        });
    }
  
    async save(data) {
      // save the entity
      return http.post(this.url, data);
    }
  
    async update(data) {
      // update the entity
      return http.put(data._links.self.href, data);
    }
  
    async delete(id) {
      return http.delete(`/${this.url}/${id}`);
    }
  */
}

export default new ContactService();
