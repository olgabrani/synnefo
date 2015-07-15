import DS from 'ember-data';

export default DS.RESTSerializer.extend({
  extractArray: function(store, type, payload) {
    payload.forEach(function(el) {
      el.id = store.account + '/'+ el.name;
    });
    payload = { containers: payload};
    return this._super(store, type, payload);
  },
  extractSingle: function(store, type, payload, id) {

    var account, parts;

   if (id.match(/\//)) {
      parts = id.split("/", 2);
      name = parts[1];
      account = parts[0];
    }
    var container = { 
      id: id,
      name: name,
      account_id: account,
    };
    payload = { 
      container: container, 
    };
    return this._super(store, type, payload, id);
  },
  normalizeHash: {
    containers: function(hash) {
      hash.project = hash.x_container_policy && hash.x_container_policy.project;
      return hash;
    }
  },
});
