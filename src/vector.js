// =================================================================================================
// Fermat.js | Vector
// (c) 2014 Mathigon / Philipp Legner
// =================================================================================================


(function() {

    var setPrototype = Object.setPrototypeOf ||
                       function(obj, proto) { obj.__proto__ = proto; }; // jshint ignore:line


    // M.Vector([1, 2, 3]) = [1, 2, 3]
    // M.Vector(3) = [null, null, null]
    // M.Vector(3, 1) = [1, 1, 1]

    // M.Vector is a subclass of the native JavaScript Array type and contains all usual Array methods.
    // For very long or very large numbers of vectors, native Arrays perform significantly better.
    // All functions in M.vector work with M.Vector objects as well as native arrays

    M.Vector = function(a, b) {

        var array;

        if (Array.isArray(a)) {
            // Reduces performance, but we don't want to modify arguments passed in:
            array = a.slice(0);
        } else {
            array = [];
            if (b === undefined) b = null;
            for (var i=0; i<a; ++i) array.push(b);
        }

        // Reduces performance and violates JS best practices, but seems to be neccessary:
        setPrototype(array, M.Vector.prototype);

        return array;
    };

    M.Vector.prototype = new Array; // jshint ignore:line

    /* Alternate Array Subclass (doesn't use Object.setPrototypeOf but is slower):
       var M.Vector = function(array) { this.push.apply(this, array); };
       M.Vector.prototype = Object.create(Array.prototype);
       M.Vector.prototype.constructor = M.Vector; */

    M.extend(M.Vector.prototype, {

        total: function() {
            return M.total(this);
        },

        average: function() {
            return this.total() / this.length;
        },

        norm: function() {
            var n = 0;
            for (var i=0; i<this.length; ++i) n += M.square(this[i]);
            return Math.sqrt(n);
        },

        normalize: function() {
            var a = [], n = this.length;
            var total = this.norm();
            for (var i = 0; i < n; ++i) a.push(a[i]/total);
            return M.Vector(a);
        },

        toString: function() {
            return '(' + Array.join.call(this, ', ') + ')';
        }

    }, true);


    // ---------------------------------------------------------------------------------------------


    M.vector = {};

    M.vector.add = function(v1, v2) {
        var n = Math.max(v1.length, v2.length);
        var a = [];
        for (var i=0; i<n; ++i) a.push(v1[i] + v2[i]);
        return M.Vector(a);
    };

    M.vector.subt = function(v1, v2) {
        var n = Math.max(v1.length, v2.length);
        var a = [];
        for (var i=0; i<n; ++i) a.push(v1[i] - v2[i]);
        return M.Vector(a);
    };

    M.vector.dot = function(v1, v2) {
        var n = Math.max(v1.length, v2.length);
        var d = 0;
        for (var i=0; i<n; ++i) d += (v1[i] || 0) * (v2[i] || 0);
        return d;
    };

    M.vector.mult = function(v1, v2) {
        // TODO
    };

    M.vector.cross2D = function(x, y) {
        return x[0] * y[1] - x[1] * y[0];
    };

    M.vector.cross = function(v1, v2) {
        return M.Vector([v1[1] * v2[2] - v1[2] * v2[1],
                         v1[2] * v2[0] - v1[0] * v2[2],
                         v1[0] * v2[1] - v1[1] * v2[0]]);
    };

    M.vector.angle = function(a, b) {
        // TODO
    };

    M.vector.project = function(a, b) {
        // TODO
    };


})();