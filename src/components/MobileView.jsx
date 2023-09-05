import React from 'react'
import Markdown from 'markdown-to-jsx'

const MobileView = ({ visible, onClose, thumbnail, title, content }) => {
    if (!visible) return null;

    const handleClose = (e) => {
        if (e.target === e.currentTarget) { // if the click is on the backdrop
            onClose();
        }
    }

    return (
        <div onClick={handleClose} className='bg-gray-500 bg-opacity-50 fixed inset-0 backdrop-blur-sm flex justify-center items-center'>
            <div className='bg-white w-mobile-width h-mobile-height rounded overflow-auto'>
                <img className='aspect-video' src={thumbnail} alt={title} />
                <div className="px-2">
                    <h1 className='font-semibold text-gray-700 py-2 text-xl'>{title}</h1>
                    <Markdown className='text-gray-700 prose prose-sm'>{content}</Markdown>
                </div>
            </div>
        </div>
    )
}

export default MobileView