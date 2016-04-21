define([
           'dojo/_base/declare',
           'dojo/_base/lang',
           'dojo/request/xhr',
           'dojo/Deferred',
           'JBrowse/Store/SeqFeature/BAM',
           'JBrowse/Store/SeqFeature'
       ],
       function(
           declare,
           lang,
           xhr,
           Deferred,
           BAMStore,
           SeqFeatureStore
       ) {


return declare( SeqFeatureStore,
{
    constructor: function( args ) {
        var thisB = this;
        var baiUrl = this.resolveUrl( this.getConf('baiUrlTemplate',[]) || this.getConf('urlTemplate',[])+'.bai' );
        xhr(baiUrl).then(function(ret) {
            thisB.store = new BAMStore(args);
        }, function(err) {
            if(err.response.status == 404) {
                console.log('BAM index not found, using blank');
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
