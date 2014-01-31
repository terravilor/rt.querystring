(function(window) {

	function Querystring(_callback, _url) {
		this.callback = function(){};
		this.url = window.location.href;

		if (_url != null) this.url = _url;
		if (_callback != null) this.callback = _callback;
	}

	Querystring.prototype.get = function(key) {
		key = key.replace(/[\[]/, '\\\[').replace(/[\]]/, '\\\]');
		
		var regex = new RegExp('(/)' + key + '=([^&#\/]*)'),
		results = regex.exec(url);
		
		return results == null ? '' : decodeURIComponent(results[2].replace(/\+/g, ' '));
	};

	Querystring.prototype.set = function(key, value) {
		var re = new RegExp('([/])' + key + '=.*?(&|#|$|\/)', 'i');
		var url = this.url;

		if (url.match(re)) {
			this.apply(url.replace(re, '$1' + key + '=' + value + '$2'));
		} else {
			var hash =  '';
			var separator = '/';    

			this.apply(url + separator + key + '=' + value);
		}

		this.callback();
	}

	Querystring.prototype.clear = function(key) {
		var re = new RegExp('([/])' + key + '=.*?(&|#|$|\/)', 'i');
		var url = this.url;

		var value = '';
		if (url.match(re)) {
			this.apply(url.replace(re, '$1' + key + '=' + value + '$2'));
		} else {
			var hash =  '';
			var separator = '/';    

			this.apply(url + separator + key + '=' + value);
		}
	}

	Querystring.prototype.insert = function(url) {
		if (!remove) remove = false;
		var query = QueryString.get(key);
		var sep = ',';
		
		var arr_query = query.split(',');
		if (remove) {
			var new_query = '';
			for (var i = 0; i < arr_query.length; i++) {
				if (value != arr_query[i]) new_query += arr_query[i] + ',';
			}

			query = new_query;
			value = '';
		}

		if (query == '') sep = '';
		QueryString.set(key, QueryString.organize(query + sep + value));
	}

	Querystring.prototype.find = function() {
		function key(query) {
			//TODO
		}

		function value(key, query) {
			//TODO
		}

		/*var arr = query.split(',');
		var result = '';
		for (var i = 0; i < arr.length; i++) {
			for (var j = 0; j < ids.length; j++) {
				if (arr[i] == ids[j]) {
					return true;
				}
			}
		}

		return false;*/
	}

	Querystring.prototype.organize = function(query) {
		var arr = query.split(',');
		var result = '';
		for (var i = 0; i < arr.length; i++) {
			if (arr[i] != '') {
				result += arr[i] + ',';
			}
		}

		result = result.substr(0, result.length - 1);
		return result;
	}

	Querystring.prototype.transform = function(query) {
		var re = new RegExp('/', 'g');
		query = query.replace(re, '&');

		return query;
	}

	Querystring.prototype.apply = function(url) {
		window.location.href = url;
		this.url = url;
	}

	Querystring.prototype.clearAll = function() {
		var url = this.url;
		url = url.split('#')[0];
		this.apply(url + '#');
	}

	Querystring.prototype.replaceAll = function() {
		this.clearAll();

		var url = this.url;
		url = url.split('#')[0];
		this.apply(url + '#' + query);
	}

	window.Querystring = Querystring;
}(window))