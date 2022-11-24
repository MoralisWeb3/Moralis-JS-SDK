var cp = require('child_process');

var raw = exports.raw = function(pid, fn) {
    if (typeof pid === 'function') {
        fn = pid;
        pid = parseInt(process.pid);
    }

    cp.exec('lsof -p ' + pid, function(err, d) {
        d = d.split('\n');
        var data = [];
        var headers = d[0].toLowerCase().split(/\s+/);
        headers.forEach(function(v, k) {
            /*istanbul ignore next*/
            if (v === '') {
                delete headers[k];
            }
        });
        delete d[0]; //Remove the headers
        d.pop(); //Remove the last dead space
        d.forEach(function(v) {
            v = v.split(/\s+/);
            if (v[4] === 'KQUEUE') {
                return;
            }
            var k = {};
            v.forEach(function(s, i) {
                k[headers[i]] = s;
            });
            data.push(k);
        });
        fn(data);
    });
};

var rawTcpPort = exports.rawTcpPort = function(port, fn) {
    cp.exec('lsof -i tcp:' + port, function(err, d) {
        d = d.split('\n');
        var data = [];
        var headers = d[0].toLowerCase().split(/\s+/);
        headers.forEach(function(v, k) {
            /*istanbul ignore next*/
            if (v === '') {
                delete headers[k];
            }
        });
        delete d[0]; //Remove the headers
        d.pop(); //Remove the last dead space
        d.forEach(function(v) {
            v = v.split(/\s+/);
            var k = {};
            var finalField = v[headers.length];
            /*istanbul ignore else*/
            if (finalField) {
	            // There is one more field than there are headers. Interpret that state info.
	            // These are things like '(LISTEN)' or '(ESTABLISHED)'. Save it into the state
	            // field minus the parenthesis and lowercased
	            k['state'] = finalField.substring(1, finalField.length-1).toLowerCase();
	            v.pop();
            }
            v.forEach(function(s, i) {
                k[headers[i]] = s;
            });
            data.push(k);
        });
        fn(data);
    });
};

var rawUdpPort = exports.rawUdpPort = function(port, fn) {
    cp.exec('lsof -i udp:' + port, function(err, d) {
        d = d.split('\n');
        var data = [];
        var headers = d[0].toLowerCase().split(/\s+/);
        headers.forEach(function(v, k) {
            /*istanbul ignore next*/
            if (v === '') {
                delete headers[k];
            }
        });
        delete d[0]; //Remove the headers
        d.pop(); //Remove the last dead space
        d.forEach(function(v) {
            v = v.split(/\s+/);
            var k = {};
            v.forEach(function(s, i) {
                k[headers[i]] = s;
            });
            data.push(k);
        });
        fn(data);
    });
};

var counters = exports.counters = function(pid, fn) {
    if (typeof pid === 'function') {
        fn = pid;
        pid = parseInt(process.pid);
    }
    raw(pid, function(data) {
        var t = {};
        data.forEach(function(v) {
            /*istanbul ignore else*/
            if (v) {
                var ty = v.type.toLowerCase();
                if (!t[ty]) {
                    t[ty] = 0;
                }
                t[ty]++;
            }
        });
        /*istanbul ignore next*/
        var user = (data[0]) ? data[0].user : 'unknown';
        var d = {
            pid: pid,
            user: user,
            open: data.length,
            types: t
        };
        fn(d);
    });
    
}

