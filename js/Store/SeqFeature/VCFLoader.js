define([
           'dojo/_base/declare',
           'dojo/_base/lang',
           'dojo/request/xhr',
           'dojo/Deferred',
           'JBrowse/Store/SeqFeature/VCFTabix',
           'JBrowse/Store/SeqFeature'
       ],
       function(
           declare,
           lang,
           xhr,
           Deferred,
           VCFTabix,
           SeqFeatureStore
       ) {


return declare( SeqFeatureStore,
{
    constructor: function( args ) {
        var thisB = this;
        var tbiUrl = this.resolveUrl( this.getConf('tbiUrlTemplate',[]) || this.getConf('urlTemplate',[])+'.tbi' );
        xhr(tbiUrl).then(function(ret) {
            thisB.store = new VCFTabix(args);
        }, function(err) {
            if(err.response.status == 404) {
                console.log('Tabix not found, using blank');
            }
        });
    },
    getFeatures: function(query, featCallback, successCallback, errorCallback) {
        if(this.store) {
            return this.store.getFeatures(query, featCallback, successCallback, errorCallback);
        }
        else successCallback({});
    }
});
});
