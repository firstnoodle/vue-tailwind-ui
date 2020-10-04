import Vue from 'vue';

export default Vue.component('search-highlight', {
    props: {
        value: {
            type: String,
            required: true
        },
        highlight: {
            type: String,
            required: false
        }
    },

    data() {
        return {
            segments: null
        }
    },

    created() {
        this.segments = this.segmentiseString(this.value, this.highlight);
    },

    watch: {
        highlight(newValue) {
            this.segments = this.segmentiseString(this.value, newValue);
        }
    },

    methods: {
        segmentiseString(targetString, searchString) {
            if(!targetString || !searchString) return;
            if(typeof targetString !== 'string' || typeof searchString !== 'string') return;

            const lowerCasedTargetString = targetString.toLowerCase();
            const lowerCasedSearchString = searchString.toLowerCase();
            
            let segmentBreakPoints = [];
            let resultIndex = -1;
            
            do {
                resultIndex = lowerCasedTargetString.indexOf(lowerCasedSearchString, resultIndex+1);
                if(resultIndex !== -1) {
                    segmentBreakPoints.push(resultIndex, resultIndex+lowerCasedSearchString.length);
                }
            } while(resultIndex > -1);
            
            let segments = [];
            let segmentIndex = 0;
            
            for(const highlight of segmentBreakPoints) {
                segments.push(targetString.substring(segmentIndex, highlight));
                segmentIndex = highlight;
            }
            
            segments.push(
                targetString.substring(
                    segmentBreakPoints[segmentBreakPoints.length-1], 
                    targetString.length
                )
            );
            
            return segments;
        }
    },

    render(createElement) {
        let elements = [];
        for(const segment of this.segments) {
            if(segment.toLowerCase() === this.highlight.toLowerCase()) {
                elements.push(createElement('span', { class: 'font-bold' }, [segment]));
            } else {
                elements.push(segment);
            }
        }
        return createElement('span', {}, [elements]);
    }
});