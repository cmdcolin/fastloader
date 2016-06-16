define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/request/xhr',
    'dojo/Deferred',
    'JBrowse/Store/SeqFeature/VCFTabix',
    'JBrowse/Store/SeqFeature',
    'JBrowse/Store/DeferredFeaturesMixin'
],
function(
    declare,
    lang,
    xhr,
    Deferred,
    VCFTabix,
    SeqFeatureStore,
    DeferredFeaturesMixin
) {
    return declare([SeqFeatureStore, DeferredFeaturesMixin], {
        constructor: function(args) {
            var thisB = this;
            console.log('here');
            var tbiUrl = this.resolveUrl(this.getConf('tbiUrlTemplate', []) || this.getConf('urlTemplate', []) + '.tbi');
            xhr(tbiUrl).then(function() {
                thisB.store = new VCFTabix(args);
                thisB.store._deferred.features.then(function() {
                    thisB._deferred.features.resolve({success: true});
                });
            }, function(err) {
                if (err.response.status === 404) {
                    console.log('Tabix not found, using blank');
                }
                thisB._deferred.features.resolve({success: true});
            });
        },
        _getFeatures: function(query, featCallback, successCallback, errorCallback) {
            if (this.store) {
                return this.store.getFeatures(query, featCallback, successCallback, errorCallback);
            } else {
                return successCallback({});
            }
        },
        getVCFHeader: function() {
            if (this.store) {
                return this.store.getVCFHeader();
            } else {
                return {};
            }
        }
    });
});
