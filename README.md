# fastloader


A JBrowse plugin to load BED tabix, VCF tabix, or BAM as a blank track if the index url gets a 404


## Options

Three storeClass types are available

    FastLoader/Store/SeqFeature/BAMLoader
    FastLoader/Store/SeqFeature/VCFLoader
    FastLoader/Store/SeqFeature/BEDLoader


## Usage


You can set a urlTemplate to contain some variables, such as {refseq}, which can speed up loading for BAM or VCF files


The source code for src/JBrowse/Component.js describes default params

     * With no additional values given, knows how to interpolate
     * {refseq}, {refSeq}, {refSeqNum}, and {refSeqNumNoLeadingZeroes}.

So for example, you can use in your config file


    urlTemplate=subdir/file.{refseq}.bam


And then have the BAM broken out by chromosome

    subdir/file.chr1.bam
    subdir/file.chr1.bam.bai
    subdir/file.chr2.bam
    subdir/file.chr2.bam.bai
    ...



Note that if you have a custom store you can add even more custom variables to interpolate

## Example config

    [tracks.MyTrack]
    urlTemplate={refseq}.vcf.gz
    storeClass=FastLoader/Store/SeqFeature/VCFLoader
    type=CanvasVariants

## Installation


Download the repo to plugins/FastLoader

Then add to the jbrowse config something like

    "plugins": ["FastLoader"]


