/*jshint node:true*/

var Rx = require('rx');

var RxMixin = {
    
    getInitialState: function () {
        return {};
    },
 
    componentWillMount: function() {
        this.stateStream = new Rx.Subject();
        
        this.stateStream.forEach(function (value) {
            this.setState(value);
        }.bind(this)); 
      
        if (!this.getSubjects) return;
        var subjects = this.subjects = this.getSubjects();
        var eventHandlers = {};
        Object.keys(subjects).forEach(function(key) {
            eventHandlers[key] = subjects[key].onNext.bind(subjects[key]);
        });
        this.handlers = eventHandlers;
  },


};

module.exports = RxMixin;



