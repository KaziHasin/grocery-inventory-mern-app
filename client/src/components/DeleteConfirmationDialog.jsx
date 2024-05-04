import React from 'react';
import PropTypes from 'prop-types';
import { confirmable } from 'react-confirm';
import Modal from 'react-modal';

const DeleteConfirmationDialog = ({ show, proceed, confirmation, text, options }) => (

    <Modal
        closeTimeoutMS={200}
        style={{
            overlay: {
                backgroundColor: 'rgba(0, 0, 0, 0.75)',
            },
            content: {
                margin: 'auto',
                width: '300px',
                maxHeight: '200px',
                overflow: 'auto',
                border: '1px solid #ccc',
                borderRadius: '4px',
                outline: 'none',
                padding: '20px',
                textAlign: 'center',
            }
        }}
        isOpen={show}
        onRequestClose={() => proceed(false)}
        contentLabel={text}
    >
        <h2 className="text-xl font-semibold mb-4">{text}</h2>
        <p className="mb-4">{confirmation}</p>
        <div className="flex justify-center">
            <button onClick={() => proceed(false)} className="bg-gray-300 text-gray-700 hover:bg-gray-400 px-4 py-2 mr-2 rounded-md focus:outline-none">
                Cancel
            </button>
            <button onClick={() => proceed(true)} className="bg-red-500 text-white hover:bg-red-600 px-4 py-2 rounded-md focus:outline-none">
                Delete
            </button>
        </div>
    </Modal>

)

DeleteConfirmationDialog.propTypes = {
    show: PropTypes.bool,
    proceed: PropTypes.func,
    confirmation: PropTypes.string,
    options: PropTypes.object,
    text: PropTypes.string
}

export default confirmable(DeleteConfirmationDialog);