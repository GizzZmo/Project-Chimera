import React from 'react';

function BrowserFrame({ url }) {
    return (
        <div className="browser-frame-container">
            <iframe
                src={url}
                title="Secure Browser"
                // Strict sandbox policy to isolate content
                sandbox="allow-forms allow-scripts allow-same-origin allow-popups allow-presentation"
                // Referrer-Policy for privacy
                referrerPolicy="no-referrer"
            ></iframe>
        </div>
    );
}

export default BrowserFrame;
