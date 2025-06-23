import React, { useEffect, useRef } from 'react';
import { Modal as BSModal } from 'bootstrap'; // Import Bootstrap's Modal JS

const CustomModal = ({ isOpen, onClose, title, message }) => {
    const modalElementRef = useRef(null); // Reference to the DOM element of the modal
    const bsModalInstanceRef = useRef(null); // Reference to the Bootstrap Modal JS object

    useEffect(() => {
        // Initialize the Bootstrap modal once when the component mounts
        if (modalElementRef.current && !bsModalInstanceRef.current) {
            bsModalInstanceRef.current = new BSModal(modalElementRef.current);

            // Add event listeners for Bootstrap's modal hide event
            // This ensures that React's state (isOpen) is updated when Bootstrap finishes hiding the modal
            modalElementRef.current.addEventListener('hidden.bs.modal', onClose);
        }

        // Clean up: Dispose the Bootstrap modal instance and remove event listener
        // when the component unmounts.
        return () => {
            if (bsModalInstanceRef.current) {
                bsModalInstanceRef.current.dispose();
                bsModalInstanceRef.current = null;
            }
            if (modalElementRef.current) {
                modalElementRef.current.removeEventListener('hidden.bs.modal', onClose);
            }
        };
    }, []); // Empty dependency array means this effect runs once on mount and once on unmount

    useEffect(() => {
        // Control the modal's visibility based on the 'isOpen' prop
        if (bsModalInstanceRef.current) {
            if (isOpen) {
                bsModalInstanceRef.current.show();
            } else {
                bsModalInstanceRef.current.hide();
            }
        }
    }, [isOpen]); // This effect runs whenever 'isOpen' prop changes

    // No need for a separate handleClose, as the 'hidden.bs.modal' event will trigger onClose

    return (
        // The modal HTML structure always remains in the DOM,
        // Bootstrap's JS will handle its display/hide.
        <div
            className="modal fade"
            ref={modalElementRef} // Attach the ref to the root modal element
            tabIndex="-1"
            aria-labelledby="customModalLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className={`modal-title ${title === "Error" ? 'text-danger' : 'text-primary'}`} id="customModalLabel">
                            {title}
                        </h5>
                        {/* Use Bootstrap's data-bs-dismiss for the close button directly */}
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <p>{message}</p>
                    </div>
                    <div className="modal-footer">
                        {/* Use Bootstrap's data-bs-dismiss for the close button directly */}
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomModal;