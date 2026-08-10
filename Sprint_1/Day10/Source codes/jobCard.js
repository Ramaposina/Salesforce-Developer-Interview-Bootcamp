import { LightningElement, api } from 'lwc';

export default class JobCard extends LightningElement {

    @api job;

    isProcessing = false;
    isSubmitted = false;
    errorMessage = '';

    get buttonLabel() {
        return this.isProcessing ? 'Processing...' : 'Apply';
    }

    async handleApply(event) {

        const jobId = event.target.dataset.jobId;

        if (!jobId || this.isProcessing || this.isSubmitted) {
            return;
        }

        this.isProcessing = true;
        this.errorMessage = '';

        try {

            // Notify parent component
            this.dispatchEvent(
                new CustomEvent('apply', {
                    detail: {
                        jobId: jobId
                    }
                })
            );

            this.isSubmitted = true;

        } catch (error) {

            this.errorMessage =
                error?.body?.message ||
                'Unable to submit application.';

        } finally {

            this.isProcessing = false;
        }
    }
}
