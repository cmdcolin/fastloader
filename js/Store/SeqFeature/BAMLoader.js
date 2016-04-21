define([
           'dojo/_base/declare',
           'dojo/_base/lang',
           'dojo/request/xhr',
           'dojo/Deferred',
           'JBrowse/Store/SeqFeature/BAM',
           'JBrowse/Store/SeqFeature',
           'JBrowse/Store/DeferredFeaturesMixin'
       ],
       function(
           declare,
           lang,
           xhr,
           Deferred,
           BAMStore,
           SeqFeatureStore,
           DeferredFeaturesMixin
       ) {


return declare( [SeqFeatureStore, DeferredFeaturesMixin],
{
    constructor: function( args ) {
        var thisB = this;
        var baiUrl = this.resolveUrl( this.getConf('baiUrlTemplate',[]) || this.getConf('urlTemplate',[])+'.bai' );
        xhr(baiUrl).then(function(ret) {
            thisB.store = new BAMStore(args);
            thisB.store._deferred.features.then(function() {
                thisB._deferred.features.resolve({success: true});
            });
        }, function(err) {
            if(err.response.status == 404) {
                console.log('BAM index not found, using blank');
            }
            thisB._deferred.features.resolve({success: true});
        });
    },
    _getFeatures: function(query, featCallback, successCallback, errorCallback) {
        if(this.store) {
            return this.store.getFeatures(query, featCallback, successCallback, errorCallback);
        }
        else successCallback({});
    }
});
});
